"""Check generated recipe pages, or the same routes on MEDINA_BASE_URL."""
import json
import os
import re
import unittest
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, urlopen
from xml.etree.ElementTree import Element, SubElement

ROOT = Path(__file__).resolve().parents[1]
CANONICAL = {row["id"]: row for row in json.loads((ROOT / "lib/data/recipe-details.json").read_text(encoding="utf-8"))}
BRAND = " | The Maghreb Culinary Codex"
# Independent editorial regressions: expected snippet/intro anchors and known wrong claims.
CASES = {
    11: ("1 hour 20 minutes", "1 hour 20 minutes", r"85 minutes|1 hour 25|Djerba", "PT1H20M"),
    12: ("200°C", "broiler", r"230\s*°|hot oiled pan", None),
    13: ("30 minutes", "30-minute dough rest", r"2¼|2 hours 15|1-hour rest|for 1 hour", "PT1H30M"),
    15: ("two-hour simmer", "two-hour simmer", r"1.hour simmer|rest.{0,20}10 minutes|medicinal", None),
    16: ("8 msemen", "1 hour 40 minutes", r"25 minutes|one jar|350 g|8–12 minutes", "PT1H40M"),
    25: ("35–40 minutes", "deep-fried for 5–6 minutes", r"60–75|optionally fried|griddled", "PT2H30M"),
    49: ("mallow salad", "mashed", r"30–35 minutes|onion|mallow stew", "PT50M"),
    56: ("Moroccan Jewish", "12–16 hours", r"10[–-]12|100\s*°|untouched|without opening", None),
    63: ("1½–2½ hours", "2–2½ hours", r"cakes|20 minutes into a dark|Libyan", None),
    75: ("Algerian", "split fava beans", r"Sephardic|potatoes|carrots|chickpeas|Sousse", "PT1H10M"),
}
HOLDS = {15, 56}


class HTMLTree(HTMLParser):
    """The pre-rendered pages use balanced tags apart from HTML void elements."""
    void = set("area base br col embed hr img input link meta param source track wbr".split())

    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.root = Element("document")
        self.stack = [self.root]
        self.feed(html)
        self.close()

    def handle_starttag(self, tag, attrs):
        elem = SubElement(self.stack[-1], tag, {key: value or "" for key, value in attrs})
        if tag not in self.void:
            self.stack.append(elem)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in self.void:
            self.handle_endtag(tag)

    def handle_endtag(self, tag):
        for index in range(len(self.stack) - 1, 0, -1):
            if self.stack[index].tag == tag:
                del self.stack[index:]
                break

    def handle_data(self, data):
        node = self.stack[-1]
        if len(node):
            node[-1].tail = (node[-1].tail or "") + data
        else:
            node.text = (node.text or "") + data


def words(node):
    return " ".join("".join(node.itertext()).split())


def page(recipe_id):
    base = os.environ.get("MEDINA_BASE_URL")
    if base:
        url = f"{base.rstrip('/')}/recipes/{recipe_id}"
        with urlopen(Request(url, headers={"User-Agent": "Medina recipe verification"}), timeout=30) as response:
            if response.geturl().rstrip("/") != url:
                raise AssertionError(f"{url} redirected to {response.geturl()}")
            html = response.read().decode()
    else:
        html = (ROOT / f".next/server/app/recipes/{recipe_id}.html").read_text(encoding="utf-8")
    return HTMLTree(html).root


def schema_nodes(root):
    for script in root.findall(".//script[@type='application/ld+json']"):
        obj = json.loads(script.text)
        yield from obj.get("@graph", [obj])


class AnswerLed(unittest.TestCase):
    def check_dish(self, recipe_id):
        root = page(recipe_id)
        record = CANONICAL[recipe_id]
        article, = root.findall(".//main//article[@data-rpc='content']")
        head, = root.findall(".//head")
        title, = head.findall("title")
        brand_title = words(title)
        self.assertTrue(brand_title.endswith(BRAND))
        self.assertLessEqual(len(brand_title), 60)
        self.assertIn(CASES[recipe_id][0].lower(), head.find("meta[@name='description']").get("content").lower())
        description = head.find("meta[@name='description']").get("content")
        self.assertLessEqual(len(description), 155)
        self.assertTrue(description.endswith("."))
        self.assertEqual(head.find("meta[@property='og:description']").get("content"), description)
        self.assertEqual(head.find("meta[@name='twitter:description']").get("content"), description)
        for selector in ["meta[@property='og:title']", "meta[@name='twitter:title']"]:
            self.assertEqual(head.find(selector).get("content"), brand_title.removesuffix(BRAND))
        self.assertEqual(head.find("link[@rel='canonical']").get("href"), f"https://www.tasteofmedina.com/recipes/{recipe_id}")

        intro, = article.findall(".//*[@data-block='intro']/p")
        self.assertIn(CASES[recipe_id][1].lower(), words(intro).lower())
        faq, = article.findall(".//section[@data-block='faq']")
        pairs = [(words(d.find("summary")), words(d.find("p"))) for d in faq.findall("details")]
        self.assertEqual(len(pairs), 2)
        self.assertEqual(len({q for q, _ in pairs}), len(pairs))
        nodes = list(schema_nodes(root))
        faq_ld, = [n for n in nodes if n["@type"] == "FAQPage"]
        self.assertEqual(faq_ld["mainEntity"], [
            {"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}}
            for q, a in pairs
        ])
        copy = " ".join([brand_title, description, words(intro), words(faq)])
        self.assertNotRegex(copy, re.compile(CASES[recipe_id][2], re.I))

        self.assertEqual(len(article.findall(".//*[@id='provenance-heading']")), 1)
        recipes = [n for n in nodes if n["@type"] == "Recipe"]
        if recipe_id in HOLDS:
            self.assertEqual(recipes, [])
            self.assertNotIn("Shop this recipe", words(article))
            self.assertEqual(len(article.findall(".//aside[@data-block='method-review']/a")), 1)
            for block in ["method", "recipe-card"]:
                self.assertIsNone(article.find(f".//*[@data-block='{block}']"))
            self.assertNotRegex(words(article), r"225\s*°|100\s*°|107\s*°|sprig dried wormwood|mesh-covered bucket")
            return

        recipe, = recipes
        self.assertIsNone(article.find(".//*[@data-block='method-review']"))
        card, = article.findall(".//*[@data-block='recipe-card']")
        self.assertIn(record["timeText"], words(card))
        self.assertIn(record["yieldText"], words(card))
        self.assertEqual(recipe["recipeYield"], record["yieldText"])
        self.assertEqual(recipe.get("totalTime"), CASES[recipe_id][3])
        self.assertEqual(recipe["description"], description)
        self.assertEqual(recipe["name"], words(article.find("header/h1")))
        self.assertIn(recipe["recipeCuisine"], words(article.find("header")))
        self.assertIn(recipe["recipeCategory"], words(article.find("header")))
        expected = [i["text"] for i in record["ingredients"] if i["type"] == "item"]
        self.assertEqual(recipe["recipeIngredient"], expected)
        # Each item's outer text excludes the nested optional nutrition annotation.
        visible = [li.findall("span")[1].text for li in card.findall(".//li") if li.findall("span")]
        self.assertEqual(visible, expected)
        self.assertEqual([words(p) for p in article.findall(".//*[@data-block='method']//li/p")], record["method"])
        self.assertEqual(recipe["recipeInstructions"], [
            {"@type": "HowToStep", "position": i, "text": step}
            for i, step in enumerate(record["method"], 1)
        ])

    def test_unmodified_routes(self):
        # Exercise one unaffected packet and one existing canonical fallback.
        for recipe_id in (1, 96):
            with self.subTest(recipe_id=recipe_id):
                root = page(recipe_id)
                types = [n["@type"] for n in schema_nodes(root)]
                self.assertEqual(types.count("Recipe"), 1)
                self.assertNotIn("FAQPage", types)
                self.assertIsNone(root.find(".//*[@class='answer-led']"))


# Give each route a separate CI result instead of stopping at the first discrepancy.
for recipe_id in CASES:
    setattr(AnswerLed, f"test_recipe_{recipe_id}", lambda self, n=recipe_id: self.check_dish(n))


if __name__ == "__main__":
    unittest.main(verbosity=2)

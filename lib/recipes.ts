export type Category =
  | 'Street Food'
  | 'Tagines & Stews'
  | 'Sephardic Traditions'
  | 'Condiments'

export type Recipe = {
  id: number
  name: string
  region: string
  category: Category
  minutes: number
  heat: 1 | 2 | 3
  blurb: string
  image: string
}

export const CATEGORIES: { label: Category; slug: string; note: string }[] = [
  { label: 'Street Food', slug: 'street-food', note: 'Souk & sidewalk' },
  { label: 'Tagines & Stews', slug: 'tagines-stews', note: 'The slow fire' },
  {
    label: 'Sephardic Traditions',
    slug: 'sephardic-traditions',
    note: 'The diaspora table',
  },
  { label: 'Condiments', slug: 'condiments', note: 'The pantry' },
]

// Per-recipe card data. `minutes` mirrors the active/total time stated in the
// recipe's detail timeText (lib/data/recipe-details.json) so the card and the
// detail page never disagree; regenerate with scripts noted in the PR if the
// detail times change. `heat` is a curated 1-3 chile rating grounded in each
// recipe's actual ingredients (3 = chile-defined, 2 = noticeable chile or
// harissa seasoning, 1 = essentially no heat). Blurbs are written per recipe
// from the finalized descriptions — not rotated filler.
type Seed = [
  name: string,
  region: string,
  image: string,
  minutes: number,
  heat: 1 | 2 | 3,
  blurb: string,
  categoryOverride?: Category,
]

const IMG = {
  tagine: '/images/hero-tagine.webp',
  brik: '/images/tunisian-brik.webp',
  koshari: '/images/egyptian-koshari.webp',
  harissa: '/images/harissa.webp',
  couscous: '/images/couscous.webp',
  street: '/images/street-food.webp',
  sephardic: '/images/sephardic.webp',
  spices: '/images/spices.webp',
  pastilla: '/images/pastilla.webp',
  condiments: '/images/condiments.webp',
  tea: '/images/mint-tea.webp',
} as const

const STREET: Seed[] = [
  ['Tunisian Brik', 'Tunis', IMG.brik, 25, 2, 'Shattering malsouka folded over spiced potato, tuna, and a daringly runny egg.'],
  ['Egyptian Koshari', 'Cairo', IMG.koshari, 90, 2, 'Rice, lentils, and macaroni layered under spiced tomato, dakka, and fried onions.'],
  ['Maakouda Potato Fritters', 'Casablanca', IMG.street, 50, 1, 'Cumin-turmeric potato patties fried to a crackling shell around a fluffy center.'],
  ['Merguez in Khobz', 'Algiers', IMG.street, 30, 3, 'Juicy merguez tucked into khobz with harissa and charred peppers and onions.'],
  ['Bocadillo de Calamares', 'Tangier', IMG.street, 25, 1, 'Flour-dusted fried squid rings packed into a crusty baguette with lemon.'],
  ['Sfenj Doughnuts', 'Fez', IMG.pastilla, 120, 1, 'Airy, chewy yeasted doughnuts eaten hot from the oil, plain or sugar-rolled.'],
  ['Bessara Fava Soup', 'Chefchaouen', IMG.koshari, 75, 2, 'Velvety split-fava soup finished with olive oil, cumin, and a dust of cayenne.'],
  ['Hawawshi', 'Alexandria', IMG.street, 40, 2, 'Spiced beef and lamb baked inside pita until the bread crisps and drips.'],
  ['Ta’ameya Falafel', 'Cairo', IMG.street, 35, 2, 'Egypt’s fava falafel — herb-green at the center, sesame-crusted outside.'],
  ['Fricassé Sandwich', 'Sousse', IMG.brik, 120, 2, 'A fried yeasted bun stuffed with harissa, tuna, olives, and potato.'],
  ['Chapati Zanzibari', 'Zanzibar', IMG.pastilla, 80, 1, 'Ghee-brushed dough coiled, rolled, and griddled into flaky Swahili layers.'],
  ['Karantita', 'Oran', IMG.koshari, 70, 2, 'Algerian chickpea-flour flan baked custardy, eaten hot in a baguette.'],
  ['Mahjouba Semolina Crêpe', 'Constantine', IMG.street, 90, 2, 'Paper-thin semolina crêpe folded over caramelized onion, tomato, and harissa.'],
  ['Grilled Sardine Skewers', 'Essaouira', IMG.street, 35, 2, 'Butterflied sardines stuffed with chermoula and grilled fast over coals.'],
  ['Snail Babbouche Broth', 'Marrakech', IMG.tagine, 120, 2, 'Marrakech’s snail broth with orange peel, thyme and mint.'],
  ['Msemen with Amlou', 'Agadir', IMG.pastilla, 100, 1, 'Crisp-flaky laminated squares dipped in sweet almond-argan amlou.'],
  ['Feseekh Rolls', 'Rosetta', IMG.street, 20, 1, 'Salt-fermented grey mullet with lemon and onion, rolled for the spring festival.'],
  ['Lablabi Chickpea Bowl', 'Kairouan', IMG.koshari, 105, 3, 'Garlicky chickpea broth over torn bread, crowned with egg and harissa.'],
  ['Kebda Iskandarani', 'Alexandria', IMG.street, 25, 3, 'Beef liver seared screaming-hot with garlic, green chilies, and cumin.'],
  ['Zaalouk Baguette', 'Rabat', IMG.harissa, 50, 1, 'Smoky eggplant-tomato zaalouk spread warm inside a crusty baguette.'],
  ['Batbout Sliders', 'Meknes', IMG.street, 105, 1, 'Puffed mini stovetop pitas split and stuffed with spiced meat and salad.'],
  ['Chakchouka Wrap', 'Gabès', IMG.sephardic, 35, 1, 'Soft eggs folded through cumin-scented pepper ragout, wrapped to go.'],
  ['Fried Whitebait Cornet', 'Bizerte', IMG.brik, 20, 2, 'Whole whitebait fried shatter-crisp, salted, and served in a paper cone.'],
  ['Harira Night Cup', 'Marrakech', IMG.tagine, 90, 1, 'Tomato, lentil, and chickpea soup with beef and saffron, served by the cup.'],
  ['Mombar Rice Sausage', 'Giza', IMG.koshari, 150, 1, 'Casings stuffed with herbed rice, boiled tender, then deep-fried golden.'],
  ['Kaak Warka Rings', 'Tunis', IMG.pastilla, 90, 1, 'Rosewater pastry rings wrapped around sweet almond marzipan.'],
  ['Grilled Corn with Cumin', 'Casablanca', IMG.spices, 25, 1, 'Flame-charred corn brushed with cumin butter and a squeeze of lime.'],
  ['Douara Offal Skewers', 'Fez', IMG.street, 150, 1, 'Eid skewers of tripe, lung, and heart, boiled tender then grilled with cumin.'],
  ['Sardine Chermoula Roll', 'Safi', IMG.harissa, 35, 1, 'Crisp fried sardine fillets in garlicky chermoula, rolled in warm flatbread.'],
  ['Roasted Chestnut Cone', 'Blida', IMG.spices, 35, 1, 'Ember-roasted chestnuts, scored and salted, served hot in a paper cone.'],
]

const TAGINES: Seed[] = [
  ['Chicken M’qualli with Preserved Lemon', 'Fez', IMG.tagine, 105, 1, 'Chicken braised in saffron-turmeric gravy with preserved lemon and olives.'],
  ['Lamb M’hammar', 'Marrakech', IMG.tagine, 180, 1, 'Lamb braised with smen and saffron, then oven-roasted to a caramel crust.'],
  ['Kefta Mkaouara', 'Rabat', IMG.sephardic, 55, 1, 'Spiced meatballs in garlic-tomato sauce with eggs poached on top.'],
  ['Seven-Vegetable Couscous', 'Casablanca', IMG.couscous, 150, 1, 'Friday couscous heaped with seven slow-simmered vegetables and broth.'],
  ['Lamb Tangia', 'Marrakech', IMG.tagine, 300, 1, 'Bone-in lamb sealed in a clay urn with saffron, smen, and preserved lemon.'],
  ['Beef Tagine with Prunes', 'Meknes', IMG.tagine, 150, 1, 'Sweet-savory beef with prunes under sesame and fried almonds.'],
  ['Fish Tagine Chermoula', 'Essaouira', IMG.harissa, 80, 1, 'Chermoula-marinated fish gently simmered over a bed of vegetables.'],
  ['Chicken Pastilla', 'Fez', IMG.pastilla, 180, 1, 'Warqa pie of poultry, onion-egg custard, and cinnamon almonds.'],
  ['Rfissa with Fenugreek', 'Rabat', IMG.tagine, 180, 1, 'Chicken, lentils, and fenugreek broth ladled over shredded msemen.'],
  ['Djej Bil Zaytoun', 'Tlemcen', IMG.tagine, 85, 1, 'Light Algerian chicken simmered with olives in a saffron-tinged sauce.'],
  ['Mrouzia Honey Lamb', 'Marrakech', IMG.tagine, 180, 1, 'Preserve-style Eid tagine of lamb, ras el hanout, honey, and raisins.'],
  ['Chtitha Djej', 'Algiers', IMG.sephardic, 80, 3, 'Chicken seared in fiery dersa — garlic, chile, and cumin — with chickpeas.'],
  ['Loubia White Bean Stew', 'Oujda', IMG.koshari, 100, 2, 'White beans in a tomato-garlic sauce warmed with cumin and paprika.'],
  ['Molokhia with Rabbit', 'Cairo', IMG.sephardic, 120, 1, 'Chopped jute-mallow soup, glossy and green, served over rabbit.'],
  ['Fasolia Green Bean Stew', 'Damietta', IMG.koshari, 105, 1, 'Green beans braised soft in tomato, with or without tender beef.'],
  ['Camel Meat Tagine', 'Guelmim', IMG.tagine, 240, 1, 'Saharan camel meat slow-cooked with Moroccan savory spices.'],
  ['Quince & Lamb Tagine', 'Sefrou', IMG.tagine, 150, 1, 'Autumn lamb paired with honeyed quince in a warm spiced sauce.'],
  ['Artichoke & Pea Tagine', 'Kénitra', IMG.couscous, 110, 1, 'Spring artichoke bottoms and peas in a light, herb-bright tagine.'],
  ['Bakoula Mallow Salad', 'Salé', IMG.sephardic, 50, 2, 'Cooked mallow salad with garlic, olives, and preserved lemon.', 'Condiments'],
  ['Chicken with Almonds & Eggs', 'Tétouan', IMG.tagine, 105, 1, 'Celebration chicken under reduced onion sauce, fried almonds, and eggs.'],
  ['Sardine Meatball Tagine', 'Safi', IMG.harissa, 60, 2, 'Coastal sardine kefta simmered in a tomato-chermoula sauce.'],
  ['Kaddid Dried Beef Couscous', 'Sfax', IMG.couscous, 150, 2, 'Couscous enriched with salt-dried kaddid beef and slow broth.'],
  ['Marqa Hlowa Sweet Stew', 'Constantine', IMG.tagine, 120, 1, 'The “sweet stew” — meat with prunes, apricots, raisins, and nuts.'],
  ['Osban Stuffed Tripe', 'Gabès', IMG.sephardic, 180, 2, 'Tripe casings packed with rice, herbs, and chickpeas, gently simmered.'],
  ['Chakhchoukha Ravioli Stew', 'Biskra', IMG.harissa, 150, 2, 'Torn rougag flatbread soaked under a spicy lamb-and-chickpea stew.'],
  ['Dfina Sabbath Stew', 'Marrakech', IMG.sephardic, 960, 1, 'Sabbath beef, chickpeas, potatoes, and shell-on eggs, cooked overnight.'],
  ['Berkoukes Pearl Couscous', 'Sétif', IMG.couscous, 110, 1, 'Hand-rolled semolina pearls in a hearty vegetable-chickpea broth.'],
  ['Lamb & Cardoon Tagine', 'Azrou', IMG.tagine, 135, 1, 'Fleshy cardoon ribs braised with lamb in a pale, lemony sauce.'],
  ['Squid & Chickpea Marqa', 'Tangier', IMG.harissa, 80, 2, 'Coastal Tunisian marqa of squid and chickpeas in tomato-harissa.'],
  ['Goat Tagine with Figs', 'Beni Mellal', IMG.tagine, 180, 1, 'Goat slow-braised with dried figs and warm spices until falling apart.'],
]

const SEPHARDIC: Seed[] = [
  ['Shakshuka', 'Tétouan', IMG.sephardic, 45, 2, 'Eggs poached in a reduced tomato-pepper sauce, deepened with harissa.'],
  ['Mafroum Stuffed Potatoes', 'Tripoli', IMG.sephardic, 150, 1, 'Potato slices stuffed with spiced meat, fried, then braised in tomato.'],
  ['Pkaila Spinach & Beans', 'Tunis', IMG.sephardic, 300, 1, 'Spinach cooked black into a concentrate, then stewed with beef and beans.'],
  ['Chraime Spiced Fish', 'Tripoli', IMG.harissa, 50, 3, 'Firm fish steaks in a fiery red garlic-paprika sauce for the Sabbath.'],
  ['Skhina Sabbath Stew', 'Fez', IMG.sephardic, 960, 1, 'Overnight Sabbath stew with separate parcels of rice and wheat.'],
  ['Mina de Matza', 'Tangier', IMG.pastilla, 90, 1, 'Passover pie of softened matzo layered with spinach, feta, and egg.'],
  ['Boyos de Pan', 'Tétouan', IMG.pastilla, 45, 1, 'Paper-thin dough coiled around spinach and cheese, baked into spirals.'],
  ['Sfenj for Hanukkah', 'Marrakech', IMG.pastilla, 120, 1, 'Hanukkah doughnuts scented with orange zest, dipped in cinnamon honey.'],
  ['Trout with Preserved Lemon', 'Sefrou', IMG.harissa, 40, 1, 'Whole trout stuffed with chermoula and preserved lemon, baked flaky.'],
  ['Couscous with Osban', 'Djerba', IMG.couscous, 180, 2, 'Steamed couscous with stuffed osban and a red tomato-harissa sauce.'],
  ['Fijuelas Fried Ribbons', 'Casablanca', IMG.pastilla, 90, 1, 'Orange-blossom dough fork-coiled in hot oil into crisp honeyed ribbons.'],
  ['Adafina Chickpea Pot', 'Meknes', IMG.sephardic, 900, 1, 'The Spanish-Sephardic overnight pot of beef, chickpeas, and eggs.'],
  ['Huevos Haminados', 'Tangier', IMG.sephardic, 720, 1, 'Eggs simmered overnight with onion skins for creamy, tea-brown yolks.'],
  ['Lubia Black-Eyed Peas', 'Tunis', IMG.koshari, 80, 1, 'Black-eyed peas slow-cooked in a garlicky cumin-tomato sauce.'],
  ['Tbikha Vegetable Stew', 'Algiers', IMG.sephardic, 70, 2, 'Algiers spring stew of artichokes, peas, and split favas with garlic, tomato and paprika.', 'Tagines & Stews'],
  ['Sfiria Chicken Croquettes', 'Fez', IMG.sephardic, 105, 1, 'Bread-and-cheese croquettes beside chicken in a cinnamon-chickpea sauce.'],
  ['Mouna Sweet Bread', 'Oran', IMG.pastilla, 240, 1, 'Oran’s orange-and-anise brioche, glazed and crowned with coarse sugar.'],
  ['Pastel de Carne', 'Tétouan', IMG.pastilla, 100, 1, 'Flaky meat pie of spiced beef, eggs, pine nuts, and raisins.'],
  ['Ktzitzot Fish Cakes', 'Essaouira', IMG.harissa, 60, 1, 'Herbed whitefish patties fried gold, then simmered in tomato-pepper sauce.'],
  ['Marqa Batata Sweet-Sour', 'Constantine', IMG.tagine, 75, 1, 'Sweet-and-sour potato and beef stew brightened with lemon and saffron.'],
  ['Dafina with Kouclas', 'Rabat', IMG.sephardic, 960, 1, 'Overnight beef stew with kouclas — semolina dumplings cooked in the pot.'],
  ['Fritada de Espinaca', 'Tangier', IMG.sephardic, 75, 1, 'Rustic spinach-feta frittata baked until just set.'],
  ['Debla Fried Roses', 'Tunis', IMG.pastilla, 90, 1, 'Ribbon dough coiled into fried rosebuds, dipped in lemon-honey syrup.'],
  ['Salona Sweet Fish', 'Alexandria', IMG.harissa, 60, 1, 'Sweet-and-sour fish baked over caramelized onions in tamarind sauce.'],
  ['Bomba Rice Timbale', 'Tétouan', IMG.koshari, 80, 1, 'A molded saffron-rice timbale layered with beef, peas, and carrots.'],
  ['Ojja with Merguez', 'Sfax', IMG.sephardic, 45, 3, 'Poached eggs over a harissa tomato-pepper sauce studded with merguez.'],
  ['Kaak Anise Rings', 'Fez', IMG.pastilla, 90, 1, 'Crisp, eggless aniseed rings made for dipping in mint tea.'],
  ['Loubia b’Dersa', 'Oujda', IMG.koshari, 100, 3, 'White beans simmered in a fiery garlic-cumin-chili dersa.'],
  ['Terfess Desert Truffle Stew', 'Ghardaïa', IMG.tagine, 120, 1, 'Wild desert truffles and beef in a delicate golden broth.'],
  ['Boulettes de Poisson', 'Casablanca', IMG.harissa, 60, 1, 'Herbed fish balls simmered in a tomato sauce with olives.'],
]

const CONDIMENTS: Seed[] = [
  ['Harissa Paste', 'Nabeul', IMG.harissa, 40, 3, 'Dried chilies, garlic, and toasted spices pounded into the ember-red base.'],
  ['Preserved Lemons', 'Safi', IMG.condiments, 20, 1, 'Lemons cured in salt and their own juice until soft, glossy, and intense.'],
  ['Chermoula Marinade', 'Essaouira', IMG.harissa, 15, 2, 'Cilantro, parsley, garlic, and cumin — the marinade the coast runs on.'],
  ['Ras el Hanout Blend', 'Marrakech', IMG.spices, 15, 1, '“Top of the shop” — the many-spice blend of sweet, warm, and hot.'],
  ['Smen Aged Butter', 'Fez', IMG.condiments, 30, 1, 'Clarified butter fermented and aged to a pungent, prized depth.'],
  ['Amlou Argan Spread', 'Agadir', IMG.condiments, 25, 1, 'Roasted almonds ground with toasted argan oil and honey.'],
  ['Dukkah Nut Blend', 'Cairo', IMG.spices, 20, 1, 'Toasted hazelnuts, sesame, coriander, and cumin, crushed coarse.'],
  ['Tabil Tunisian Spice', 'Tunis', IMG.spices, 15, 2, 'Coriander and caraway ground with garlic and dried chili.'],
  ['Zhug Green Chili', 'Alexandria', IMG.harissa, 15, 3, 'Hot green chilies blended with cilantro, cardamom, and garlic.'],
  ['Matbucha Cooked Salad', 'Tétouan', IMG.harissa, 105, 2, 'Peppers and tomatoes cooked down slow into a sweet-savory dip.'],
  ['Filfel Chuma', 'Tripoli', IMG.harissa, 20, 3, 'The Libyan-Jewish chili-garlic paste, heavy on garlic, warm with caraway.'],
  ['Baharat Warm Blend', 'Cairo', IMG.spices, 15, 1, 'Toasted whole spices ground into the warm blend behind a hundred stews.'],
  ['Charmoula Verte', 'Rabat', IMG.condiments, 15, 1, 'Hand-chopped green chermoula — herbs, lemon, and cumin for fish.'],
  ['Torshi Pickled Turnips', 'Alexandria', IMG.condiments, 20, 1, 'Turnip spears dyed neon pink by beets in a garlicky brine.'],
  ['Slata Mechouia', 'Sousse', IMG.harissa, 55, 2, 'Charred peppers, tomatoes, and garlic chopped into a smoky caraway salad.'],
  ['Argan Oil Pressing', 'Taroudant', IMG.condiments, 300, 1, 'Argan kernels toasted, stone-ground, and kneaded until the oil runs gold.'],
  ['Orange Blossom Water', 'Marrakech', IMG.tea, 120, 1, 'Bitter-orange blossoms slow-distilled in copper into fragrant hydrosol.'],
  ['Pickled Wild Cardoon', 'Meknes', IMG.condiments, 45, 1, 'Wild cardoon stalks parboiled in lemon water and cured in garlic brine.'],
  ['Zaatar Herb Blend', 'Cairo', IMG.spices, 10, 1, 'Wild hyssop, toasted sesame, and tart sumac whisked with sea salt.'],
  ['Harissa Rose Petal', 'Kairouan', IMG.harissa, 40, 3, 'Kairouan’s harissa softened with crushed rose petals and rosewater.'],
  ['Berbere-Adjacent Felfla', 'Ghardaïa', IMG.spices, 15, 2, 'Roasted horn peppers puréed with fenugreek, nutmeg, and garlic.'],
  ['Confit Garlic in Smen', 'Fez', IMG.condiments, 60, 1, 'Garlic cloves poached impossibly low in aged smen until spoon-soft.'],
  ['Preserved Green Chilies', 'Gabès', IMG.harissa, 15, 3, 'Sliced green chilies brined with garlic and bay until tangy-hot.'],
  ['Msir Salt-Cured Citrus', 'Beni Mellal', IMG.condiments, 20, 1, 'Meyer lemons packed in salt and coriander for a sweeter, thinner cure.'],
  ['Chili Oil Zeit Har', 'Sfax', IMG.harissa, 20, 3, 'Chili flakes, garlic, and cumin steeped warm in olive oil.'],
  ['Toasted Cumin Salt', 'Casablanca', IMG.spices, 8, 1, 'Kamoun wa melha — crushed toasted cumin and flaky salt for the table.'],
  ['Rose & Sesame Sprinkle', 'Fez', IMG.spices, 10, 1, 'Toasted sesame and crushed rose petals with salt and raw sugar.'],
  ['Fermented Caper Berries', 'Tangier', IMG.condiments, 15, 1, 'Caper berries lacto-fermented in a garlic-peppercorn brine.'],
  ['Mint Tea Base', 'Marrakech', IMG.tea, 15, 1, 'Washed gunpowder tea simmered with spearmint and poured from on high.'],
  ['Saffron Threads M’qualli', 'Taliouine', IMG.spices, 10, 1, 'Threads toasted brittle, ground with salt, and bloomed in hot water.'],
]

function buildCategory(seeds: Seed[], category: Category, start: number): Recipe[] {
  return seeds.map((seed, i) => ({
    id: start + i,
    name: seed[0],
    region: seed[1],
    image: `/images/recipes/${start + i}.webp`,
    category: seed[6] ?? category,
    minutes: seed[3],
    heat: seed[4],
    blurb: seed[5],
  }))
}

export const RECIPES: Recipe[] = [
  ...buildCategory(STREET, 'Street Food', 1),
  ...buildCategory(TAGINES, 'Tagines & Stews', 31),
  ...buildCategory(SEPHARDIC, 'Sephardic Traditions', 61),
  ...buildCategory(CONDIMENTS, 'Condiments', 91),
]

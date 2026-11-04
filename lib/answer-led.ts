export type AnswerLedRecipe = {
  title: string
  cuisine: string
  dishType: string
  description: string
  answer: string
  faqs: { question: string; answer: string }[]
  // A definition may be published while its cooking method awaits culinary review.
  methodHold?: { message: string; source: string; url: string }
}

// IDs are the permanent /recipes/[id] routes and the keys in recipe-details.json.
// Keep the complete branded title within 60 characters.
export const ANSWER_LED_RECIPES: Partial<Record<number, AnswerLedRecipe>> = {
  11: {
    title: 'Chapati Zanzibari Recipe',
    cuisine: 'Swahili',
    dishType: 'Flatbread',
    description: 'Chapati Zanzibari is a flaky Swahili flatbread from Zanzibar. Coiling and resting the dough creates layers. Makes 8 chapatis in 1 hour 20 minutes.',
    answer: 'Chapati Zanzibari is a Swahili flatbread from Zanzibar. Each round is brushed with ghee or coconut oil, rolled into a rope and coiled. After a second rest, the coils are rolled flat and cooked on a skillet. This recipe makes 8 chapatis in 1 hour 20 minutes.',
    faqs: [
      { question: 'What makes Zanzibar chapati flaky?', answer: 'Fat separates the thin sheets of dough as they coil. Resting the coils before rolling them out helps preserve the layers.' },
      { question: 'When do you clap the chapatis?', answer: 'Just after each chapati comes off the skillet, press it lightly from the sides to separate its warm layers.' },
    ],
  },
  12: {
    title: 'Karantita Chickpea Flan',
    cuisine: 'Algerian',
    dishType: 'Savoury flan',
    description: 'Karantita is an Algerian chickpea-flour flan. This egg-and-milk batter bakes at 200°C (400°F) and finishes under the broiler for a browned crust.',
    answer: 'Karantita is an Algerian chickpea-flour flan with a custardy centre and a browned top. In this version, milk and egg enrich the batter. Bake it at 200°C (400°F) and use the broiler for the final browning. The pan serves eight.',
    faqs: [
      { question: 'How is karantita baked?', answer: 'Rest the batter for 15 minutes, stir it, then pour it into a greased dish. Bake at 200°C (400°F) for 30–35 minutes and broil for the final 5 minutes to brown the top.' },
      { question: 'How is karantita served?', answer: 'Dust the top with cumin, let it cool for 5 minutes, then tuck a hot slice inside a baguette spread with harissa.' },
    ],
  },
  13: {
    title: 'Mahjouba Algerian Crêpes Recipe',
    cuisine: 'Algerian',
    dishType: 'Stuffed crêpe',
    description: 'Mahjouba is an Algerian semolina crêpe folded around onion, tomato and harissa. The dough rests for 30 minutes. Makes 8 parcels in 1 hour 30 minutes.',
    answer: 'Mahjouba is an Algerian griddled crêpe. A thin sheet of semolina dough folds into a square around caramelized onions, tomato and harissa. This recipe makes eight parcels in 1 hour 30 minutes, including a 30-minute dough rest.',
    faqs: [
      { question: 'Why cool the mahjouba filling?', answer: 'Cook the onions for 15 minutes, simmer them with the tomato and harissa until the mixture is thick, then let it cool completely. A wet or hot filling can tear the thin dough.' },
      { question: 'How do you shape mahjouba?', answer: 'Rest the oiled dough balls for 30 minutes. Stretch each one until translucent, fold around the cooled filling, then cook the square on a lightly oiled griddle.' },
    ],
  },
  15: {
    title: 'Babbouche Moroccan Snail Broth',
    cuisine: 'Moroccan',
    dishType: 'Broth',
    description: 'Babbouche is a Moroccan broth of edible land snails with orange peel, thyme and mint. The archive records a two-hour simmer.',
    answer: 'Babbouche, also called ghoulal, is Moroccan street food made with food-grade land snails and a fragrant broth. Orange peel, thyme and mint are among the aromatics in this version. The archive records a two-hour simmer and a yield of six small bowls.',
    methodHold: {
      message: 'The ingredient list specifies dried wormwood. We are verifying its suitability for this broth before publishing quantities and cooking instructions.',
      source: 'U.S. food-flavouring standard for wormwood',
      url: 'https://www.ecfr.gov/current/title-21/chapter-I/subchapter-B/part-172/subpart-F/section-172.510',
    },
    faqs: [
      { question: 'What is babbouche?', answer: 'It is a Moroccan dish served with both the edible land snails and the warm, spiced liquid they cooked in.' },
      { question: 'How is babbouche eaten?', answer: 'The snails are lifted from their shells with a toothpick and the broth is sipped from the bowl.' },
    ],
  },
  16: {
    title: 'Msemen Amlou Recipe',
    cuisine: 'Moroccan',
    dishType: 'Flatbread and dip',
    description: 'Moroccan msemen with amlou pairs flaky, square-folded flatbread with roasted almond, culinary argan oil and honey dip. Makes 8 msemen and 1 cup of amlou.',
    answer: 'Msemen with amlou is a Moroccan breakfast pairing. Warm squares of layered semolina flatbread are dipped in roasted almonds ground with culinary argan oil and honey. The full recipe takes 1 hour 40 minutes and makes eight msemen plus one cup of amlou.',
    faqs: [
      { question: 'How are the layers in msemen made?', answer: 'Stretch the rested dough thin, brush with butter and oil, and sprinkle with semolina. Fold in thirds twice, rest the squares, flatten and cook in a skillet.' },
      { question: 'Which oil goes into amlou?', answer: 'Use culinary toasted argan oil. Blend it with roasted, cooled almonds, honey and a pinch of salt until the dip is creamy and pourable.' },
    ],
  },
  25: {
    title: 'Mombar Recipe — Rice Sausage',
    cuisine: 'Egyptian',
    dishType: 'Stuffed casings',
    description: 'Mombar is Egyptian rice sausage. Loosely stuffed sheep casings simmer for 35–40 minutes, then are drained, dried and deep-fried for 5–6 minutes.',
    answer: 'Mombar is an Egyptian dish of casings filled with spiced rice, tomato and fresh herbs. Here, sheep casings are stuffed loosely so the rice has room to expand. The links simmer for 35–40 minutes, then are drained, dried and deep-fried for 5–6 minutes.',
    faqs: [
      { question: 'What goes into mombar?', answer: 'The filling combines raw Egyptian rice with tomato purée, onion, garlic, dill, parsley, cilantro, cumin and coriander.' },
      { question: 'How does mombar get its crisp casing?', answer: 'Simmer the loosely filled links for 35–40 minutes until the rice is tender. Drain and dry them completely before deep-frying at 190°C (375°F) for 5–6 minutes.' },
    ],
  },
  49: {
    title: 'Bakoula Recipe — Mallow Salad',
    cuisine: 'Moroccan',
    dishType: 'Cooked salad',
    description: 'Bakoula is a Moroccan cooked mallow salad. The greens are steamed, chopped and mashed with garlic and spices, then mixed with preserved lemon and olives.',
    answer: 'Bakoula is a Moroccan cooked greens salad. Mallow leaves are steamed until tender, then drained, chopped and mashed in a skillet with garlic and spices until the moisture evaporates. Preserved lemon, olives and lemon juice finish the dish.',
    faqs: [
      { question: 'Which greens can you use for bakoula?', answer: 'Use positively identified, food-safe common mallow or the recipe’s alternative of spinach mixed with chard.' },
      { question: 'How long do the greens cook?', answer: 'Steam or wilt the leaves for 15–20 minutes, then drain and chop them. Stir and mash with the garlic, herbs, spices and oil for another 15–20 minutes. Serve warm or at room temperature.' },
    ],
  },
  56: {
    title: 'Dfina Moroccan Jewish Stew',
    cuisine: 'Moroccan Jewish',
    dishType: 'Stew',
    description: 'Dfina is a Moroccan Jewish Sabbath stew of beef, chickpeas, potatoes, grain and shell-on eggs, traditionally prepared for the Sabbath midday meal.',
    answer: 'Dfina is a Moroccan Jewish Sabbath stew related to skhina and dafina. This version combines beef, chickpeas, potatoes, a parcel of wheat berries or barley, and shell-on eggs. The archive records an overnight cooking period of 12–16 hours.',
    methodHold: {
      message: 'We are reviewing the overnight oven method and temperature checks for this pot. Cooking instructions are withheld until that review is complete.',
      source: 'USDA guidance on conventional oven temperatures',
      url: 'https://ask.fsis.usda.gov/article/What-is-the-lowest-temperature-you-can-set-the-oven-to-for-and-safely-cook-food',
    },
    faqs: [
      { question: 'Which grain is used in dfina?', answer: 'This version uses wheat berries or barley, held in a loose cheesecloth parcel so the grains can be served separately.' },
      { question: 'What gives dfina its characteristic eggs?', answer: 'Whole eggs are traditionally included in their shells and take on a brown colour during the long cooking period. They are peeled for serving.' },
    ],
  },
  63: {
    title: 'Pkaila Tunisian Jewish Stew',
    cuisine: 'Tunisian Jewish',
    dishType: 'Stew',
    description: 'Pkaila is a Tunisian Jewish beef and white bean stew. Spinach or chard cooks slowly in oil for 1½–2½ hours to make its dark green concentrate.',
    answer: 'Pkaila is a Tunisian Jewish beef and white bean stew named for its dark greens concentrate. Finely chopped spinach or chard cooks in oil for 1½–2½ hours until nearly black-green. The concentrate then simmers with browned beef and white beans for 2–2½ hours.',
    faqs: [
      { question: 'How does pkaila get its dark colour?', answer: 'Cook the finely chopped, dried greens in oil over low heat for 1½–2½ hours, stirring often. The leaves lose their moisture and become a dark paste without scorching.' },
      { question: 'When are the beef and beans added?', answer: 'Brown the beef in some of the reserved oil. Add the prepared white beans, concentrate, aromatics and water, then simmer gently for 2–2½ hours until the beef and beans are tender.' },
    ],
  },
  75: {
    title: 'Tbikha Algerian Spring Stew',
    cuisine: 'Algerian',
    dishType: 'Vegetable stew',
    description: 'Tbikha Algéroise is an Algerian spring stew of artichoke hearts, peas and split fava beans in a garlic, tomato and paprika sauce.',
    answer: 'Tbikha Algéroise is an Algerian spring vegetable stew. This version cooks artichoke hearts, green peas and split fava beans together in a shallow sauce of garlic, tomato paste, paprika and cayenne. It serves six.',
    faqs: [
      { question: 'Which vegetables go into tbikha?', answer: 'This Algiers spring version uses artichoke hearts, green peas and shelled split fava beans. The vegetables can vary with the season.' },
      { question: 'How is the sauce made?', answer: 'Warm garlic, tomato paste, paprika, cayenne and coriander in olive oil. Add the vegetables and water, then cover and simmer for 20–25 minutes until tender and the sauce has reduced.' },
    ],
  },
}

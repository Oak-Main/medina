export type AnswerLedRecipe = {
  slug: string
  title: string
  description: string
  answer: string
  faqs: { question: string; answer: string }[]
}

// Query-facing summaries for the November 2026 CTR rescue. Every fact is
// grounded in the recipe packet already published on the corresponding page.
export const ANSWER_LED_RECIPES: Record<number, AnswerLedRecipe> = {
  11: {
    slug: 'chapati-zanzibari',
    title: 'Chapati Zanzibar: Flaky Swahili Flatbread',
    description: 'Chapati Zanzibari is a flaky Swahili flatbread made by oiling, coiling and pan-cooking dough; this recipe makes 8 in 85 minutes.',
    answer: 'Chapati Zanzibari is a soft, flaky Swahili flatbread made by brushing rolled dough with oil, coiling it, then rolling and pan-cooking it into layers. This recipe makes 8 chapatis in about 1 hour 25 minutes.',
    faqs: [
      { question: 'What is chapati Zanzibar?', answer: 'It is a layered Swahili-coast flatbread related to Indian paratha, with soft sheets inside and a pan-browned exterior.' },
      { question: 'How is chapati Zanzibari made?', answer: 'Knead and rest the dough, roll and oil each round, coil it into a spiral, roll again and pan-cook until layered and golden.' },
    ],
  },
  12: {
    slug: 'karantita',
    title: 'Karantita: Algerian Chickpea-Flour Flan',
    description: 'Karantita is an Algerian chickpea-flour flan baked at 230°C for 30–35 minutes and served warm with cumin and harissa.',
    answer: 'Karantita is an Algerian chickpea-flour flan with a custardy centre and browned top, served warm with cumin and harissa. The rested batter bakes in a hot oiled pan at 230°C for 30–35 minutes.',
    faqs: [
      { question: 'What is karantita?', answer: 'Karantita is a savoury Algerian flan made from chickpea flour, water and oil, with a set centre and crisp, browned edges.' },
      { question: 'How do you make karantita?', answer: 'Whisk and rest the chickpea batter, pour it into a hot oiled pan and bake at 230°C for 30–35 minutes until golden and just set.' },
    ],
  },
  13: {
    slug: 'mahjouba-semolina-crepe',
    title: 'Mahjouba: Algerian Semolina Crêpes + Filling',
    description: 'Mahjouba is an Algerian semolina crêpe folded around tomato-onion confit; this recipe makes 8 parcels in about 2¼ hours.',
    answer: 'Mahjouba is an Algerian semolina crêpe folded around a slow-cooked tomato-and-onion filling and cooked on a hot griddle. This recipe makes 8 parcels in about 2 hours 15 minutes.',
    faqs: [
      { question: 'What is mahjouba?', answer: 'Mahjouba is an Algerian street-food crêpe made with semolina and folded into a square around tomato, onion and chilli confit.' },
      { question: 'How do you make mahjouba?', answer: 'Rest the semolina dough for 1 hour, cook the tomato-onion confit for 25–30 minutes, then stretch, fill, fold and griddle the parcels.' },
    ],
  },
  15: {
    slug: 'snail-babbouche-broth',
    title: 'Babbouche: Moroccan Snail Broth with Herbs',
    description: 'Babbouche is a Moroccan snail broth simmered for 1 hour with herbs and spices, then rested for 10 minutes before serving.',
    answer: 'Babbouche is a Moroccan street-food broth of food-grade snails simmered with aromatic herbs and spices. The pot simmers gently for 1 hour, then rests off the heat for 10 minutes before serving.',
    faqs: [
      { question: 'What is babbouche?', answer: 'Babbouche is a Moroccan snail soup or broth, seasoned with a concentrated blend of herbs and spices and served in small bowls.' },
      { question: 'How is babbouche made?', answer: 'Food-grade snails simmer with water, onion, garlic, herbs and spices for 1 hour, then rest in the broth for 10 minutes.' },
    ],
  },
  16: {
    slug: 'amlou',
    title: 'Msemen Amlou: Flatbread + Almond-Argan Dip',
    description: 'Msemen with amlou pairs flaky Moroccan flatbread with almond, argan-oil and honey dip; the amlou takes about 25 minutes.',
    answer: 'Msemen with amlou pairs flaky, square-folded Moroccan flatbread with a dip of roasted almonds, argan oil and honey. The amlou takes about 25 minutes: roast the almonds, grind them into a flowing butter, then blend in the argan oil and honey.',
    faqs: [
      { question: 'What is msemen amlou?', answer: 'It is a Moroccan breakfast pairing of warm, layered msemen flatbread with sweet almond, argan-oil and honey dip.' },
      { question: 'How is amlou made?', answer: 'Roast the almonds for 12–15 minutes, grind them for 8–12 minutes until flowing and glossy, then work in argan oil and honey.' },
    ],
  },
  25: {
    slug: 'mombar-rice-sausage',
    title: 'Mombar: Egyptian Rice Sausage + How It’s Made',
    description: 'Mombar is an Egyptian sausage of casings filled with herbed rice, simmered for 60–75 minutes and optionally fried golden.',
    answer: 'Mombar is an Egyptian rice sausage made by filling cleaned lamb or beef casings with herbed, spiced rice. The links simmer gently for 60–75 minutes until the rice is tender, then can be fried or griddled golden.',
    faqs: [
      { question: 'What is mombar?', answer: 'Mombar is an Egyptian dish of sausage casings packed with rice, herbs and spices, cooked until the filling is tender and sliceable.' },
      { question: 'How do you make mombar?', answer: 'Fill the casings only two-thirds full, prick the links, simmer gently for 60–75 minutes and finish them in a pan if you want a golden casing.' },
    ],
  },
  49: {
    slug: 'bakoula-mallow-stew',
    title: 'Bakoula: Moroccan Mallow Greens with Garlic',
    description: 'Bakoula is a Moroccan mallow-greens dish cooked with garlic and spices for 30–35 minutes until dark, soft and silky.',
    answer: 'Bakoula is a Moroccan cooked mallow-greens dish with garlic, paprika, cumin and preserved lemon. The greens simmer covered for 30–35 minutes until dark, soft and silky.',
    faqs: [
      { question: 'What is bakoula?', answer: 'Bakoula is a Moroccan preparation of mallow or mixed greens cooked down with garlic, spices and preserved lemon.' },
      { question: 'How do you make bakoula?', answer: 'Build an onion, garlic and spice base, add the greens and preserved lemon, then simmer covered for 30–35 minutes until the leaves crush to silk.' },
    ],
  },
  56: {
    slug: 'dfina-sabbath-stew',
    title: 'Dfina: Moroccan Jewish Overnight Sabbath Stew',
    description: 'Dfina is a Moroccan Jewish Sabbath stew of beef, chickpeas, wheat and eggs cooked overnight for 10–12 hours.',
    answer: 'Dfina is a Moroccan Jewish Sabbath stew of beef, chickpeas, wheat berries and shell-on eggs assembled before sundown. It cooks sealed and untouched overnight for 10–12 hours.',
    faqs: [
      { question: 'What is dfina?', answer: 'Dfina is the Moroccan form of Sephardic hamin: an overnight Sabbath pot containing beef, legumes, grains and eggs.' },
      { question: 'How do you make dfina?', answer: 'Assemble and season everything on Friday, seal the heavy pot and cook it at 100°C for 10–12 hours without opening it.' },
    ],
  },
  63: {
    slug: 'pkaila-spinach-beans',
    title: 'Pkaila: Sephardic Spinach, Beef & Bean Stew',
    description: 'Pkaila is a Sephardic spinach-and-bean stew whose greens are fried for 20 minutes into a dark paste before simmering.',
    answer: 'Pkaila is a Sephardic spinach-and-bean stew with a deep, concentrated flavour created by frying the greens well beyond wilting. The spinach cooks for 20 minutes into a dark paste before the cakes and beans go into the stew.',
    faqs: [
      { question: 'What is pkaila?', answer: 'Pkaila is a Sephardic greens stew made with spinach concentrated by long frying, white beans and, in this recipe, a little meat.' },
      { question: 'How do you make pkaila?', answer: 'Fry the spinach for 20 minutes until dark and pastelike, form and crust small cakes, then simmer them with the beans and sauce.' },
    ],
  },
  75: {
    slug: 'tbikha',
    title: 'Tbikha: Sephardic Vegetable Stew + How It’s Made',
    description: 'Tbikha is a Sephardic vegetable stew with potatoes, carrots and chickpeas, ready in about 1 hour 10 minutes.',
    answer: 'Tbikha is a flexible Sephardic vegetable stew built on tomato, garlic and warm spices, with potatoes, carrots and chickpeas in this version. It takes about 1 hour 10 minutes from start to finish.',
    faqs: [
      { question: 'What is tbikha?', answer: 'Tbikha is a Sephardic weekday vegetable stew: a fixed tomato-and-spice base adapted to the vegetables on hand.' },
      { question: 'How do you make tbikha?', answer: 'Cook the tomato-and-spice base, simmer the root vegetables and chickpeas for 20 minutes, then add the softer vegetables and finish cooking.' },
    ],
  },
}

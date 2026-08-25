/**
 * Transcribed verbatim from LRB_Meny_2026-003.pdf (the menu currently in the
 * room). Nothing here is invented: names, spelling, ingredient order, allergen
 * marks and prices are the restaurant's own, including its inconsistencies
 * ("parmasan", "chilsaus", "Tepsi" in title case).
 *
 * The `no` field is the real dish number people order by. They are
 * deliberately non-contiguous, which is why they are shown rather than hidden.
 *
 * Prices are NOK. A price change means a rebuild; that is the accepted cost of
 * a static export.
 */

export type Allergen =
  | "hvete"
  | "egg"
  | "melk"
  | "soya"
  | "sesam"
  | "fisk"
  | "sennep"
  | "gluten";

export type Dish = {
  /** Menu number as printed. Absent for sections that are not numbered. */
  no?: string;
  name: string;
  desc?: string;
  /** One price, or a set of named sizes. */
  price?: number;
  sizes?: { label: string; price: number }[];
  allergens?: Allergen[];
  spicy?: boolean;
  vegan?: boolean;
};

export type Section = {
  id: string;
  title: string;
  note?: string;
  sizeHeadings?: string[];
  dishes: Dish[];
  /** Small print printed in a box under the section. */
  extras?: { label: string; price: number }[];
};

export const MENU: Section[] = [
  {
    id: "pizza",
    title: "Pizza",
    note: "Alle pizza lages med tomatsaus og ost. Alle inneholder hvetemel og melk. Øvrige allergener er merket i menyen. Alle medium pizza kan fåes glutenfrie.",
    sizeHeadings: ["Medium", "Stor"],
    dishes: [
      { no: "1", name: "Margarita", desc: "tomatsaus og ost", sizes: [{ label: "Medium", price: 189 }, { label: "Stor", price: 239 }] },
      { no: "2", name: "Vesuvo", desc: "med skinke", sizes: [{ label: "Medium", price: 199 }, { label: "Stor", price: 249 }] },
      { no: "3", name: "Capriciosa", desc: "skinke og champignons", sizes: [{ label: "Medium", price: 204 }, { label: "Stor", price: 250 }] },
      { no: "6", name: "Hawaii", desc: "med skinke og ananas", sizes: [{ label: "Medium", price: 204 }, { label: "Stor", price: 250 }] },
      { no: "7", name: "Pepperoni", desc: "Paprika, ananas, pepperoni", sizes: [{ label: "Medium", price: 209 }, { label: "Stor", price: 260 }] },
      { no: "8", name: "Døner-pizza", desc: "Dønerkjøtt, chili, pommes frites, hvitløksaus", allergens: ["soya"], sizes: [{ label: "Medium", price: 259 }, { label: "Stor", price: 359 }] },
      { no: "9", name: "Ciao Ciao", desc: "Halvt innbakt med biff, løk, bearnaise", allergens: ["egg"], sizes: [{ label: "Medium", price: 219 }, { label: "Stor", price: 275 }] },
      { no: "11", name: "Paparazzi", desc: "Skinke, pepperoni, champignons, løk", sizes: [{ label: "Medium", price: 219 }, { label: "Stor", price: 275 }] },
      { no: "12", name: "Kyllingplukk", desc: "Kylling, løk, mais og karri", sizes: [{ label: "Medium", price: 209 }, { label: "Stor", price: 260 }] },
      { no: "13", name: "Roma", desc: "biff, champignons og løk", sizes: [{ label: "Medium", price: 219 }, { label: "Stor", price: 275 }] },
      { no: "14", name: "Husets spesial", desc: "Biff, pepperoni og skinke", sizes: [{ label: "Medium", price: 219 }, { label: "Stor", price: 275 }] },
      { no: "15", name: "Mamarosa", desc: "Pepperoni, salami og skinke", sizes: [{ label: "Medium", price: 219 }, { label: "Stor", price: 275 }] },
      { no: "16", name: "Lillehammer spesial", desc: "Biff, kjøttdeig, paprika, løk", sizes: [{ label: "Medium", price: 219 }, { label: "Stor", price: 275 }] },
      { no: "18", name: "Oppland spesial", desc: "Biff, skinke, bearnaise", allergens: ["egg"], sizes: [{ label: "Medium", price: 219 }, { label: "Stor", price: 275 }] },
      { no: "20", name: "Fåberggata spesial", desc: "Skinke, kjøttdeig, pepperoni, løk", sizes: [{ label: "Medium", price: 219 }, { label: "Stor", price: 305 }] },
      { no: "21", name: "Olympic spesial", desc: "Pepperoni, bacon, løk", sizes: [{ label: "Medium", price: 209 }, { label: "Stor", price: 270 }] },
      { no: "23", name: "Hockeypizza", desc: "skinke, kjøttdeig, løk", sizes: [{ label: "Medium", price: 209 }, { label: "Stor", price: 275 }] },
      { no: "25", name: "Kebabpizza", desc: "Kebabkjøtt, løk, jalapenos, salat, tomater, hvitløksaus", allergens: ["egg"], sizes: [{ label: "Medium", price: 229 }, { label: "Stor", price: 309 }] },
      { no: "26", name: "MC spesial", desc: "Biff, kjøttdeig, skinke, løk, ananas, bacon", sizes: [{ label: "Medium", price: 229 }, { label: "Stor", price: 319 }] },
      { no: "28", name: "Rio Grande", desc: "Biff, skinke, salami, løk, jalapenos", sizes: [{ label: "Medium", price: 219 }, { label: "Stor", price: 309 }] },
      { no: "29", name: "Kyllingkebab", desc: "Kylling, løk, jalapenos, salat, tomat, hvitløksaus", allergens: ["egg"], sizes: [{ label: "Medium", price: 229 }, { label: "Stor", price: 309 }] },
      { no: "38", name: "Milano", desc: "Kjøttdeig, løk, jalapenos, tacosaus, tortillachips, ruccola, hvitløksaus", allergens: ["egg"], spicy: true, sizes: [{ label: "Medium", price: 244 }, { label: "Stor", price: 309 }] },
      { no: "40", name: "Konya spesial", desc: "Skinke, kjøttdeig, løk, champignons, peppermix, jalapenos", spicy: true, sizes: [{ label: "Medium", price: 219 }, { label: "Stor", price: 309 }] },
      { no: "42", name: "Lag din egen pizza", desc: "Maks 4 typer kjøtt og 4 typer grønnsaker", sizes: [{ label: "Medium", price: 239 }, { label: "Stor", price: 329 }] },
    ],
    extras: [
      { label: "Ekstra kjøtt", price: 40 },
      { label: "Ekstra grønnsaker", price: 25 },
      { label: "Ekstra ost", price: 40 },
      { label: "Glutenfri pizza", price: 239 },
      { label: "Beger med saus", price: 30 },
    ],
  },
  {
    id: "italiensk",
    title: "Italiensk pizza",
    note: "Alle pizza lages med fersk mozzarella og moden parmesan.",
    sizeHeadings: ["Medium", "Stor"],
    dishes: [
      { no: "192", name: "Prima Fila", desc: "Mozzarella, parmaskinke, salami, champignons, løk, ruccola, olivenolje, parmesan", sizes: [{ label: "Medium", price: 234 }, { label: "Stor", price: 359 }] },
      { no: "193", name: "Romana", desc: "Mozzarella, kylling, ruccola, champignons, pesto, parmesan, løk, oliven", sizes: [{ label: "Medium", price: 234 }, { label: "Stor", price: 359 }] },
      { no: "194", name: "Quattro Formaggio", desc: "Mozzarella, blåmuggost, parmesan, pizzaost, ruccola, cherrytomater, olivenolje", sizes: [{ label: "Medium", price: 234 }, { label: "Stor", price: 359 }] },
      { no: "195", name: "Pizza Aubergine", desc: "Strimlet ytrefilet, mozzarella, soltørkede tomater, aubergine, ruccola og parmesan", sizes: [{ label: "Medium", price: 234 }, { label: "Stor", price: 359 }] },
      { no: "196", name: "Il Vegetariano", desc: "Mozzarella, soltørket tomat, oliven, parmesan, ruccola og olivenolje", sizes: [{ label: "Medium", price: 234 }, { label: "Stor", price: 359 }] },
      { no: "197", name: "Vegetare Bianca", desc: "Med hvit pizzasaus av creme fraiche toppet med spinat, oliven, cherrytomater, mozzarella, ruccula, parmesan og olivenolje", sizes: [{ label: "Medium", price: 234 }, { label: "Stor", price: 359 }] },
    ],
  },
  {
    id: "innbakt",
    title: "Innbakt",
    dishes: [
      { no: "30", name: "Calzone", desc: "med skinke", price: 219 },
      { no: "33", name: "Alanya", desc: "med skinke, biff og løk", price: 219 },
    ],
  },
  {
    id: "tyrkisk",
    title: "Tyrkiske retter",
    dishes: [
      { no: "80", name: "Tyrkisk gryte", desc: "Entrecôte, båtpoteter, grønnsaker, surret i egen saus", allergens: ["hvete"], price: 359 },
      { no: "81", name: "Sish kebab", desc: "Grillspyd med marinert entrecôte 300g (*kyllingfilet), paprika, løk, tomat, bulgur", allergens: ["melk"], price: 499 },
      { no: "82", name: "Døner planke", desc: "Grillet Døner-rull, chili, fries, bulgur, granateple-sirup toppet med dønerkjøtt. Dipper", allergens: ["hvete", "egg", "melk"], price: 349 },
      { no: "83", name: "Mix grill", desc: "2 grillspyd med marinert kylling, 1 spyd med entrecôte, dønerkjøtt, løk, tomat, bulgur", allergens: ["melk", "gluten"], price: 499 },
      { no: "84", name: "Kylling kebab tallerken", desc: "Kylling, salat, chili, hvitløksdressing og fries", allergens: ["hvete", "egg", "melk", "sennep"], price: 245 },
      { no: "85", name: "Kebab tallerken", desc: "Dønerkjøtt, salat, chili, hvitløksdressing og fries", allergens: ["hvete", "egg", "melk", "sennep"], price: 245 },
      { no: "86", name: "Tepsi", desc: "Strimlet ytrefilet, aubergine, paprika, tomat, hvitløk, tomatsaus, mozzarella, bakt i ovn. Serveres med brød og bulgur", allergens: ["hvete", "sesam", "melk"], price: 349 },
      { no: "88", name: "Lillehammer kebab", desc: "Dønerkjøtt (*kylling), anrettet på pizzabunn, salat, chilsaus, hvitløksdressing, toppet med chips", allergens: ["hvete", "egg", "melk", "sennep"], price: 245 },
      { no: "90", name: "Rullekebab", desc: "Dønerkjøtt, salat, chilisaus, hvitløksaus, fries", allergens: ["hvete", "egg", "melk", "sennep"], price: 245 },
      { no: "94", name: "Kyllingrull", desc: "Kyllingkjøtt, salat, chilisaus, hvitløksaus, fries", allergens: ["hvete", "egg", "melk", "sennep"], price: 245 },
      { no: "96", name: "Mix tallerken", desc: "Dønerkjøtt og kyllingkjøtt, løk, bulgur, salat, fries", allergens: ["hvete"], price: 269 },
    ],
  },
  {
    id: "kjott",
    title: "Kjøttretter",
    dishes: [
      { no: "60", name: "Husets biff", desc: "Indrefilet med bearnaise, grønnsaker og fries", allergens: ["egg"], price: 499 },
      { no: "61", name: "Pepperbiff", desc: "Indrefilet med peppersaus, grønnsaker og bakt potet", allergens: ["hvete", "melk"], price: 499 },
      { no: "64", name: "Plankestek", desc: "Indrefilet på planke, grønnsaker, bearnaise, peppersaus, gratinert potetmos", allergens: ["hvete", "egg", "melk"], price: 529 },
      { no: "66", name: "Pollo a la Mjøsa", desc: "Kyllingfilet med fløtesaus og peppersaus, grønnsaker, fløtegratinerte poteter", allergens: ["hvete", "melk"], price: 359 },
      { no: "67", name: "Biffsnadder", desc: "Strimlet ytrefilet, champignons, løk, paprika, bearnaise, salat og fries", allergens: ["egg"], price: 349 },
      { no: "69", name: "Løvstek", desc: "Med salat, bearnaise og fries", allergens: ["egg"], price: 255 },
      { no: "77", name: "Kyllingsnadder", desc: "Strimlet kyllingfilet, salat, champignons, paprika, løk, bearnaise og fries", allergens: ["egg"], price: 349 },
      { no: "93", name: "Husets entrecotè", desc: "Marmorert og saftig, serveres med bbq-saus, grønnsaker og søtpotet fries", allergens: ["soya", "sennep"], price: 499 },
    ],
    extras: [
      { label: "Fries, sprø pommes frites", price: 45 },
      { label: "Søtpotet fries", price: 59 },
      { label: "Fløtegratinerte poteter", price: 59 },
      { label: "Bakt potet", price: 59 },
    ],
  },
  {
    id: "burger",
    title: "Hamburgere",
    sizeHeadings: ["180gr", "360gr", "540gr"],
    dishes: [
      { no: "149", name: "Hockeyburger tallerken", desc: "Bacon, ost, kyllingklubber, salat, aioli, chili cheese nuggets, gourmet fries", allergens: ["hvete", "egg", "melk", "sennep"], sizes: [{ label: "180gr", price: 249 }, { label: "360gr", price: 329 }, { label: "540gr", price: 399 }] },
      { no: "150", name: "Cheeseburger tallerken", desc: "Ost, salat, aioli, tortillachips, gourmet fries, chili cheese nuggets, kyllingklubber", allergens: ["hvete", "egg", "melk", "sennep"], sizes: [{ label: "180gr", price: 249 }, { label: "360gr", price: 329 }, { label: "540gr", price: 399 }] },
      { no: "151", name: "Hashbrown Tex burger", desc: "Sprø Hashbrown, bacon, guacamole, rømmedressing, aioli, nuggets, kyllingklubber", allergens: ["hvete", "egg", "melk", "sennep"], sizes: [{ label: "180gr", price: 269 }, { label: "360gr", price: 349 }, { label: "540gr", price: 419 }] },
      { no: "152", name: "Hamburger tallerken", desc: "Ost, salat, løkringer, chili cheese nuggets, kyllingklubber, bbq-saus, gourmet fries", allergens: ["hvete", "egg", "melk", "sennep"], sizes: [{ label: "180gr", price: 269 }, { label: "360gr", price: 349 }, { label: "540gr", price: 419 }] },
      { no: "146", name: "Kyllingburger tallerken", desc: "Panert kyllingburger, ost, løkringer, chili cheese nuggets, aioli, gourmet fries", allergens: ["hvete", "egg", "melk", "sennep"], sizes: [{ label: "130gr", price: 269 }, { label: "260gr", price: 349 }] },
    ],
    extras: [
      { label: "Ekstra ost, aioli eller barbequesaus", price: 25 },
      { label: "5 stk chili cheese nuggets", price: 89 },
    ],
  },
  {
    id: "pasta",
    title: "Pasta",
    note: "Serveres med hvitløksmør og hjemmebakt brød.",
    dishes: [
      { no: "100", name: "Spaghetti a la Bolognese", desc: "Kjøttsaus, parmasan og olivenolje", allergens: ["hvete", "egg"], price: 249 },
      { no: "101", name: "Spaghetti Carbonara", desc: "Eggeplomme, løk, bacon, fløtesaus, parmasan og olivenolje", allergens: ["hvete", "egg", "melk"], price: 249 },
      { no: "102", name: "Kremet penne", desc: "Kylling, sopp, parmesan og olivenolje", allergens: ["hvete", "egg", "melk"], price: 249 },
      { no: "104", name: "Ravioli a la Mjøsa", desc: "Kjøttfylte pastaputer med biff, skinke, løk, fløtesaus, parmasan og olivenolje", allergens: ["hvete", "egg", "melk"], price: 249 },
      { no: "107", name: "Ravioli a la Bolognese", desc: "Kjøttfylte pastaputer med biff, kjøttsaus, peppersaus, fløte, parmasan og olivenolje", allergens: ["hvete", "egg", "melk"], price: 249 },
    ],
  },
  {
    id: "fisk",
    title: "Fiskeretter",
    dishes: [
      { no: "170", name: "Panert rødspette", desc: "Med remulade, salat, fries", allergens: ["hvete", "egg", "soya", "fisk"], price: 239 },
      { no: "172", name: "Fish & chips", desc: "Klassisk av torskefilet med fries, salat og remulade", allergens: ["hvete", "egg", "soya", "fisk"], price: 285 },
      { no: "173", name: "Fiskeburger", desc: "Ca 150 gram av torsk. Brød, salat, aioli, løkringer, fries", allergens: ["hvete", "egg", "soya", "fisk"], price: 275 },
    ],
  },
  {
    id: "vegetar",
    title: "Vegetar og vegan",
    dishes: [
      { no: "200", name: "Naturli' burger", desc: "Salat, fries, løkringer", allergens: ["hvete", "soya"], vegan: true, price: 309 },
      { no: "201", name: "Crispy Naturli' nuggets", desc: "Salat, fries", allergens: ["hvete", "soya"], vegan: true, price: 299 },
      { no: "202", name: "Loaded hasbrowns", desc: "Toppet med salat, crispy no meat nuggets, aioli, ost, tomat. Potetbåter", allergens: ["hvete", "egg", "melk", "soya"], vegan: true, price: 320 },
    ],
  },
  {
    id: "salat",
    title: "Salater",
    note: "Alle salater serveres med dressing, ost, hvitløksmør og hjemmebakt brød.",
    dishes: [
      { no: "47", name: "Kyllingsalat", desc: "Kylling, tomat, paprika, ost, hvitløksbrød", price: 235 },
      { no: "50", name: "Gresk salat", desc: "Fetaost, tomat, løk, paprika, oliven, olivenolje og hvitløksbrød", price: 229 },
      { no: "52", name: "Kylling med bakt potet", desc: "Kyllingfilet i biter, dressing, mozzarellaost og salat", price: 229 },
    ],
  },
  {
    id: "forrett",
    title: "Forretter og småretter",
    dishes: [
      { no: "A", name: "Buffalo wings", desc: "8 stk. med hvitløksaus", allergens: ["melk"], price: 249 },
      { no: "B", name: "Hjemmebakt brød", desc: "med hvitløksmør", allergens: ["hvete", "egg", "melk"], price: 129 },
      { no: "C", name: "Brød med soltørkede cherrytomater", desc: "mozzarella og oliven", allergens: ["hvete", "sesam", "melk"], price: 129 },
      { no: "D", name: "Nachos", desc: "Tortillachips, kjøttdeig, hvitløksaus, salsadip, jalapenos, ost", allergens: ["melk"], price: 214 },
      { no: "F", name: "Ølpanerte løkringer og mozzarella-sticks", desc: "Med hvitløksaus", allergens: ["melk"], price: 214 },
    ],
  },
  {
    id: "barn",
    title: "Barnemeny",
    note: "Maks 12 år.",
    dishes: [
      { no: "110", name: "Nuggets med fries", allergens: ["hvete", "egg"], price: 125 },
      { no: "111", name: "Pølse med potetmos", allergens: ["melk"], price: 129 },
      { no: "112", name: "Hamburger med fries", allergens: ["hvete", "egg", "melk"], price: 125 },
      { no: "113", name: "Pølse med fries", allergens: ["melk"], price: 129 },
      { no: "114", name: "Spaghetti med kjøttsaus", allergens: ["hvete", "egg"], price: 125 },
      { no: "115", name: "Pizza junior med skinke", allergens: ["hvete", "melk"], price: 125 },
      { no: "116", name: "Fries", desc: "sprøfriterte pommes frites", price: 49 },
      { no: "117", name: "Søt fries", price: 49 },
    ],
  },
  {
    id: "dessert",
    title: "Dessert",
    dishes: [
      { name: "Coppa Tre Amori", desc: "Tre kuler is, krem og saus", price: 149 },
      { name: "Bananasplitt", desc: "Is, krem og saus", price: 149 },
      { name: "Varm eplekake", desc: "med is, krem og saus", price: 149 },
      { name: "Churros", desc: "friterte, med sjokoladedip og iskrem", price: 149 },
      { name: "Lun sjokoladefondant", desc: "med vaniljeis", price: 149 },
      { name: "Vaffel med is", price: 129 },
      { name: "Creme brulee", price: 149 },
    ],
  },
  {
    id: "kaffe",
    title: "Kaffe",
    dishes: [
      { name: "Kaffe, te", price: 40 },
      { name: "Iste", price: 56 },
      { name: "Iskaffe", price: 89 },
      { name: "Cappuccino", price: 59 },
      { name: "Café latte", price: 59 },
      { name: "Espresso", price: 59 },
      { name: "Café mocca", price: 59 },
      { name: "Kakao", price: 59 },
    ],
  },
  {
    id: "mineralvann",
    title: "Mineralvann",
    sizeHeadings: ["0,33", "0,5", "1 liter"],
    dishes: [
      { name: "Fanta Orange", sizes: [{ label: "0,5", price: 65 }, { label: "1 liter", price: 130 }] },
      { name: "Fanta Exotic", sizes: [{ label: "0,33", price: 56 }, { label: "0,5", price: 65 }, { label: "1 liter", price: 130 }] },
      { name: "Sprite Refresh", sizes: [{ label: "0,5", price: 65 }, { label: "1 liter", price: 130 }] },
      { name: "Coca Cola", sizes: [{ label: "0,33", price: 56 }, { label: "0,5", price: 65 }, { label: "1 liter", price: 130 }] },
      { name: "Coca Cola Zero", sizes: [{ label: "0,33", price: 56 }, { label: "0,5", price: 65 }, { label: "1 liter", price: 130 }] },
      { name: "Bonaqua", sizes: [{ label: "0,5", price: 65 }] },
      { name: "Urge", sizes: [{ label: "0,5", price: 65 }] },
      { name: "Eplemost", price: 56 },
      { name: "Appelsinjuice", price: 56 },
      { name: "Kuli-drikke", price: 30 },
    ],
  },
];

export const ALLERGEN_LABEL: Record<Allergen, string> = {
  hvete: "Hvete",
  egg: "Egg",
  melk: "Melk",
  soya: "Soya",
  sesam: "Sesam",
  fisk: "Fisk",
  sennep: "Sennep",
  gluten: "Gluten",
};

export const DISH_COUNT = MENU.reduce((n, s) => n + s.dishes.length, 0);

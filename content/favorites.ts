import type { MotifName } from "@/components/Motif";

/**
 * Five, not a hundred and eight. The full menu is a page away; this is the
 * shortlist someone can decide from while standing in the street. Numbers,
 * names, ingredients and prices are the restaurant's own.
 */
export type Favorite = {
  no: string;
  name: string;
  desc: string;
  price: number;
  motif: MotifName;
};

export const FAVORITES: Favorite[] = [
  {
    no: "88",
    name: "Lillehammer kebab",
    desc: "Dønerkjøtt på pizzabunn, salat, chilisaus, hvitløksdressing, toppet med chips.",
    price: 245,
    motif: "hill",
  },
  {
    no: "83",
    name: "Mix grill",
    desc: "To spyd marinert kylling, ett spyd entrecôte, dønerkjøtt, løk, tomat og bulgur.",
    price: 499,
    motif: "skewer",
  },
  {
    no: "86",
    name: "Tepsi",
    desc: "Ytrefilet, aubergine, paprika, tomat og mozzarella, bakt i ovn. Brød og bulgur ved siden av.",
    price: 349,
    motif: "flame",
  },
  {
    no: "25",
    name: "Kebabpizza",
    desc: "Kebabkjøtt, løk, jalapenos, salat, tomater og hvitløksaus.",
    price: 229,
    motif: "peel",
  },
  {
    no: "192",
    name: "Prima Fila",
    desc: "Fersk mozzarella, parmaskinke, salami, champignons, ruccola og moden parmesan.",
    price: 234,
    motif: "peel",
  },
];

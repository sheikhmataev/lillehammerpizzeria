/**
 * The restaurant already runs live systems: GetFood for table booking and
 * takeaway, Delivia for delivery. The URLs are wired here, but ordering is
 * held behind one flag while the new flows are still placeholders.
 *
 * Flip ORDERING_LIVE to true and every call to action starts pointing at the
 * real endpoints instead of the in-house placeholder flow.
 */
export const ORDERING_LIVE = false;

export const LINKS = {
  bookTable: "https://getfood.no/lillehammerrestaurant/bord",
  takeaway: "https://getfood.no/lillehammerrestaurant/menu/578",
  delivery: "https://q-r.to/appdelivia",
  phone: "tel:+4761259060",
  phoneLabel: "61 25 90 60",
  maps: "https://www.google.com/maps/search/?api=1&query=Lillehammer+Restaurant+%26+Bar+Storgata+61+Lillehammer",
  instagram: "https://www.instagram.com/lillehammer_pizzeria/",
  facebook:
    "https://www.facebook.com/people/Lillehammer-pizzeria-restaurant/100075943672688/",
  sisterCafe: "https://lillehammerkafe.no/",
} as const;

/** Real, from the restaurant's Google Business profile. Not a placeholder. */
export const GOOGLE = {
  rating: 4.4,
  count: 953,
} as const;

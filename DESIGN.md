# Lillehammer Restaurant & Bar — design plan

## 1. Strategic concept

### Refined vibe: "Klokka i Lillehammer"

The vibe input was blank, so here is the one the firm actually earns.

Three facts decided it. The kitchen never opens before 15.00, so this is an
evening room and nothing else. The food is Turkish home cooking, served in a
Norwegian ski town, which is a genuine collision and not a positioning
exercise. And the room itself is dark, amber and full, with a photographic
mural of the Olympic hills on the back wall.

So the site is not themed light or dark. It is themed **hot or cold, by the
real wall clock in Lillehammer**. Before 15.00 the page is petrol blue,
desaturated, slow moving, and the photographs look like the street outside.
At 15.00 the room turns on: the surface goes to true black, the accent
becomes the red from the logo, the photographs regain their heat, and the
motion gets fast and mechanical. At 22.00 or 23.00 it cools again and tells
you when it opens next.

**Why this hooks people.** The single most searched thing about any
restaurant is whether it is open. Most sites bury that in a footer. Here it
is the entire art direction, so the most useful fact on the page is also the
most beautiful thing on the page. A site that visibly knows it is 21.47 on a
Tuesday and says the kitchen closes in thirteen minutes creates urgency that
is completely true, which is the only kind worth building. It also makes the
page different at different hours, which is the cheapest possible reason for
someone to send the link to a friend.

**The rule that outranks the concept.** Real traffic is a person outside in
the cold at 19.40 with one hand free. Opening hours, booking and the phone
number stay one thumb away at every scroll depth, in every state. The
cinema is for people who choose to linger. It is never a toll gate.

### Selected inspirations

Five picked from `design_list.md`. Four are deliberately from outside food
and hospitality, because the obvious grabs (Starbucks Reserve, Aesop) would
produce exactly the site everyone expects.

**82. Nothing Tech** — black, white, red dot matrix, transparent internals.
Applied to: the live status system. The clock, the open sign and the hours
table are treated as a piece of hardware signage rather than as web UI. The
palette is genuinely close already, since the logo red sampled from the mark
is `#E81820`. Where Nothing exposes the circuit board, we expose the kitchen.

**70. Off-White** — industrial brutalism, raw factory imagery, quotation as a
label system. Applied to: the decision to lead with the unglamorous
stainless-steel kitchen photographs instead of hiding them behind the styled
ones. Roughly half of the supplied photos are flash-lit plates on a steel
counter. Those are the honest ones and they become the menu, labelled in
hard uppercase tags rather than art-directed.

**57. Studio Freight** — marquees, blue-collar craft applied to high-end
work, industrial green. Applied to: the horizontal drag mechanics of the
Pass, the ticker of what is coming out of the kitchen, and the general
refusal to round a single corner. Their industrial green becomes our petrol,
sampled from the plates.

**83. Bellroy** — demonstrating function through short looping video rather
than describing it. Applied to: the dish loops, and to the booking flow,
which is built to be finished rather than to be admired.

**54. Exo Ape** — slow, dark, cinematic, luxury conveyed through restraint.
Applied narrowly, and only to the warm state, in the Room section. This is
the one reference we deliberately ration, because a whole site of it is the
cliché the kill list bans.

### Design system

**Colour.** Every value below was sampled out of the restaurant's own logo
and photographs with a script, not chosen. Nothing here is approximate.

| Token | Hex | Sampled from |
|---|---|---|
| `ember` | `#E81820` | the crossed fork and knife in the logo |
| `ink` | `#080808` | the interior at night |
| `carbon` | `#231F20` | the logo lockup background |
| `petrol` | `#204050` | the house ceramic plate, in shadow |
| `sage` | `#90A8A0` | the same plate, lit |
| `amber` | `#D86800` | the Edison bulbs and the bar cocktails |
| `bone` | `#DCCEB8` | lavash bread and plate rims |

The teal plate is the quiet win. It appears under nearly every dish in the
photo library, which means the restaurant already owns a secondary colour and
has never once used it.

Cold state maps surface to `petrol-deep` and accent to `sage`. Warm state
maps surface to `ink` and accent to `ember`. No third theme, no toggle with a
sun and a moon on it.

**Type.**

- Display: **Archivo**, variable, using the width axis on purpose. Condensed
  at 68 for dish names so long Norwegian and Turkish names nest without
  shrinking; expanded at 112 to 118 for the wordmark and the clock so numerals
  read as signage.
- Text: **Instrument Sans**. Full Norwegian coverage, slightly odd, not yet
  everywhere.
- Data: **Martian Mono**, variable width. Every price, time and receipt line.

No serif. A thin serif over a dark photograph is on the kill list, and the
brand is a grill, not a wine bar.

**UI physics.** Two regimes, switched by temperature, which is the point.

- Warm: snappy and mechanical. Spring stiffness 380 to 500, damping 26 to 40,
  mass 0.5. Durations 180 to 380 ms. Things stamp and click.
- Cold: heavy and slow. Duration based, `cubic-bezier(0.16, 1, 0.3, 1)`,
  620 to 1100 ms. Things settle.

Radius is 0 everywhere except a plate, which is a circle. There are no box
shadows anywhere in the system; depth comes from hairlines and colour
blocking. Two hard limits, both already enforced in code: no CSS transition
may be attached to a property fed by a theme-swapped custom property, and no
entrance animation may be the reason an element is visible. The reasons are
in `app/globals.css` and `lib/use-entrance.ts`.

---

## 2. Architecture

Norwegian is the primary language at `/`, English at `/en/`.

### Hero — "Døra" (built)

**Layout.** Asymmetric 7/5 split, never centred. Left is a full-bleed well of
the room. Right is a docket: meta row, wordmark, the week's hours as a live
table, three lines of copy, two buttons, address block. Mobile stacks to a
52svh image and a docket beneath it.

**Interactions.** The room opens like a service hatch, a clip-path inset
animating out from the horizontal centre line. The wordmark does not fade in;
Archivo's width axis animates from 62 to 112 so the letters physically inflate
into place, staggered 45 ms per letter. Both rest at their final state and
only play when the document is visible. The clock updates every 20 seconds and
on window focus. Buttons are magnetic on pointer devices and inert on touch.

**Copy.** `Tyrkisk hjemmelaget. / Pizza fra ovnen. / Bar til stengetid.`
Buttons: `Bestill bord`, `Takeaway`. Status line, live:
`Åpent nå. Kjøkkenet stenger 22.00` / `Siste time. Kjøkkenet stenger om 43
min` / `Stengt nå. Åpner tir 15.00`.

### Passet — the pass

**Layout.** One horizontal strip of plates, the full width of the viewport,
scrolled sideways. Cards are deliberately unequal: width is derived from each
photograph's real aspect ratio and the length of the dish name, so no two
columns line up. This is the direct answer to the uniform-card tell.

**Interactions.** Scroll-linked horizontal travel on desktop, native
momentum swipe on touch. Filter tags along the top, and selecting one makes
the rejected plates slide off the pass rather than fade. Each plate holds a
short loop that plays on hover or when centred on mobile.

**Copy.** Tags in hard uppercase: `PIZZA` `GRILL` `TYRKISK` `BURGER`
`PASTA` `FISK` `VEGETAR` `SALAT`. Header: `Det som går ut nå.`

### Menyen — the menu

**Layout.** Dense, typographic, no photographs. Two columns on desktop,
one on mobile. Dish name in condensed Archivo, dotted leader, price in
Martian Mono, all prices optically aligned. This section is meant to feel
like a printed menu, and its density is the deliberate counterweight to the
Pass.

**Interactions.** Sticky category rail. Allergen and vegetarian marks are
inline glyphs from the custom icon set, never emoji. Tapping a dish name
pulls its photograph in from the Pass, so the two sections are one dataset.

**Data.** One typed file, `content/menu.ts`. Price changes mean a rebuild,
which is the accepted trade for a static export.

### Rommet — the room

**Layout.** Full-bleed, the one cinematic hold on the page. Three interior
photographs layered at different parallax depths, with the mountain mural on
the back wall as the deepest layer.

**Interactions.** Scroll-linked parallax, slow. The amber lamps get a very
slow luminance drift so the picture is never dead. This section is skipped
entirely by the cold theme's motion regime, which makes the room feel closed.

**Copy.** `Bakgården, Storgata 61. Siden 2003.` and
`Bordet er ditt til vi stenger.`

### Kvelden — booking

Replaces the contact form. Three beats, each answer printing onto a thermal
receipt that grows in real time beside the questions.

1. `Hvor vil du sitte?` — Bord / Bar / Takeaway
2. `Når?` — time chips generated live from the opening hours, past times
   greyed out, tonight and tomorrow only
3. `Hvem skal jeg skrive opp?` — name, phone, number of people

Submitting tears the receipt off, a clip-path tear with a spring, and posts
to the Cloudflare Worker. Keyboard reachable end to end, one question per
screen on mobile, back always available.

### Takeaway, Finne fram, Footer

Takeaway routes to whatever ordering system is already in use. Finne fram
exists because the entrance is from the courtyard and people miss it; a
static map frame, the walk described in one line, and a phone link. Footer
carries the legal and allergen information, the hours table again, and the
language switch.

---

## 3. MCP asset blueprint

Photographs are never generated. Fifty-one real images exist, they are
already converted to responsive WebP in `public/photos`, and generated food
for a real restaurant would misrepresent the menu. Recraft is used only for
vector furniture: icons, textures, the map, and the receipt frame.

**Recraft, icon set.**
> A set of 16 flat vector pictograms drawn as a single continuous stroke,
> 1.5px uniform weight, hard square terminals, no rounded corners, no fills,
> no gradients, drawn on a strict 24 by 24 grid. Subjects: a wood-fired oven,
> a skewer, a charcoal grill, a pizza peel, a lavash flatbread, a yogurt bowl,
> a wheat ear, a chilli, a fish, a wine glass, a beer tap, a coffee cup, a
> vegetarian leaf, a nut, a milk drop, a telephone handset. Single colour
> `#DCCEB8` on transparent. Industrial signage feel, closer to a machine
> manual than to a restaurant menu. No text, no shadows, no perspective.

**Recraft, texture.**
> A seamless tileable grain texture resembling brushed stainless steel under
> hard flash, very low contrast, monochrome, subtle directional scratches
> running horizontally, no visible seams, no highlights, no logos. Neutral
> grey around `#8A8F92`. Flat, matte, no gloss.

**Recraft, receipt frame.**
> A vector thermal receipt shape, tall and narrow, with a torn perforated
> lower edge showing irregular paper fibres, flat single colour `#DCCEB8` on
> transparent, no drop shadow, no skeuomorphic paper texture, no text, no
> barcode. Hard geometric tear, not a soft wavy edge.

**Higgsfield, dish loops.** Only if the restaurant is filmed. If loops are
generated from the existing stills instead, they are limited to camera moves
over real photographs, never invented food.
> Slow 4 second seamless loop. Locked overhead shot of a grill platter on a
> dark oiled wood table, lit by a single warm practical lamp at frame left.
> The only movement is steam rising from the bulgur and a slow 3 degree
> camera rotation. No hands, no people, no cuts, no text. Warm amber key,
> deep shadow, filmic grain.

---

## 4. AI-tell audit of this plan

| Tell | Status |
|---|---|
| Em dashes in UI copy | None. Copy uses full stops and stacked lines. |
| Indigo to violet palette | None. Every colour sampled from the firm's own assets. |
| Left-border gradient cards | Banned in the system. Hairlines and colour blocking only. |
| Emoji as icons | Banned. Custom single-stroke vector set specified above. |
| Invented testimonials | No reviews section unless the real Google reviews are supplied. |
| Few or generated images | 51 real photographs. Generation restricted to vectors. |
| Curly quotes | Norwegian `«»` used correctly where quoting; straight marks elsewhere. |
| Rigid symmetry, equal cards | The Pass sizes cards from real aspect ratios and name lengths. |
| Empty `py-24` whitespace | The hero carries a seven-row hours table specifically to kill the vacuum. The menu is deliberately dense. |
| 20px radius, soft shadows, glow | Radius 0, zero box shadows in the system. |
| Centred hero with fade-up | 7/5 asymmetric split, width-axis inflation, no fade anywhere. |

---

## 5. Decisions still needed

1. **Booking.** Is there a provider (Favrit, Superb, DineOut, OpenTable) or
   is it phone only? The receipt flow posts to the Worker either way, but if
   a provider exists the flow should hand off to it rather than compete.
2. **Takeaway.** Own flow, Foodora, Wolt, or phone.
3. **Menu data.** Dishes and prices, ideally as a list. Nothing is invented.
4. **Photo to dish mapping.** The 51 photos are unlabelled. Someone who
   knows the menu needs to name them, or the Pass ships with categories only.
5. **Reviews.** Real Google or Facebook reviews with real first names and
   dates, or the section does not exist.
6. **Video.** Whether anything will be filmed in the room. If not, the loops
   are dropped rather than generated.

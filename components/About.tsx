import { DISH_COUNT } from "@/content/menu";

export function About() {
  return (
    <section
      id="om-oss"
      className="hairline-t scroll-mt-20 px-4 py-16 md:px-8 md:py-24"
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
        <h2 className="section-title" style={{ color: "var(--fg-strong)" }}>
          Om oss
        </h2>

        <div className="flex max-w-[58ch] flex-col gap-6">
          <p className="text-xl leading-snug md:text-2xl" style={{ color: "var(--fg-strong)" }}>
            Siden 2003 i Storgata 61. Inngangen er fra bakgården, og det er
            fortsatt det folk går forbi.
          </p>

          <p>
            Kjøkkenet er tyrkisk og italiensk på én gang. Pizza fra ovnen med
            tynn bunn, grillspyd og bulgur fra samme benk, pasta og salater ved
            siden av. Kjøkkensjef er Haval Ibrahim.
          </p>

          <p>
            {DISH_COUNT} retter på menyen. Det er ikke en forglemmelse. Poenget
            er at alle rundt bordet skal finne noe de har lyst på, enten det er
            et lag etter kamp, en familie på fem eller to som skal videre på
            byen.
          </p>

          <p>
            Baren holder åpent til kjøkkenet er ferdig, og litt til på fredag og
            lørdag.
          </p>
        </div>
      </div>
    </section>
  );
}

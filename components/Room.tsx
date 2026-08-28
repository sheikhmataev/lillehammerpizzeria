import { GOOGLE, LINKS } from "@/lib/links";
import { Motif } from "@/components/Motif";

export function Room() {
  return (
    <section id="om-oss" className="on-ink scroll-mt-24 px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[76rem] gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <h2 className="display-lg" style={{ color: "var(--fg-strong)" }}>
            Siden 2003
          </h2>
          <Motif name="tea" size={140} className="mt-8 opacity-[0.16]" />
        </div>

        <div className="flex max-w-[54ch] flex-col gap-5">
          <p className="text-xl md:text-2xl" style={{ color: "var(--fg-strong)" }}>
            Tyrkisk kjøkken i en norsk skiby, i bakgården i Storgata, i 23 år.
          </p>
          <p>
            Grillspyd og bulgur fra samme benk som pizzaen. Kjøkkensjef er Haval
            Ibrahim. Baren holder åpent til kjøkkenet er ferdig, og litt til på
            fredag og lørdag.
          </p>

          <a
            href={LINKS.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-baseline gap-4"
          >
            <span
              className="figure-num text-5xl md:text-6xl"
              style={{ color: "var(--mark)" }}
            >
              {GOOGLE.rating.toString().replace(".", ",")}
            </span>
            <span className="tag" style={{ color: "var(--fg-strong)" }}>
              av 5 fra {GOOGLE.count} anmeldelser på Google
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

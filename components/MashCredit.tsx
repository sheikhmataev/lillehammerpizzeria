import Script from "next/script";
import { asset } from "@/lib/asset";

/**
 * Mash Partners' own credit badge, a Shadow DOM custom element. The script is
 * served from this site rather than mashpartners.no so a third-party outage or
 * block cannot silently remove the credit; point `src` at
 * https://mashpartners.no/embed/mash-credit.js to track their copy instead.
 *
 * The badge takes all of its colour from `currentColor`, so setting --fg here
 * is the whole integration: the eyebrow and hairlines derive from it, and the
 * coral and cobalt inks only appear on hover.

 */
export function MashCredit() {
  return (
    <>
      <Script src={asset("/embed/mash-credit.js")} strategy="afterInteractive" />
      <mash-credit
        variant="minimal"
        lang="nb"
        services=""
        location=""
        org=""
        className="max-w-full"
        style={{ color: "var(--fg)" }}
      />
    </>
  );
}

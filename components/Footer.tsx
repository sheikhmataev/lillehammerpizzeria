import { Logo } from "@/components/Logo";
import { MashCredit } from "@/components/MashCredit";

/**
 * Deliberately thin. The address, the phone number, the opening hours and the
 * social links all live in Finn oss, directly above this on the home page, so
 * repeating them here would be the third and fourth time a visitor reads the
 * same line. What is left is the mark, the credit, and a way back up.
 */
export function Footer() {
  return (
    <footer
      className="on-ink px-4 pb-28 pt-14 md:px-8 md:pb-14"
      style={{ borderTop: "1px solid var(--rule)" }}
    >
      <div className="mx-auto max-w-[80rem]">
        <Logo height={46} />

        <div
          className="mt-10 flex flex-wrap items-baseline justify-between gap-x-8 gap-y-4 pt-6"
          style={{ borderTop: "1px solid var(--rule)" }}
        >
          <MashCredit />
          <a href="#top" className="tag" style={{ color: "var(--fg-mute)" }}>
            Til toppen
          </a>
        </div>
      </div>
    </footer>
  );
}

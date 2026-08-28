import { MashCredit } from "@/components/MashCredit";

/**
 * Deliberately thin. The mark now sits in the bar at the top of every page,
 * and the address, phone number, opening hours and social links all live in
 * Finn oss directly above this, so a footer copy of any of it would be the
 * third time a visitor reads the same line. What is left is the credit and a
 * way back up.
 */
export function Footer() {
  return (
    <footer
      className="on-ink px-4 pb-28 pt-8 md:px-8 md:pb-10"
      style={{ borderTop: "1px solid var(--rule)" }}
    >
      <div className="mx-auto flex max-w-[80rem] flex-wrap items-center justify-between gap-x-8 gap-y-4">
        <MashCredit />
        <a href="#top" className="tag" style={{ color: "var(--fg-mute)" }}>
          Til toppen
        </a>
      </div>
    </footer>
  );
}

import { Logo } from "@/components/Logo";
import { LINKS } from "@/lib/links";

export function Footer() {
  return (
    <footer
      className="hairline-t flex flex-col gap-6 px-4 pb-28 pt-12 md:flex-row md:items-end md:justify-between md:px-8 md:pb-12"
    >
      <Logo height={40} />
      <p className="label" style={{ color: "var(--fg-mute)" }}>
        Storgata 61, 2609 Lillehammer ·{" "}
        <a href={LINKS.phone} style={{ color: "var(--fg)" }}>
          {LINKS.phoneLabel}
        </a>
      </p>
    </footer>
  );
}

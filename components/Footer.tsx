import { Logo } from "@/components/Logo";
import { LINKS } from "@/lib/links";

/** The only other place the mark appears. In the nav it is set in type. */
export function Footer() {
  return (
    <footer
      className="on-ink flex flex-col gap-6 px-4 pb-28 pt-12 md:flex-row md:items-end md:justify-between md:px-8 md:pb-14"
      style={{ borderTop: "1px solid var(--rule)" }}
    >
      <Logo height={44} />
      <p className="tag" style={{ color: "var(--fg-mute)" }}>
        Storgata 61, 2609 Lillehammer ·{" "}
        <a href={LINKS.phone} style={{ color: "var(--fg-strong)" }}>
          {LINKS.phoneLabel}
        </a>
      </p>
    </footer>
  );
}

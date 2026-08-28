/**
 * Agency credit. mashpartners.no blocks automated fetching, so this is a plain
 * text byline rather than their official embed. If there is a supplied snippet
 * or wordmark, swap it in here and nothing else changes.
 */
export function MashCredit() {
  return (
    <a
      href="https://mashpartners.no"
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-baseline gap-2"
    >
      <span className="tag" style={{ color: "var(--fg-mute)" }}>
        Nettsted av
      </span>
      <span
        className="sign text-base transition-colors"
        style={{ color: "var(--fg-mute)" }}
      >
        <span className="group-hover:text-[var(--fg-strong)] group-focus-visible:text-[var(--fg-strong)]">
          Mash Partners
        </span>
      </span>
    </a>
  );
}

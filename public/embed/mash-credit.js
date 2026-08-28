/*!
 * <mash-credit> — universal "made by mashpartners.no" credit badge.
 *
 * A self-contained Web Component (Shadow DOM, zero dependencies) you can drop
 * into ANY website Mash Partners builds, in any stack, on any theme.
 *
 *   <script src="https://mashpartners.no/embed/mash-credit.js" defer></script>
 *   <mash-credit></mash-credit>
 *
 * Theme-agnostic: all colour is `currentColor`, so the badge inherits the host
 * site's text colour and its hairlines adapt to light/dark/coloured backgrounds
 * automatically. The brand inks (coral + cobalt) only surface on hover.
 *
 * Attributes (all optional):
 *   href      link target              (default https://mashpartners.no)
 *   lang      label language en|nb|fr|de|es|sv|da|nl  (default en)
 *   label     override the lead label  (e.g. "Crafted by")
 *   services  middle tagline           (default "Digitalisation · AI · Automation")
 *   location  location line            (default "Norway")
 *   org       org number               (default "ORG 934 568 219")
 *   variant   bar | minimal            (default bar)
 *   theme     auto | light | dark      (default auto — inherits currentColor)
 *   accent    "coral,cobalt" hexes for the hover bloom (default brand inks)
 *
 * CSS hooks (set on the element or an ancestor):
 *   --mash-fg, --mash-accent-a, --mash-accent-b, --mash-radius, --mash-size
 */
(function () {
  if (typeof window === 'undefined' || window.customElements?.get('mash-credit')) return;

  var LABELS = {
    en: 'Made by',
    nb: 'Laget av',
    fr: 'Site réalisé par',
    de: 'Erstellt von',
    es: 'Hecho por',
    sv: 'Skapad av',
    da: 'Lavet af',
    nl: 'Gemaakt door',
  };

  var DEFAULTS = {
    href: 'https://mashpartners.no',
    services: 'Digitalisation · AI · Automation',
    location: 'Norway',
    org: 'ORG 934 568 219',
    accentA: '#EE4B29', // coral
    accentB: '#2A37C4', // cobalt
  };

  var EASE = 'cubic-bezier(0.7, 0, 0.3, 1)';

  function css() {
    return (
      ':host{' +
      'display:block;color:inherit;' +
      '--_fg:var(--mash-fg, currentColor);' +
      '--_a:var(--mash-accent-a, ' + DEFAULTS.accentA + ');' +
      '--_b:var(--mash-accent-b, ' + DEFAULTS.accentB + ');' +
      '--_r:var(--mash-radius, 0px);' +
      '--_hair:color-mix(in srgb, currentColor 16%, transparent);' +
      '--_hair-strong:color-mix(in srgb, currentColor 30%, transparent);' +
      '--_mute:color-mix(in srgb, currentColor 60%, transparent);' +
      '--_faint:color-mix(in srgb, currentColor 42%, transparent);' +
      // no container movement — the entrance is the mark stamping + the
      // wordmark writing itself, not a fade-rise of the whole badge.
      '}' +
      ':host([theme="dark"]){color:#f4f1ea;}' +
      ':host([theme="light"]){color:#16151a;}' +

      /* the clickable strip */
      '.strip{' +
      'all:unset;box-sizing:border-box;cursor:pointer;' +
      'display:flex;align-items:center;gap:clamp(14px,2.4vw,26px);' +
      'width:100%;padding:clamp(14px,1.6vw,20px) clamp(16px,2vw,24px);' +
      'border:1px solid var(--_hair);border-radius:var(--_r);' +
      'color:var(--_fg);text-decoration:none;' +
      'font-family:inherit;line-height:1.2;' +
      'transition:border-color .45s ' + EASE + ', transform .45s ' + EASE + ', background-color .45s ' + EASE + ';' +
      '}' +
      '.strip:focus-visible{outline:2px solid var(--_a);outline-offset:3px;}' +
      '.strip:hover{border-color:var(--_hair-strong);background-color:color-mix(in srgb, currentColor 4%, transparent);}' +
      ':host([variant="minimal"]) .strip{border:0;padding:6px 2px;gap:12px;background:none;}' +

      /* mark — two overlapping ink discs (mono → coral/cobalt on hover) */
      '.mark{flex:0 0 auto;width:var(--mash-size,40px);height:var(--mash-size,40px);' +
      'display:grid;place-items:center;border:1px solid var(--_hair);border-radius:calc(var(--_r) + 1px);}' +
      ':host([variant="minimal"]) .mark{width:26px;height:26px;border:0;}' +
      '.mark svg{width:62%;height:62%;overflow:visible;display:block;}' +
      ':host([variant="minimal"]) .mark svg{width:100%;height:100%;}' +
      /* disc layer — colour + a living pointer-parallax (the two inks lean in
         opposite directions as the cursor crosses the badge). transform-box so
         transforms are local to each circle. */
      '.disc{transform-box:fill-box;transform-origin:center;' +
      'transition:fill .55s ' + EASE + ', fill-opacity .55s ' + EASE + ', transform .35s cubic-bezier(0.25, 1, 0.5, 1);}' +
      '.disc.a{fill:var(--_fg);fill-opacity:.9;transform:translate(calc(var(--mx,0px) * -1), calc(var(--my,0px) * -1));}' +
      '.disc.b{fill:var(--_fg);fill-opacity:.45;transform:translate(var(--mx,0px), var(--my,0px));}' +
      /* hover: the mono mash separates into Mash\'s two brand inks */
      '.strip:hover .disc.a{fill:var(--_a);fill-opacity:.95;}' +
      '.strip:hover .disc.b{fill:var(--_b);fill-opacity:.85;}' +
      /* entrance layer (group) — the two plates arrive mis-registered and SNAP
         into register (a back-out ease = the "click"), staggered. The mash. */
      '.reg{transform-box:fill-box;transform-origin:center;opacity:0;}' +
      '.ra{transform:translate(-7px,-5px) scale(.5);transition:transform .72s cubic-bezier(0.34, 1.4, 0.5, 1), opacity .5s ' + EASE + ';}' +
      '.rb{transform:translate(7px,5px) scale(.5);transition:transform .72s cubic-bezier(0.34, 1.4, 0.5, 1), opacity .5s ' + EASE + ';}' +
      ':host([data-in]) .ra{transform:none;opacity:1;transition-delay:.14s;}' +
      ':host([data-in]) .rb{transform:none;opacity:1;transition-delay:.26s;}' +

      /* identity block */
      '.id{display:flex;flex-direction:column;gap:3px;min-width:0;}' +
      '.eyebrow{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:var(--_mute);' +
      'font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:nowrap;}' +
      '.wordmark{position:relative;display:inline-block;width:max-content;max-width:100%;' +
      'font-size:clamp(15px,1.5vw,17px);font-weight:600;letter-spacing:-.01em;}' +
      /* each letter inks in behind the nib — a clip wipe, staggered by index */
      '.wm-l{display:inline-block;white-space:pre;--d:calc(var(--i) * 0.052s + 0.3s);' +
      'opacity:1;clip-path:inset(-14% -8% -16% -8%);' +
      'transition:opacity .16s linear var(--d), clip-path .34s cubic-bezier(0.7, 0, 0.3, 1) var(--d);}' +
      ':host(:not([data-in])) .wm-l{opacity:0;clip-path:inset(-14% 112% -16% -8%);}' +
      /* pen-nib — a coral stroke that travels the wordmark, writing it */
      '.nib{position:absolute;left:0;top:4%;bottom:8%;width:2px;border-radius:2px;background:var(--_a);' +
      'opacity:0;transform:translateX(0);pointer-events:none;}' +
      ':host([data-in]) .nib{animation:mc-write var(--wt,1.2s) cubic-bezier(0.7, 0, 0.3, 1) .28s both;}' +
      '@keyframes mc-write{0%{opacity:0;transform:translateX(0)}' +
      '12%{opacity:1}84%{opacity:1;transform:translateX(var(--ww,90px))}' +
      '100%{opacity:0;transform:translateX(var(--ww,90px))}}' +
      /* hover underline (kept) */
      '.wordmark::after{content:"";position:absolute;left:0;right:0;bottom:-2px;height:1.5px;background:var(--_a);' +
      'transform:scaleX(0);transform-origin:left;transition:transform .4s ' + EASE + ';}' +
      '.strip:hover .wordmark::after{transform:scaleX(1);}' +

      /* divider */
      '.rule{flex:0 0 auto;width:1px;align-self:stretch;background:var(--_hair);margin:2px 0;}' +
      ':host([variant="minimal"]) .rule{display:none;}' +

      /* meta */
      '.meta{display:flex;flex-direction:column;gap:4px;min-width:0;margin-left:auto;text-align:right;}' +
      ':host([variant="minimal"]) .meta{display:none;}' +
      '.services{font-size:13px;color:var(--_fg);opacity:.82;white-space:nowrap;}' +
      '.where{font-size:11px;letter-spacing:.12em;color:var(--_faint);' +
      'font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:nowrap;}' +

      /* arrow */
      '.arrow{flex:0 0 auto;display:grid;place-items:center;width:30px;height:30px;color:var(--_mute);' +
      'transition:color .4s ' + EASE + ', transform .45s ' + EASE + ';}' +
      ':host([variant="minimal"]) .arrow{width:auto;height:auto;margin-left:0;}' +
      '.arrow svg{width:18px;height:18px;}' +
      '.strip:hover .arrow{color:var(--_fg);transform:translateX(4px);}' +

      /* responsive: collapse the meta under the id on narrow hosts */
      '@media (max-width:560px){' +
      '.strip{flex-wrap:wrap;gap:14px;}' +
      '.rule{display:none;}' +
      '.meta{margin-left:0;text-align:left;flex-basis:100%;order:3;}' +
      '.arrow{order:2;margin-left:auto;}' +
      '}' +

      '@media (prefers-reduced-motion: reduce){' +
      ':host{opacity:1;transform:none;transition:none;}' +
      '.reg{opacity:1;transform:none;transition:none;}' +
      '.disc{opacity:1;transform:none;transition:fill .3s linear, fill-opacity .3s linear;}' +
      '.wm-l, :host(:not([data-in])) .wm-l{opacity:1;clip-path:none;transition:none;}' +
      '.nib{display:none;}' +
      '.strip,.arrow,.wordmark::after{transition:none;}' +
      '}'
    );
  }

  function markSVG() {
    // two overlapping ink discs in a 40-box — the "mash".
    // Wrap each in a <g> so the entrance (mis-register → snap) lives on the
    // group while parallax/hover lives on the disc — two transform layers, no
    // clobbering.
    return (
      '<svg viewBox="0 0 40 40" aria-hidden="true">' +
      '<g class="reg ra"><circle class="disc a" cx="16" cy="17" r="11"/></g>' +
      '<g class="reg rb"><circle class="disc b" cx="24" cy="23" r="10.5"/></g>' +
      '</svg>'
    );
  }

  function arrowSVG() {
    return (
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
      '<path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round"/></svg>'
    );
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  // Split a word into per-letter spans (each carries its index for the
  // staggered "writing" reveal). Decorative — the link's aria-label conveys
  // the text, so the spans are aria-hidden by the wordmark wrapper.
  function letters(text) {
    return String(text)
      .split('')
      .map(function (ch, i) {
        return '<span class="wm-l" style="--i:' + i + '">' + (ch === ' ' ? '&nbsp;' : esc(ch)) + '</span>';
      })
      .join('');
  }

  // Allow only colour-ish tokens for the author-supplied accent, since it is
  // written into a style attribute. (#hex, rgb()/hsl(), or a CSS colour name.)
  function safeColor(v) {
    v = String(v).trim();
    return /^#[0-9a-f]{3,8}$/i.test(v) || /^(rgb|hsl)a?\([0-9 .,%/]+\)$/i.test(v) || /^[a-z]{3,20}$/i.test(v)
      ? v
      : '';
  }

  class MashCredit extends HTMLElement {
    static get observedAttributes() {
      return ['href', 'lang', 'label', 'services', 'location', 'org', 'variant', 'theme', 'accent'];
    }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._io = null;
      this._parallax = null;
    }

    attr(name, fallback) {
      const v = this.getAttribute(name);
      // Only an ABSENT attribute uses the default -- an explicit empty string
      // (e.g. services="") is a deliberate "omit this line" and must pass
      // through, not silently revert to the branded default text.
      return v === null ? fallback : v;
    }

    connectedCallback() {
      this.render();
      this.observe();
    }

    disconnectedCallback() {
      if (this._io) this._io.disconnect();
      if (this._parallax) this._parallax();
    }

    attributeChangedCallback() {
      if (this.shadowRoot && this.shadowRoot.childElementCount) this.render();
    }

    observe() {
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduce || !('IntersectionObserver' in window)) {
        this.setAttribute('data-in', '');
        return;
      }
      this._io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              this.setAttribute('data-in', '');
              this._io.disconnect();
            }
          });
        },
        { threshold: 0.35 }
      );
      this._io.observe(this);
    }

    render() {
      const lang = (this.attr('lang', '') || '').slice(0, 2).toLowerCase();
      const label = this.attr('label', LABELS[lang] || LABELS.en);
      const href = this.attr('href', DEFAULTS.href);
      const services = this.attr('services', DEFAULTS.services);
      const location = this.attr('location', DEFAULTS.location);
      const org = this.attr('org', DEFAULTS.org);
      const accent = this.attr('accent', '');
      let accentStyle = '';
      if (accent) {
        const parts = accent.split(',');
        const a = safeColor(parts[0] || '');
        const b = safeColor(parts[1] || '');
        if (a) accentStyle += '--mash-accent-a:' + a + ';';
        if (b) accentStyle += '--mash-accent-b:' + b + ';';
      }

      this.shadowRoot.innerHTML =
        '<style>' + css() + '</style>' +
        '<a class="strip" part="strip" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer" ' +
        (accentStyle ? 'style="' + accentStyle + '" ' : '') +
        'aria-label="' + esc(label) + ' Mash Partners · mashpartners.no (opens in a new tab)">' +
        '<span class="mark" aria-hidden="true">' + markSVG() + '</span>' +
        '<span class="id">' +
        '<span class="eyebrow">' + esc(label) + '</span>' +
        '<span class="wordmark" aria-hidden="true"><span class="nib"></span>' + letters('mashpartners.no') + '</span>' +
        '</span>' +
        '<span class="rule" aria-hidden="true"></span>' +
        '<span class="meta">' +
        (services ? '<span class="services">' + esc(services) + '</span>' : '') +
        ((location || org)
          ? '<span class="where">' + esc([location, org].filter(Boolean).join(' · ')) + '</span>'
          : '') +
        '</span>' +
        '<span class="arrow" aria-hidden="true">' + arrowSVG() + '</span>' +
        '</a>';

      this.bindParallax();
      this.measureWrite();
    }

    // Measure the wordmark so the pen-nib travels its exact width, and scale
    // the write duration to the letter count.
    measureWrite() {
      const root = this.shadowRoot;
      requestAnimationFrame(() => {
        const wm = root.querySelector('.wordmark');
        if (!wm) return;
        const w = Math.round(wm.getBoundingClientRect().width);
        const n = wm.querySelectorAll('.wm-l').length || 1;
        if (w) this.style.setProperty('--ww', w + 'px');
        this.style.setProperty('--wt', (n * 0.052 + 0.55).toFixed(2) + 's');
      });
    }

    // Living mash: the two inks lean in opposite directions toward the cursor.
    // Pointer-only, reduced-motion-off, rAF-throttled, fully torn down on
    // re-render / disconnect. Writes two CSS vars the disc transforms read.
    bindParallax() {
      if (this._parallax) this._parallax();
      this._parallax = null;
      const fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!fine || reduce) return;
      const strip = this.shadowRoot.querySelector('.strip');
      if (!strip) return;
      const host = this;
      const MAX = 3; // px of lean
      let raf = 0, tx = 0, ty = 0;
      const apply = () => {
        raf = 0;
        host.style.setProperty('--mx', tx.toFixed(2) + 'px');
        host.style.setProperty('--my', ty.toFixed(2) + 'px');
      };
      const onMove = (e) => {
        const r = strip.getBoundingClientRect();
        const nx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
        const ny = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
        tx = nx * MAX;
        ty = ny * MAX;
        if (!raf) raf = requestAnimationFrame(apply);
      };
      const onLeave = () => {
        tx = 0; ty = 0;
        if (!raf) raf = requestAnimationFrame(apply);
      };
      strip.addEventListener('pointermove', onMove);
      strip.addEventListener('pointerleave', onLeave);
      this._parallax = () => {
        strip.removeEventListener('pointermove', onMove);
        strip.removeEventListener('pointerleave', onLeave);
        if (raf) cancelAnimationFrame(raf);
        host.style.removeProperty('--mx');
        host.style.removeProperty('--my');
      };
    }
  }

  customElements.define('mash-credit', MashCredit);
})();

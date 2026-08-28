/**
 * GitHub Pages serves a project repository from /<repo>/ unless a custom
 * domain is attached. Next rewrites the paths it controls (its own chunks,
 * next/link hrefs) from `basePath`, but not raw `<img src>`, inline
 * `background-image`, or plain `<a href>`, which is most of what this site
 * uses. Everything pointing at /public or at an internal route goes through
 * here instead.
 *
 * Empty in the normal build, so a custom domain needs no configuration.
 */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const asset = (path: string) => `${BASE}${path}`;

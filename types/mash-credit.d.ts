import type { DetailedHTMLProps, HTMLAttributes } from "react";

/**
 * <mash-credit> is a custom element defined by public/embed/mash-credit.js.
 * TSX has no way to know its attributes, so they are declared here.
 */
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "mash-credit": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        href?: string;
        label?: string;
        services?: string;
        location?: string;
        org?: string;
        variant?: "bar" | "minimal";
        theme?: "auto" | "light" | "dark";
        accent?: string;
      };
    }
  }
}

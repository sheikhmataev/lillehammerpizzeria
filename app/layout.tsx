import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Vollkorn } from "next/font/google";
import { HeatProvider } from "@/components/HeatProvider";
import { HEAT_BOOT } from "@/components/heat-boot";
import { BASE } from "@/lib/asset";
import { FastPath } from "@/components/FastPath";
import "./globals.css";

/* Bricolage carries anything that behaves like signage. A vernacular grotesque
   with width and optical-size axes, drawn with deliberate irregularities, which
   suits a 23-year-old family grill house better than a neutral corporate sans. */
const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth", "opsz"],
  variable: "--font-bricolage",
  display: "swap",
});

/* Vollkorn ("wholemeal") carries everything anyone actually reads. Sturdy and
   warm, and closer to the serif on the restaurant's own printed menu than any
   sans would be. */
const vollkorn = Vollkorn({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-vollkorn",
  display: "swap",
});

const SITE = "https://www.lillehammerpizzeria.no";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Lillehammer Restaurant & Bar",
    template: "%s · Lillehammer Restaurant & Bar",
  },
  description:
    "Tyrkisk hjemmelaget, pizza fra ovnen og bar til stengetid. Storgata 61, inngang fra bakgården. Åpent fra kl. 15.",
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "Lillehammer Restaurant & Bar",
    url: SITE,
  },
};

export const viewport: Viewport = {
  themeColor: "#231f20",
};

/* Local search is the single highest-value thing on a restaurant site.
   It is emitted statically so it survives the `output: export` build. */
const RESTAURANT_LD = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Lillehammer Restaurant & Bar",
  alternateName: "Lillehammer Pizzeria",
  url: SITE,
  telephone: "+4761259060",
  servesCuisine: ["Turkish", "Pizza", "Italian"],
  priceRange: "$$",
  foundingDate: "2003",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Storgata 61",
    postalCode: "2609",
    addressLocality: "Lillehammer",
    addressCountry: "NO",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "15:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "15:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "13:00",
      closes: "22:00",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="no"
      data-heat="warm"
      className={`${bricolage.variable} ${vollkorn.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAT_BOOT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(RESTAURANT_LD) }}
        />
        {/* The only asset URLs that live in CSS. Emitted only when the site is
            served from a sub-path, which is the GitHub Pages project case. */}
        {BASE ? (
          <style
            dangerouslySetInnerHTML={{
              __html: `:root{--flame-1:url("${BASE}/motifs/flame-1.svg");--flame-2:url("${BASE}/motifs/flame-2.svg");--flame-3:url("${BASE}/motifs/flame-3.svg")}`,
            }}
          />
        ) : null}
      </head>
      <body className="antialiased">
        <HeatProvider>
          {children}
          <FastPath />
        </HeatProvider>
      </body>
    </html>
  );
}

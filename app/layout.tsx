import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, Martian_Mono } from "next/font/google";
import { HeatProvider } from "@/components/HeatProvider";
import { HEAT_BOOT } from "@/components/heat-boot";
import { FastPath } from "@/components/FastPath";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument",
  display: "swap",
});

const martian = Martian_Mono({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-martian",
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
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#080808" },
    { media: "(prefers-color-scheme: light)", color: "#080808" },
  ],
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
      className={`${archivo.variable} ${instrument.variable} ${martian.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAT_BOOT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(RESTAURANT_LD) }}
        />
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

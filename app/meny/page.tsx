import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Menu } from "@/components/Menu";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Meny",
  description:
    "Hele menyen: pizza, tyrkiske retter, grill, burgere, pasta, fisk, vegetar og dessert. 108 retter med priser og allergener.",
};

export default function MenuPage() {
  return (
    <>
      <Nav pinned />
      <main>
        <Menu />
      </main>
      <Footer />
    </>
  );
}

import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Favorites } from "@/components/Favorites";
import { PhotoRail } from "@/components/PhotoRail";
import { Room } from "@/components/Room";
import { Discounts } from "@/components/Discounts";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Favorites />
        <PhotoRail />
        <Room />
        <Discounts />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

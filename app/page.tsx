import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Favorites } from "@/components/Favorites";
import { Pass } from "@/components/Pass";
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
        <Pass />
        <Room />
        <Discounts />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

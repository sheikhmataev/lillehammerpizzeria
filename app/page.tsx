import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Rating } from "@/components/Rating";
import { Stack } from "@/components/Stack";
import { Menu } from "@/components/Menu";
import { Discounts } from "@/components/Discounts";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Rating />
        <Stack />
        <Menu />
        <Discounts />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

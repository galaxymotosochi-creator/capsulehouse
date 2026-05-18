import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Catalog } from "@/components/catalog";
import { Advantages } from "@/components/advantages";
import { Process } from "@/components/process";
import { Gallery } from "@/components/gallery";
import { PartnerCTA } from "@/components/partner-cta";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Catalog />
        <Advantages />
        <Process />
        <Gallery />
        <PartnerCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

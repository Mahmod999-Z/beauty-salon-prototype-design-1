import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { Hours } from "@/components/hours";
import { Nav } from "@/components/nav";
import { PitchMode } from "@/components/pitch-mode";
import { Reviews } from "@/components/reviews";
import { Services } from "@/components/services";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="inhoud">
        <Hero />
        <Services />
        <About />
        <Reviews />
        <Gallery />
        <Hours />
        <Contact />
      </main>
      <Footer />
      <PitchMode />
    </>
  );
}

import Container from "@/components/Container";
import FeaturesSection from "@/components/features/Features";
import Footer from "@/components/footer";
import HeroSection from "@/components/heroSection";
import NavBar from "@/components/navbar/NavBar";
import PricingSection from "@/components/pricing";
import Questions from "@/components/questions";
import Testimonials from "@/components/Testimonials";

import Image from "next/image";

export default function Home() {
  return (
    <>
      <NavBar />
      <div className="-z-10 fixed inset-0">
        <Image
          src="/images/medium-grids.png"
          alt="cover"
          fill
          className="object-cover"
        />
      </div>
      <Container>
        {/* heroSection */}
        <HeroSection />

        {/* features */}
        <FeaturesSection />

        {/* Testimonials */}
        <Testimonials />

        {/* pricing */}
        <PricingSection />

        {/* questions */}
        <Questions />

        {/* footer */}
        <Footer />
      </Container>
    </>
  );
}

import Footer from "@/components/footer";
import NavBar from "@/components/navbar/NavBar";
import Image from "next/image";
import React from "react";
import AboutHero from "./about-hero";
import Mission from "./mission";
import CoreValues from "./values";

const CareersPage = () => {
  return (
    <>
      <NavBar />
      <div className="fixed inset-0 -z-20">
        <Image
          src="/images/medium-grids.png"
          alt="cover"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="my-24 relative">
        <AboutHero />
        <Mission />
        <CoreValues />
      </div>
      <Footer />{" "}
    </>
  );
};

export default CareersPage;

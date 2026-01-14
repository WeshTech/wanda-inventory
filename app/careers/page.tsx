import Footer from "@/components/footer";
import NavBar from "@/components/navbar/NavBar";
import Image from "next/image";
import React from "react";
import { CareersHero } from "./careers-hero";
import CareersWhy from "./careers-why";
import { CareersOpenPositions } from "./open-positions";

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
        <CareersHero />
        <CareersWhy />
        <CareersOpenPositions />
      </div>
      <Footer />{" "}
    </>
  );
};

export default CareersPage;

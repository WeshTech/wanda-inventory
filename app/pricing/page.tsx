import Footer from "@/components/footer";
import NavBar from "@/components/navbar/NavBar";
import Image from "next/image";
import React from "react";
import { PricingCards } from "./pricing-cards";
import { PlanComparison } from "./plan-comparison";
import Container from "@/components/Container";

const PricingPage = () => {
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
        {" "}
        <PricingCards />
        <Container>
          <PlanComparison />
        </Container>
      </div>
      <Footer />{" "}
    </>
  );
};

export default PricingPage;

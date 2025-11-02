"use client";

import Image from "next/image";
import Container from "../Container";
import { Features } from "@/constants/features";

const FeaturesSection = () => {
  return (
    <section id="features" className="py-4 mt-4 w-full bg-transparent">
      <Container>
        <div className="max-w-full mx-auto lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 lg:mb-14">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
              Unlock seamless inventory management with{" "}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-blue-600 to-lime-500 bg-clip-text text-transparent">
                Wanda Inventory
              </span>{" "}
              powerful features
            </h3>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover advanced tools for tracking, producing, and optimizing
              your business operations — making inventory management easier and
              more efficient.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Features.map((feature) => (
              <div
                key={feature.id}
                className="group bg-gradient-to-br from-blue-50/70 to-lime-50/70 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center text-center border border-gray-100 hover:border-transparent hover:scale-[1.02] cursor-default"
              >
                {/* Image */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-4 sm:mb-5 overflow-hidden rounded-xl shadow-md">
                  <Image
                    src={feature.imageUrl}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>

                {/* Title */}
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h4>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Line */}
                <div className="mt-5 h-1 w-12 bg-gradient-to-r from-blue-600 to-lime-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FeaturesSection;

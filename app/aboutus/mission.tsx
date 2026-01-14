"use client";

import Image from "next/image";
import { Check } from "lucide-react";

export default function Mission() {
  const missionPoints = [
    "Empowering businesses with real-time inventory insights",
    "Streamlining operations for efficiency and accuracy",
    "Providing scalable cloud-based solutions",
    "Enabling smarter, data-driven decision-making",
  ];

  const visionPoints = [
    "Delivering reliable cloud-based inventory solutions",
    "Enabling seamless integration across systems",
    "Providing actionable insights for smarter decisions",
  ];

  const historyPoints = [
    "Founded to streamline inventory management for small businesses",
    "Expanded to serve mid-sized and enterprise clients",
    "Launched Wanda Cloud for remote, real-time inventory tracking",
    "Continued innovation with AI-driven analytics and insights",
    "Built a strong community of over 200 business clients",
  ];

  return (
    <div className="w-full bg-background py-12 px-4 sm:px-6 lg:px-12">
      {/* Our Mission Section */}
      <section className="max-w-7xl mx-auto mb-12 sm:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Our Mission
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              To provide businesses with reliable, cloud-based inventory
              management services that simplify operations, improve accuracy,
              and enable data-driven decisions. We strive to empower teams to
              track products, manage stores, and optimize workflows efficiently,
              helping businesses grow confidently while maintaining full control
              over their inventory.
            </p>

            {/* Mission Points */}
            <div className="space-y-2 sm:space-y-3">
              {missionPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <Check
                    size={20}
                    className="flex-shrink-0 mt-0.5 sm:mt-1"
                    style={{ color: "oklch(76.8% 0.233 130.85)" }}
                  />
                  <span className="text-foreground font-medium text-sm sm:text-base">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="flex flex-col gap-3 sm:gap-4 justify-start">
            <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/server2.jpg"
                alt="Inventory management illustration"
                fill
                className="object-cover"
              />
              {/* Accent Corner */}
              <div
                className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 rounded-bl-3xl"
                style={{ backgroundColor: "oklch(76.8% 0.233 130.85)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-7xl mx-auto my-6 sm:my-8 border-t border-border" />

      {/* Our Vision Section */}
      <section className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left Image */}
          <div className="order-2 lg:order-1 flex flex-col gap-3 sm:gap-4 justify-start">
            <div className="relative w-full h-64 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/server1.jpg"
                alt="Inventory team working"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
              Our Vision
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
              At Wanda Inventory, our vision is to transform the way businesses
              manage inventory by combining cloud innovation, simplicity, and
              reliability. We provide tools and insights that empower companies
              to optimize workflows, make data-driven decisions, and scale
              operations with confidence.
            </p>

            {/* Vision Points */}
            <div className="space-y-2 sm:space-y-3">
              {visionPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  <Check
                    size={20}
                    className="flex-shrink-0 mt-0.5 sm:mt-1"
                    style={{ color: "oklch(76.8% 0.233 130.85)" }}
                  />
                  <span className="text-foreground font-medium text-sm sm:text-base">
                    {point}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto my-6 sm:my-8 border-t border-border" />

      <div className="w-full bg-background py-12 px-4 sm:px-6 lg:px-12">
        <section className="max-w-7xl mx-auto mb-2">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">
            {/* Left Content */}
            <div className="flex flex-col justify-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 sm:mb-6">
                Our History
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                Since its founding, Wanda Inventory has been dedicated to
                simplifying and modernizing inventory management for businesses
                of all sizes. From our first deployment to our latest cloud
                innovations, we have continuously evolved to meet the needs of
                growing enterprises, delivering reliable, scalable, and
                user-friendly solutions.
              </p>

              {/* Mission Points */}
              <div className="space-y-2 sm:space-y-3">
                {historyPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-2 sm:gap-3">
                    <Check
                      size={20}
                      className="flex-shrink-0 mt-0.5 sm:mt-1"
                      style={{ color: "oklch(76.8% 0.233 130.85)" }}
                    />
                    <span className="text-foreground font-medium text-sm sm:text-base">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="flex flex-col gap-3 sm:gap-4 justify-start">
              <div className="relative w-full h-64 sm:h-72 md:h-[450px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/server3.jpg"
                  alt="Inventory management illustration"
                  fill
                  className="object-cover"
                />
                {/* Accent Corner */}
                <div
                  className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 rounded-bl-3xl"
                  style={{ backgroundColor: "oklch(76.8% 0.233 130.85)" }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

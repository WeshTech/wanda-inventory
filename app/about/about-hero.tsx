"use client";

import Image from "next/image";

export default function AboutHero() {
  const stats = [
    { number: "200+", label: "Business Clients" },
    { number: "100+", label: "Customized Solutions" },
    { number: "50+", label: "Team Members" },
    { number: "1", label: "Winning Award" },
  ];

  return (
    <section className="w-full bg-white">
      {/* About Us Title */}
      <h1 className="text-center text-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl mt-6 font-semibold">
        About Us
      </h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start mb-10 lg:mb-12">
          {/* Left Text */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 leading-snug">
              Crafting Excellence <br />{" "}
              <span className="text-secondary">Together</span>
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
              At Wanda Inventory, we empower businesses to manage their
              operations efficiently and accurately. With a platform built for
              simplicity and scalability, we help teams track products, manage
              stores, and streamline inventory processes. Together, we enable
              businesses to operate smarter and grow confidently.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative w-full flex justify-center lg:justify-end">
            <div className="relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden">
              <Image
                src="/images/careers1.jpg"
                alt="Team collaboration"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Decorative Circle */}
            <div className="absolute -bottom-3 -left-3 w-20 h-20 sm:w-24 sm:h-24 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center shadow-md">
              <div className="absolute inset-1 sm:inset-2 border-2 border-orange-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Extended Description */}
        <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-12">
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            At Wanda Inventory, we are committed to transforming the way
            businesses manage their inventory with innovative, reliable, and
            cost-effective solutions. With a proven track record of helping
            businesses stay organized and efficient, we combine cutting-edge
            technology,{" "}
            <span className="text-gray-500">
              skilled expertise, and customer-centric approaches
            </span>{" "}
            to bring visions to life.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">
                {stat.number}
              </div>
              <p className="text-gray-600 text-sm sm:text-base">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

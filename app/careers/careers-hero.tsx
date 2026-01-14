"use client";

import Image from "next/image";

export function CareersHero() {
  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="relative mb-6">
          {/* Decorative Icons */}
          <div className="absolute top-0 left-0 w-20 h-20 rounded-2xl border-2 border-orange-300/40 flex items-center justify-center opacity-60 -translate-y-8 -translate-x-8">
            <div className="w-12 h-12 rounded-lg border-2 border-orange-300/60" />
          </div>

          <div className="absolute top-0 right-0 w-20 h-20 rounded-2xl border-2 border-secondary/40 flex items-center justify-center opacity-60 -translate-y-8 translate-x-8">
            <div className="w-12 h-12 rounded-lg border-2 border-secondary/60" />
          </div>

          {/* Main Heading */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
              Build Your Career with Us
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover exciting opportunities and grow your career in a thriving
              environment.
            </p>
          </div>
        </div>

        {/* Image Row Section */}
        <div className="mb-4 sm:mb-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
            <div className="flex flex-col gap-2">
              <div className="lg:col-span-1 flex flex-col justify-start">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl font-bold text-secondary">
                      99
                    </span>
                  </div>
                  <div className="pt-1">
                    <p className="text-lg text-foreground leading-relaxed">
                      At Wanda, we merge creativity with strategy to craft
                      digital experiences that captivate and perform.
                    </p>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden h-56 lg:h-64">
                <Image
                  src="/images/careers2.jpg"
                  alt="Creative workspace"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>

            {/* MIDDLE LEFT — tall */}
            <div className="relative rounded-3xl overflow-hidden h-80 lg:h-[420px]">
              <Image
                src="/images/careers1.jpg"
                alt="Team collaborating in modern office"
                fill
                className="object-cover"
              />
            </div>

            {/* MIDDLE RIGHT — tall */}
            <div className="relative rounded-3xl overflow-hidden h-80 lg:h-[420px]">
              <Image
                src="/images/careers3.jpg"
                alt="Modern office with plants"
                fill
                className="object-cover"
              />
            </div>

            {/* RIGHT IMAGE — short */}
            <div className="relative rounded-3xl overflow-hidden h-56 lg:h-80">
              <Image
                src="/images/careers5.jpg"
                alt="Professional woman working"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

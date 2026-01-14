import Image from "next/image";

export default function CareersWhy() {
  return (
    <section className="min-h-screen bg-background px-6 py-2 sm:py-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <p className="text-chart-1 font-semibold text-sm mb-1">
                WHY JOIN US
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-4">
                Experience a workplace that values your{" "}
                <span className="text-secondary">
                  growth, creativity, and well-being.
                </span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Experience a fulfilling career with growth, flexibility, and a
                supportive team culture.
              </p>
            </div>

            {/* Main Card - Advance Quickly */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="grid grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    Advance quickly with clear growth opportunities.
                  </h3>
                  <p className="text-muted-foreground">
                    Accelerate your career growth with well-defined paths to
                    leadership and abundant opportunities for advancement.
                  </p>
                </div>
                <div className="relative h-64 w-full">
                  <Image
                    src="/images/careers4.jpg"
                    alt="Professional working at laptop with plants"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-2 gap-6">
              {/* Supportive Team Culture */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">
                  Supportive Team Culture
                </h3>
                <p className="text-muted-foreground text-sm">
                  Collaborate with a talented, diverse team in a supportive and
                  inclusive environment that fosters creativity and growth.
                </p>
              </div>

              {/* Exciting Projects */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3">Exciting Projects</h3>
                <p className="text-muted-foreground text-sm">
                  Work on cutting-edge projects that challenge you to innovate
                  and grow your skills in a dynamic environment.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Flexible Work Environment */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="mb-6">
                <div className="relative h-48 w-full mb-6">
                  <Image
                    src="/images/careers1.jpg"
                    alt="Flexible work environment illustration"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3">
                Flexible Work Environment
              </h3>
              <p className="text-muted-foreground">
                Enjoy a healthy work-life balance with options for remote work
                and flexible hours.
              </p>
            </div>

            {/* Comprehensive Benefits */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="grid grid-cols-2 gap-6 items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-3">
                    Comprehensive Benefits Package
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Receive competitive compensation, comprehensive health
                    coverage, and a range of valuable perks designed to support
                    your well-being and success.
                  </p>
                </div>
                <div className="relative h-48 w-full">
                  <Image
                    src="/images/careers6.jpg"
                    alt="Professional working in modern office"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

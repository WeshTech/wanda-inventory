"use client";

import {
  Users,
  Eye,
  Lightbulb,
  Cpu,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

export default function CoreValues() {
  const values = [
    {
      title: "Collaboration",
      description:
        "We foster teamwork across all departments, enabling seamless communication and coordinated efforts for maximum efficiency.",
      icon: <Users size={40} className="text-primary" />,
    },
    {
      title: "Transparency",
      description:
        "Open and honest communication is at the core of everything we do, ensuring trust with our clients and within our team.",
      icon: <Eye size={40} className="text-primary" />,
    },
    {
      title: "Creativity",
      description:
        "We embrace innovative thinking to solve challenges and create unique solutions for our clients’ inventory needs.",
      icon: <Lightbulb size={40} className="text-primary" />,
    },
    {
      title: "Innovation",
      description:
        "Continuous improvement drives us; we leverage cutting-edge technologies to deliver smarter inventory management.",
      icon: <Cpu size={40} className="text-primary" />,
    },
    {
      title: "Reliability",
      description:
        "Our clients can count on Wanda Inventory to provide accurate, secure, and dependable solutions at all times.",
      icon: <ShieldCheck size={40} className="text-primary" />,
    },
    {
      title: "User-Centricity",
      description:
        "We prioritize the user experience, building intuitive platforms that simplify inventory workflows for businesses of all sizes.",
      icon: <UserCheck size={40} className="text-primary" />,
    },
  ];

  return (
    <section className="w-full bg-background px-4 sm:px-6 lg:px-12 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <p className="text-primary font-semibold text-xs sm:text-sm mb-1 sm:mb-2 tracking-wide">
            CORE VALUES
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
            The Principles That Drive Wanda Inventory
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg mt-2 sm:mt-3 max-w-2xl mx-auto">
            Our culture is defined by values that guide our decisions, foster
            innovation, and ensure exceptional service for our clients.
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-5 sm:p-6 md:p-8 flex flex-col items-start gap-3 sm:gap-4 hover:shadow-md transition-shadow"
            >
              <div>{value.icon}</div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">
                {value.title}
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

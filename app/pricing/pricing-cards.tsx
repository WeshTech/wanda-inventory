"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { plans } from "@/constants/plans";
import { useRouter } from "next/navigation";

export function PricingCards() {
  return (
    <section
      className="w-full bg-transparent/10 py-8 px-4"
      aria-labelledby="pricing-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1
            id="pricing-heading"
            className="text-2xl md:text-3xl font-bold text-foreground mb-4"
          >
            Simple, flexible pricing to suit your needs
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground">
            Choose the plan that is right for you.
          </p>

          {/* Invisible SEO keywords */}
          <p className="sr-only">
            SaaS pricing plans, software subscriptions, monthly and annual
            billing, affordable pricing tiers, business software plans.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 sm:gap-4 md:gap-6">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  plan: (typeof plans)[0];
}

function PricingCard({ plan }: PricingCardProps) {
  const router = useRouter();

  const getIconColor = (colorVar: string) => {
    if (colorVar === "--secondary") return "text-green-500";
    if (colorVar === "--primary") return "text-blue-600";
    if (colorVar === "--accent") return "text-lime-500";
    if (colorVar === "--chart-4") return "text-yellow-600";
    return "text-gray-500";
  };

  return (
    <article
      className="relative group h-full"
      itemScope
      itemType="https://schema.org/Product"
    >
      <div
        className="relative h-full bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-foreground/20"
        style={{
          clipPath:
            "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-foreground/95 to-foreground/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Header Section */}
          <div className="mb-6">
            {plan.badge && (
              <Badge
                variant="secondary"
                className="mb-4 group-hover:bg-background group-hover:text-foreground transition-colors"
              >
                {plan.badge}
              </Badge>
            )}

            <h3
              className="text-2xl font-bold text-foreground group-hover:text-background transition-colors mb-2"
              itemProp="name"
            >
              {plan.name}
            </h3>

            <p
              className="text-sm text-muted-foreground group-hover:text-background/80 transition-colors mb-4"
              itemProp="description"
            >
              {plan.description}
            </p>
          </div>

          {/* Price Section */}
          <div
            className="mb-8"
            itemProp="offers"
            itemScope
            itemType="https://schema.org/Offer"
          >
            <meta itemProp="priceCurrency" content="USD" />

            <div className="flex items-baseline gap-1">
              <span
                className="text-4xl font-bold text-foreground group-hover:text-background transition-colors"
                itemProp="price"
              >
                {plan.price.split(" ")[0]}
              </span>
              <span className="text-2xl text-foreground group-hover:text-background transition-colors">
                {plan.price.split(" ")[1]}
              </span>
            </div>

            <p className="text-sm text-muted-foreground group-hover:text-background/80 transition-colors mt-1">
              {plan.period}
            </p>

            {plan.annualPrice && (
              <p className="text-xs text-muted-foreground group-hover:text-background/70 transition-colors mt-1">
                {plan.annualPrice}
              </p>
            )}
          </div>

          {/* Features */}
          <div className="flex-1 mb-8">
            <ul className="space-y-3" itemProp="additionalProperty">
              {plan.features.map((feature) => (
                <li
                  key={feature.name}
                  className={`flex items-start gap-3 text-sm transition-colors ${
                    feature.included
                      ? "text-foreground group-hover:text-background"
                      : "text-muted-foreground group-hover:text-background/60 opacity-60"
                  }`}
                  itemProp="value"
                >
                  <CheckCircle2
                    size={18}
                    className={`flex-shrink-0 mt-0.5 ${getIconColor(
                      plan.color
                    )} group-hover:text-background transition-colors`}
                  />
                  <span>{feature.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <Button
            onClick={() => router.push("/auth/register")}
            aria-label={`Get started with the ${plan.name} plan`}
            className={`w-full transition-all duration-300 hover:cursor-pointer ${
              plan.buttonVariant === "default"
                ? "bg-foreground text-background hover:bg-foreground/90 group-hover:bg-background group-hover:text-foreground"
                : "border border-border text-foreground hover:bg-muted group-hover:border-background group-hover:text-background group-hover:bg-background/10"
            }`}
            variant={plan.buttonVariant as "default" | "outline"}
          >
            {plan.buttonText}
          </Button>
        </div>
      </div>

      <div
        className="absolute top-0 right-0 w-12 h-12 bg-background group-hover:bg-foreground/95 transition-colors duration-300"
        style={{ borderBottomLeftRadius: "40px" }}
      />
    </article>
  );
}

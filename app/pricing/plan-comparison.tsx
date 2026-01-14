"use client";
import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { plans } from "@/constants/plans";
import React from "react";

interface ComparisonCategory {
  name: string;
  rows: ComparisonRow[];
}

interface ComparisonRow {
  label: string;
  getValueForPlan: (planName: string) => string | boolean;
}

const comparisonCategories: ComparisonCategory[] = [
  {
    name: "Capacity",
    rows: [
      {
        label: "Products",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          const feature = plan?.features.find((f) =>
            f.name.includes("products")
          );
          return feature?.name || "—";
        },
      },
      {
        label: "Roles",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          const feature = plan?.features.find((f) => f.name.includes("roles"));
          return feature?.name || "—";
        },
      },
      {
        label: "Stores",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          const feature = plan?.features.find((f) => f.name.includes("stores"));
          return feature?.name || "—";
        },
      },
      {
        label: "Users",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          const feature = plan?.features.find((f) => f.name.includes("user"));
          return feature?.name || "—";
        },
      },
    ],
  },
  {
    name: "Support & Reporting",
    rows: [
      {
        label: "Email Support",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          return (
            plan?.features.some(
              (f) => f.name === "Email support" && f.included
            ) || false
          );
        },
      },
      {
        label: "Basic Reports",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          return (
            plan?.features.some(
              (f) => f.name === "Basic reports" && f.included
            ) || false
          );
        },
      },
      {
        label: "Custom Reports",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          return (
            plan?.features.some(
              (f) => f.name === "Custom reports" && f.included
            ) || false
          );
        },
      },
      {
        label: "Advanced Analytics",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          return (
            plan?.features.some(
              (f) => f.name === "Advanced Analytics" && f.included
            ) || false
          );
        },
      },
    ],
  },
  {
    name: "Inventory Management",
    rows: [
      {
        label: "Barcode Scanning",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          const feature = plan?.features.find(
            (f) =>
              (f.name.includes("Barcode") ||
                f.name.includes("RFID") ||
                f.name.includes("Barcodes")) &&
              f.included
          );
          return feature?.name || false;
        },
      },
      {
        label: "Inventory Tracking",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          const feature = plan?.features.find(
            (f) =>
              f.name.includes("Inventory") &&
              (f.name.includes("Tracking") || f.name.includes("management"))
          );
          return feature?.name || false;
        },
      },
      {
        label: "SKU Access",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          return (
            plan?.features.some((f) => f.name === "SKU access" && f.included) ||
            false
          );
        },
      },
      {
        label: "Warehouse Automation",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          return (
            plan?.features.some(
              (f) => f.name === "Warehouse automation" && f.included
            ) || false
          );
        },
      },
    ],
  },
  {
    name: "Integrations & API",
    rows: [
      {
        label: "API Access",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          return (
            plan?.features.some((f) => f.name === "API access" && f.included) ||
            false
          );
        },
      },
      {
        label: "ETIMS (KRA) Integration",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          return (
            plan?.features.some(
              (f) => f.name === "ETIMS (KRA) integration" && f.included
            ) || false
          );
        },
      },
      {
        label: "Bank Integration",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          return (
            plan?.features.some(
              (f) => f.name === "Bank Integration" && f.included
            ) || false
          );
        },
      },
      {
        label: "Mpesa Till Integration",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          return (
            plan?.features.some(
              (f) => f.name === "Mpesa Till Integration" && f.included
            ) || false
          );
        },
      },
      {
        label: "IP Address Management",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          return (
            plan?.features.some(
              (f) => f.name === "IP Address Management" && f.included
            ) || false
          );
        },
      },
    ],
  },
  {
    name: "Enterprise Features",
    rows: [
      {
        label: "Access Log Auditing",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          return (
            plan?.features.some(
              (f) => f.name === "Access log auditing" && f.included
            ) || false
          );
        },
      },
      {
        label: "Custom Prices",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          return (
            plan?.features.some(
              (f) => f.name === "Custom prices" && f.included
            ) || false
          );
        },
      },
      {
        label: "Application",
        getValueForPlan: (planName) => {
          const plan = plans.find((p) => p.name === planName);
          return (
            plan?.features.some(
              (f) => f.name === "Application" && f.included
            ) || false
          );
        },
      },
    ],
  },
];

export function PlanComparison() {
  return (
    <section className="w-full mt-24" aria-labelledby="plan-comparison-heading">
      {/* Section heading for SEO */}
      <header className="mb-6 text-center">
        <h2
          id="plan-comparison-heading"
          className="text-2xl md:text-3xl font-bold text-foreground"
        >
          Compare plans and features
        </h2>

        <p className="text-muted-foreground mt-2">
          See a detailed comparison of features across all pricing plans to
          choose the best option for your business.
        </p>

        {/* Invisible keyword reinforcement */}
        <p className="sr-only">
          Pricing comparison table, SaaS feature comparison, plan differences,
          software subscription comparison, pricing tiers explained.
        </p>
      </header>

      <div className="relative">
        <div className="overflow-x-auto">
          <Table>
            {/* Table caption (huge SEO + accessibility win) */}
            <caption className="sr-only">
              Detailed comparison table showing features included in each
              pricing plan.
            </caption>

            <TableHeader className="sticky top-0 z-40 bg-background">
              <TableRow>
                <TableHead
                  scope="col"
                  className="w-1/4 bg-background font-semibold py-4"
                >
                  Feature
                </TableHead>

                {plans.map((plan) => (
                  <TableHead
                    key={plan.name}
                    scope="col"
                    className="bg-background font-semibold py-4 text-center min-w-40"
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-bold text-lg">{plan.name}</span>

                      <span className="text-sm text-muted-foreground">
                        {plan.price}
                        {plan.price !== "Custom" && (
                          <span className="text-xs">{plan.period}</span>
                        )}
                      </span>

                      {plan.annualPrice && plan.price !== "Custom" && (
                        <span className="text-xs text-muted-foreground">
                          {plan.annualPrice}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {comparisonCategories.map((category) => (
                <React.Fragment key={category.name}>
                  {/* Category row = semantic sub-section */}
                  <TableRow className="bg-muted/30">
                    <TableCell
                      colSpan={plans.length + 1}
                      className="font-bold py-3"
                      scope="row"
                    >
                      <h3 className="text-base font-semibold">
                        {category.name}
                      </h3>
                    </TableCell>
                  </TableRow>

                  {category.rows.map((row) => (
                    <TableRow key={row.label}>
                      <TableCell scope="row" className="font-medium">
                        {row.label}
                      </TableCell>

                      {plans.map((plan) => {
                        const value = row.getValueForPlan(plan.name);

                        return (
                          <TableCell
                            key={`${plan.name}-${row.label}`}
                            className="text-center"
                            aria-label={`${row.label} for ${plan.name}`}
                          >
                            {typeof value === "string" ? (
                              <span className="text-sm font-medium">
                                {value}
                              </span>
                            ) : value ? (
                              <Check
                                className="h-5 w-5 mx-auto"
                                style={{ color: `var(${plan.color})` }}
                                aria-label="Included"
                              />
                            ) : (
                              <X
                                className="h-5 w-5 mx-auto text-muted-foreground"
                                aria-label="Not included"
                              />
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
}

"use client";

import type React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  DatabaseZap,
  ShoppingCart,
  BarChart2,
  Users,
} from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export default function HeroSection() {
  const router = useRouter();
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated);
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 lg:py-20">
      {/* Background Image */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/medium-grids.png"
          alt="Background pattern"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/80" />
      </div>

      <Container>
        <div className="relative">
          {/* Floating Icons - Left Side */}
          <div className="absolute left-4 sm:left-10 top-1/4 hidden lg:flex flex-col gap-8 opacity-70">
            <div className="animate-bounce delay-100">
              <DatabaseZap className="h-8 w-8 lg:h-10 lg:w-10 ml-6 text-primary" />
            </div>
          </div>

          <div className="absolute left-20 sm:left-36 top-1/2 hidden lg:block opacity-70">
            <div className="animate-bounce delay-300">
              <ShoppingCart className="h-8 w-8 lg:h-10 lg:w-10 mt-10 text-primary" />
            </div>
          </div>

          {/* Floating Icons - Right Side */}
          <div className="absolute right-4 sm:right-10 top-1/3 hidden lg:flex flex-col gap-8 opacity-70">
            <div className="animate-bounce delay-200">
              <BarChart2 className="h-8 w-8 lg:h-10 lg:w-10 mt-4 text-primary" />
            </div>
          </div>

          <div className="absolute right-16 sm:right-32 top-1/2 hidden lg:block opacity-70">
            <div className="animate-bounce delay-500">
              <Users className="h-8 w-8 lg:h-10 lg:w-10 mt-10 text-primary" />
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-6 sm:space-y-8 relative z-10 max-w-5xl mx-auto">
            {/* Badge */}
            {/* <div className="flex justify-center">
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-medium"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                AI-Powered Inventory Management
              </Badge>
            </div> */}

            {/* Main Heading */}
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl xl:text-5xl mt-16 sm:mt-10 md:mt-10">
              <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                Fast, Secure, Reliable
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-lime-500 bg-clip-text text-transparent">
                AI-Powered{" "}
              </span>
              Inventory Solution
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-3xl text-base sm:text-lg lg:text-lg text-muted-foreground leading-relaxed">
              Take control of your stock with our powerful, intuitive platform.
              Track inventory, analyze trends, manage employees, and track sales
              with real-time insights.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              {isLoggedIn ? (
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-primary to-secondary/80 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold px-8 py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                  asChild
                  onClick={() => router.push("/dashboard")}
                >
                  <Link href="/dashboard">
                    Go to your dashboard
                    <ArrowRight className="h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1" />
                  </Link>
                </Button>
              ) : (
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 dark:from-primary dark:to-secondary/80 dark:hover:from-primary/90 dark:hover:to-secondary/70 text-primary-foreground font-semibold px-8 py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-secondary/20 dark:hover:shadow-secondary/30"
                  onClick={() => router.push("/auth/register")}
                >
                  Start your 15-day FREE trial
                  <ArrowRight className="ml-2 h-5 w-5 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1" />
                </Button>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="pt-2">
              <p className="text-sm text-muted-foreground mb-4">
                Trusted by 200+ businesses across Kenya
              </p>
              <div className="flex items-center justify-center gap-8 opacity-60 flex-wrap">
                <Badge variant="outline" className="text-xs">
                  Vitroin ent
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Lexicon
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Mainline supliers
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Janma Traders
                </Badge>
              </div>
            </div>
          </div>

          {/* Dashboard Image */}
          <div className="relative mt-10 sm:mt-12 lg:mt-14">
            <div className="relative mx-auto max-w-6xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full" />
              <div className="relative">
                <Image
                  src="/images/dash3.jpg"
                  alt="Inventory Management Dashboard"
                  width={1200}
                  height={600}
                  className="w-full h-auto rounded-2xl shadow-2xl border border-border/50"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-background/20 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

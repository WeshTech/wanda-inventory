"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NavMenu } from "@/constants/navMenu";
import { usePathname, useRouter } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="max-w-[2620px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
      {children}
    </div>
  );
};

const NavBar = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const isLoggedIn = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;

      // Show navbar when at the top of the page
      if (currentScrollY < 10) {
        setIsVisible(true);
      }
      // Show navbar when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      // Hide navbar when scrolling down
      else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          controlNavbar();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className="relative">
      <div
        className={`fixed w-full left-0 top-2 z-50 transition-all duration-300 ease-in-out ${
          isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        <Container>
          <div className="border-2 border-yellow-400/80 bg-background/80 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex gap-3 items-center">
                <Link href="/">
                  <Image
                    src="/images/inventory-logo.png"
                    alt="logo"
                    height={2000}
                    width={2000}
                    className="rounded-sm h-10 w-10"
                  />
                </Link>
                <Link href="/">
                  <h1 className="text-lg sm:text-xl md:text-xl font-semibold">
                    Wanda Inventory
                  </h1>
                </Link>
              </div>

              {/* Desktop Menu */}
              <nav className="hidden lg:flex gap-6">
                {NavMenu.map((item) => {
                  const isActive = pathname === item.link;
                  return (
                    <div
                      key={item.title}
                      className="flex flex-col items-center"
                    >
                      <Link
                        href={item.link}
                        className={`text-gray-700 font-medium hover:text-blue-600 transition-colors ${
                          isActive ? "text-blue-600" : ""
                        }`}
                      >
                        {item.title}
                      </Link>
                      {isActive && (
                        <span className="mt-1 h-[2px] w-4 bg-yellow-400 rounded"></span>
                      )}
                    </div>
                  );
                })}
              </nav>

              {/* Desktop Buttons */}
              {isLoggedIn ? (
                <div>
                  <Button
                    size="lg"
                    asChild
                    onClick={() => router.push("/dashboard")}
                    className="bg-gradient-to-r from-primary to-secondary text-white font-semibold hidden lg:flex  hover:from-blue-700 hover:to-lime-600 transition-colors  items-center gap-2"
                  >
                    <Link href="/dashboard">
                      Go to Dashboard
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </Link>
                  </Button>
                </div>
              ) : (
                <div className="hidden lg:flex items-center gap-4">
                  <Button
                    variant="outline"
                    asChild
                    onClick={() => router.push("/auth/login")}
                  >
                    <Link href="/signin">Sign In</Link>
                  </Button>

                  <Button
                    size="lg"
                    asChild
                    onClick={() => router.push("/auth/register")}
                    className="bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:from-blue-700 hover:to-lime-600 transition-colors"
                  >
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}

              <div className="flex lg:hidden items-center gap-3">
                {isLoggedIn ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => router.push("/dashboard")}
                  >
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-sm font-medium hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    onClick={() => router.push("/auth/register")}
                  >
                    Sign In
                  </Button>
                )}

                <Sheet
                  open={isMobileMenuOpen}
                  onOpenChange={setIsMobileMenuOpen}
                >
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="lg:hidden hover:bg-gray-100 transition-colors"
                      aria-label="Open navigation menu"
                    >
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>

                  <SheetContent
                    side="right"
                    className="w-[280px] sm:w-[350px] p-0 flex flex-col"
                  >
                    <SheetHeader className="sr-only">
                      <SheetTitle>Navigation Menu</SheetTitle>
                    </SheetHeader>

                    {/* Header Section */}
                    <div className="flex items-center justify-between px-6 py-5 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Image
                            src="/images/inventory-logo.png"
                            alt="Wanda Inventory"
                            height={40}
                            width={40}
                            className="rounded-sm shadow-sm"
                          />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-gray-900">
                            Wanda Inventory
                          </h2>
                        </div>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="h-8 w-8 hover:bg-white/50 rounded-full"
                        aria-label="Close menu"
                      >
                        <X className="h-5 w-5 text-gray-600" />
                      </Button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 py-6 overflow-y-auto">
                      <div className="space-y-1">
                        {NavMenu.map((item) => {
                          const isActive = pathname === item.link;
                          const IconComponent = item.icon;
                          return (
                            <Link
                              key={item.title}
                              href={item.link}
                              className={`
                        group flex items-center gap-4 px-4 py-3.5 rounded-xl
                        transition-all duration-200 ease-in-out
                        ${
                          isActive
                            ? "bg-blue-600 text-white shadow-sm shadow-blue-200"
                            : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                        }
                      `}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <IconComponent
                                className={`h-5 w-5 transition-transform duration-200 ${
                                  isActive
                                    ? "text-white"
                                    : "text-gray-500 group-hover:text-blue-600 group-hover:scale-110"
                                }`}
                              />
                              <span
                                className={`text-base font-medium ${
                                  isActive ? "font-semibold" : ""
                                }`}
                              >
                                {item.title}
                              </span>
                              {isActive && (
                                <div className="ml-auto h-2 w-2 rounded-full bg-white/80" />
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </nav>

                    {/* Bottom Action Section */}
                    <div className="p-4 border-t bg-gray-50/50">
                      {isLoggedIn ? (
                        <Button
                          size="lg"
                          className="
                    w-full h-12 font-semibold text-base
                    transition-all duration-300 
                    shadow-lg hover:shadow-xl active:scale-[0.98]
                    bg-gradient-to-r from-blue-600 to-indigo-600
                    hover:from-blue-700 hover:to-indigo-700
                    text-white rounded-xl
                  "
                          onClick={() => {
                            setIsMobileMenuOpen(false);
                            router.push("/dashboard");
                          }}
                        >
                          Go to Dashboard →
                        </Button>
                      ) : (
                        <div className="space-y-3">
                          <Button
                            size="lg"
                            className="
                      w-full h-12 font-semibold text-base
                      transition-all duration-300 
                      shadow-lg hover:shadow-xl active:scale-[0.98]
                      bg-gradient-to-r from-blue-600 to-indigo-600
                      hover:from-blue-700 hover:to-indigo-700
                      text-white rounded-xl
                    "
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              router.push("/auth/register");
                            }}
                          >
                            Get Started →
                          </Button>
                          <p className="text-xs text-center text-gray-600">
                            Free trial • No credit card required
                          </p>
                        </div>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;

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
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

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
                    className="rounded-lg h-10 w-10"
                  />
                </Link>
                <Link href="/">
                  <h1 className="text-xl font-semibold">Wesh Inventory</h1>
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
              <div className="hidden lg:flex items-center gap-4">
                <Button variant="outline">Sign In</Button>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:from-blue-700 hover:to-lime-600 transition-colors"
                >
                  Get Started
                </Button>
              </div>

              {/* Mobile Menu */}
              <div className="flex lg:hidden items-center gap-2">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>

                <Sheet
                  open={isMobileMenuOpen}
                  onOpenChange={setIsMobileMenuOpen}
                >
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <SheetHeader>
                      <SheetTitle className="sr-only">
                        Navigation Menu
                      </SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col h-full">
                      {/* Mobile Header */}
                      <div className="flex items-center gap-3 pb-6 border-b">
                        <Image
                          src="/images/inventory-logo.png"
                          alt="logo"
                          height={40}
                          width={40}
                          className="rounded-lg h-10 w-10"
                        />
                        <h2 className="text-xl font-semibold">
                          Wesh Inventory
                        </h2>
                      </div>

                      {/* Mobile Navigation */}
                      <nav className="flex flex-col space-y-2 py-6 flex-1">
                        {NavMenu.map((item) => {
                          const isActive = pathname === item.link;
                          const IconComponent = item.icon;
                          return (
                            <Link
                              key={item.title}
                              href={item.link}
                              className={`flex items-center gap-3 text-lg font-medium py-3 px-4 rounded-lg transition-all duration-200 ${
                                isActive
                                  ? "text-blue-600 bg-blue-50 border-l-4 border-blue-600"
                                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                              }`}
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <IconComponent
                                className={`h-5 w-5 ${
                                  isActive ? "text-blue-600" : "text-gray-500"
                                }`}
                              />
                              <span>{item.title}</span>
                            </Link>
                          );
                        })}
                      </nav>

                      {/* Mobile CTA */}
                      <div className="pt-6 border-t">
                        <Button
                          size="lg"
                          className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:from-blue-700 hover:to-lime-600 transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          Get Started
                        </Button>
                      </div>
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

// "use client";

// import { useState, useEffect } from "react";

// import Link from "next/link";
// import Image from "next/image";
// import { Button } from "../ui/button";
// import { NavMenu } from "@/constants/navMenu";
// import { usePathname } from "next/navigation";

// interface ContainerProps {
//   children: React.ReactNode;
// }

// const Container: React.FC<ContainerProps> = ({ children }) => {
//   return (
//     <div className="max-w-[2620px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
//       {children}
//     </div>
//   );
// };

// const NavBar = () => {
//   const pathname = usePathname();
//   const [isVisible, setIsVisible] = useState(true);
//   const [lastScrollY, setLastScrollY] = useState(0);

//   useEffect(() => {
//     const controlNavbar = () => {
//       const currentScrollY = window.scrollY;

//       // Show navbar when at the top of the page
//       if (currentScrollY < 10) {
//         setIsVisible(true);
//       }
//       // Show navbar when scrolling up
//       else if (currentScrollY < lastScrollY) {
//         setIsVisible(true);
//       }
//       // Hide navbar when scrolling down
//       else if (currentScrollY > lastScrollY && currentScrollY > 100) {
//         setIsVisible(false);
//       }

//       setLastScrollY(currentScrollY);
//     };

//     // Throttle scroll events for better performance
//     let ticking = false;
//     const handleScroll = () => {
//       if (!ticking) {
//         requestAnimationFrame(() => {
//           controlNavbar();
//           ticking = false;
//         });
//         ticking = true;
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [lastScrollY]);

//   return (
//     <div className="relative">
//       <div
//         className={`fixed w-full left-0 top-2 z-50 transition-all duration-300 ease-in-out ${
//           isVisible
//             ? "translate-y-0 opacity-100"
//             : "-translate-y-full opacity-0"
//         }`}
//       >
//         <Container>
//           <div className="border-2 border-yellow-400/80 bg-background/80 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
//             <div className="flex items-center justify-between">
//               {/* logo */}
//               <div>
//                 <div className="flex gap-3 items-center">
//                   <Link href="/">
//                     <Image
//                       src="/images/inventory-logo.png"
//                       alt="logo"
//                       height={2000}
//                       width={2000}
//                       className="rounded-lg h-10 w-10"
//                     />
//                   </Link>
//                   <Link href="/">
//                     <h1 className="text-xl">Wesh Inventory</h1>
//                   </Link>
//                 </div>
//               </div>

//               {/* menu */}
//               <nav className="flex gap-6">
//                 {NavMenu.map((item) => {
//                   const isActive = pathname === item.link;

//                   return (
//                     <div
//                       key={item.title}
//                       className="flex flex-col items-center"
//                     >
//                       <Link
//                         href={item.link}
//                         className={`text-gray-700 font-medium hover:text-blue-600 transition-colors ${
//                           isActive ? "text-blue-600" : ""
//                         }`}
//                       >
//                         {item.title}
//                       </Link>
//                       {isActive && (
//                         <span className="mt-1 h-[2px] w-4 bg-yellow-400 rounded"></span>
//                       )}
//                     </div>
//                   );
//                 })}
//               </nav>

//               {/* buttons */}
//               <div className="flex items-center gap-4">
//                 <Button variant="outline">Sign In</Button>
//                 <Button
//                   size="lg"
//                   className="bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:from-blue-700 hover:to-lime-600 transition-colors"
//                 >
//                   Get Started
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default NavBar;

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  Mail,
  MapPin,
  Twitter,
  Linkedin,
  Instagram,
  ArrowRight,
  Shield,
  Zap,
  Users,
  BarChart3,
  FacebookIcon,
  MessageCircle,
} from "lucide-react";

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

const footerLinks = {
  product: [
    { name: "Features", href: "/" },
    { name: "Pricing", href: "/" },
    { name: "Integrations", href: "/" },
    { name: "API Documentation", href: "/" },
    { name: "Mobile App", href: "/" },
  ],
  company: [
    { name: "About Us", href: "/" },
    { name: "Careers", href: "/" },
    { name: "Press", href: "/" },
    { name: "Partners", href: "/" },
    { name: "Contact", href: "/" },
  ],
  resources: [
    { name: "Blog", href: "/" },
    { name: "Help Center", href: "/" },
    { name: "Community", href: "/" },
    { name: "Webinars", href: "/" },
    { name: "Case Studies", href: "/" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/" },
    { name: "Terms of Service", href: "/" },
    { name: "Cookie Policy", href: "/" },
    { name: "GDPR", href: "/" },
    { name: "Security", href: "/" },
  ],
};

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "Instagram", href: "https://instagram.com", icon: Instagram },
];

const features = [
  { icon: Shield, text: "Enterprise Security" },
  { icon: Zap, text: "Real-time Updates" },
  { icon: Users, text: "24/7 Support" },
  { icon: BarChart3, text: "Advanced Analytics" },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-background border-t border-border">
      <Container>
        {/* Newsletter Section */}
        <div className="py-12 border-b border-border ">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-2">
                Stay Updated with Wanda Inventory
              </h3>
              <p className="text-muted-foreground">
                Get the latest updates, tips, and insights delivered to your
                inbox. Join over 50+ inventory managers who trust our
                newsletter.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                className="flex-1"
                disabled
              />
              <Button className="group" disabled>
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <span className="font-bold text-xl">Wanda Inventory</span>
              </Link>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                The most trusted inventory management solution in Kenya. Helping
                businesses streamline operations, reduce costs, and boost
                profitability since 2025.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <feature.icon className="h-4 w-4 text-primary" />
                    <span className="text-sm text-muted-foreground">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageCircle className="h-4 w-4" />
                  <span>+254 798 853 079</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>wandainventory@gmail.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>Nairobi, Kenya</span>
                </div>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <p
                      // href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <p
                      // href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <p
                      // href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <p
                      // href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.name}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-sm text-muted-foreground">
                © 2025 Wanda Inventory.. All rights reserved.
              </p>
              <Badge variant="secondary" className="text-xs">
                Made in Kenya 🇰🇪
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              {/* Social Links */}
              <div className="flex items-center gap-2">
                {socialLinks.map((social) => (
                  <Button
                    key={social.name}
                    variant="ghost"
                    size="icon"
                    asChild
                    className="h-8 w-8 hover:bg-primary/10"
                  >
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className="h-4 w-4" />
                      <span className="sr-only">{social.name}</span>
                    </Link>
                  </Button>
                ))}
              </div>

              {/* Trust Badges */}
              {/* <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  ISO 27001
                </Badge>
                <Badge variant="outline" className="text-xs">
                  SOC 2
                </Badge>
              </div> */}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

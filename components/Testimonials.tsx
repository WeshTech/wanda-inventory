"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const testimonials = [
  {
    id: 1,
    name: "Grace Wanjiku",
    role: "Store Manager",
    company: "Lexicon",
    rating: 5,
    content:
      "This inventory solution has completely transformed how we manage our stock. Real-time tracking and automated alerts have reduced our stockouts by 80%. Highly recommended!",
    avatar: "/placeholder.svg?height=40&width=40&text=GW",
  },
  {
    id: 2,
    name: "David Kipchoge",
    role: "Operations Director",
    company: "Janma Traders",
    rating: 5,
    content:
      "The reporting features are exceptional. We can now forecast demand accurately and optimize our purchasing decisions. Our inventory turnover has improved significantly.",
    avatar: "/images/davidkipchoge.jpg",
  },
  {
    id: 3,
    name: "Mary Akinyi",
    role: "Warehouse Supervisor",
    company: "Vitroin",
    rating: 4,
    content:
      "Easy to use interface and excellent customer support. The barcode scanning feature has made stock taking so much faster. Our team adapted to it within days.",
    avatar: "/placeholder.svg?height=40&width=40&text=MA",
  },
  {
    id: 4,
    name: "Samuel Mutua",
    role: "Inventory Manager",
    company: "Juma pharmacy",
    rating: 5,
    content:
      "The multi-location inventory tracking is a game changer. We can monitor stock levels across all our branches in real-time. This has saved us countless hours.",
    avatar: "/images/samuelmutua.jpg",
  },
  {
    id: 5,
    name: "Faith Njeri",
    role: "Supply Chain Manager",
    company: "Nas Bakeries",
    rating: 5,
    content:
      "Outstanding solution! The automated reorder points and supplier integration have streamlined our procurement process. We've reduced excess inventory by 40%.",
    avatar: "/images/faithnjeri.jpg",
  },
  {
    id: 6,
    name: "Peter Otieno",
    role: "Branch Manager",
    company: "Cleanshelf",
    rating: 4,
    content:
      "The web app allows me to check inventory levels on the go. The analytics dashboard provides valuable insights that help us make better business decisions.",
    avatar: "/placeholder.svg?height=40&width=40&text=PO",
  },
  {
    id: 7,
    name: "Catherine Mwangi",
    role: "Store Owner",
    company: "Mwangi General Store",
    rating: 5,
    content:
      "As a small business owner, this system has been invaluable. It's affordable, easy to use, and has helped me reduce waste and improve profitability significantly.",
    avatar: "/placeholder.svg?height=40&width=40&text=CM",
  },
  {
    id: 8,
    name: "James Kamau",
    role: "Logistics Coordinator",
    company: "Choppys Mart",
    rating: 4,
    content:
      "The integration with our existing systems was seamless. The support team was very helpful during implementation. We're seeing improved efficiency across all operations.",
    avatar: "/images/jameskamau.jpg",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-4 h-4 ${
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
      dragFree: true,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  return (
    <section id="testimonials" className="py-4 bg-transparent/85">
      <div className="container mx-auto ">
        <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-4">
          <h2 className="scroll-m-20 text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3 sm:mb-4">
            What Our Customers Say
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
            Discover how our inventory management solution is helping businesses
            across Kenya streamline their operations and boost profitability.
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex-shrink-0 w-80">
                <Card className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-400">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-12 h-12 border-2 border-border">
                        <AvatarImage
                          src={testimonial.avatar || "/placeholder.svg"}
                          alt={testimonial.name}
                        />
                        <AvatarFallback className="bg-muted text-muted-foreground font-semibold">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">
                            {testimonial.name}
                          </h3>
                          <StarRating rating={testimonial.rating} />
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {testimonial.role}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {testimonial.company}
                        </Badge>
                      </div>
                    </div>
                    <blockquote className="text-muted-foreground leading-relaxed">
                      &quot;{testimonial.content}&quot;
                    </blockquote>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Badge variant="outline" className="text-sm">
            Join over 200+ businesses across Kenya <br /> who trust our
            inventory solution
          </Badge>
        </div>
      </div>
    </section>
  );
}

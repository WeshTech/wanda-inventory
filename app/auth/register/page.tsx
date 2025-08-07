"use client";

import { useState, useEffect } from "react";
import {
  ChevronRight,
  Package,
  TrendingUp,
  Users,
  MapPin,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

const images = [
  "/images/pharmacy.jpg",
  "/images/supermarket.jpg",
  "/images/warehouse.jpg",
];

const eastAfricanCountries = [
  { value: "kenya", label: "Kenya" },
  { value: "uganda", label: "Uganda" },
  { value: "tanzania", label: "Tanzania" },
  { value: "rwanda", label: "Rwanda" },
  { value: "burundi", label: "Burundi" },
  { value: "ethiopia", label: "Ethiopia" },
  { value: "somalia", label: "Somalia" },
  { value: "south-sudan", label: "South Sudan" },
  { value: "djibouti", label: "Djibouti" },
  { value: "eritrea", label: "Eritrea" },
];

const mapLocations = [
  { id: "nairobi", name: "Nairobi, Kenya", x: 60, y: 45 },
  { id: "kampala", name: "Kampala, Uganda", x: 55, y: 40 },
  { id: "dar-es-salaam", name: "Dar es Salaam, Tanzania", x: 65, y: 55 },
  { id: "kigali", name: "Kigali, Rwanda", x: 52, y: 48 },
  { id: "addis-ababa", name: "Addis Ababa, Ethiopia", x: 65, y: 25 },
];

export default function InventoryLogin() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    password: "",
    country: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleLocationClick = (location: (typeof mapLocations)[0]) => {
    setSelectedLocation(location.name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, location: selectedLocation });
  };

  return (
    <div className="min-h-screen flex m-2">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-2xl p-4">
        {/* Image container with proper rounded corners */}
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* Image without m-4 to allow full container rounding */}
              <Image
                src={image || "/placeholder.svg"}
                alt={`Inventory management ${index + 1}`}
                className="w-full h-full object-cover"
                height={7000}
                width={7000}
              />
              {/* Dark overlay without m-4 to match image size */}
              <div className="absolute inset-0 bg-black/60" />
            </div>
          ))}
        </div>

        {/* Overlay Content - unchanged from your version */}
        <div className="relative z-10 flex flex-col items-start p-16 text-white">
          <div className="max-w-md">
            <div className="flex items-center mb-6">
              <Package className="h-12 w-12 text-yellow-400 mr-4" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Wanda Inventory
              </h1>{" "}
            </div>

            <h2 className="text-3xl font-bold mb-4 leading-tight">
              Streamline Your Business Inventory
            </h2>

            <p className="text-xl mb-8 text-gray-200">
              Join thousands of businesses across East Africa managing their
              inventory efficiently with our cutting-edge platform.
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 mr-3 text-primary" />
                <span className="text-lg">Real-time Analytics</span>
              </div>
              <div className="flex items-center">
                <Users className="h-6 w-6 mr-3 text-secondary" />
                <span className="text-lg">Multi-user Access</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-6 w-6 mr-3 text-yellow-400" />
                <span className="text-lg">Location Tracking</span>
              </div>
            </div>

            <div className="flex space-x-2 mt-8">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-8 rounded-full transition-all duration-300 ${
                    index === currentImageIndex ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <Card className="w-full m-5">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4 lg:hidden">
              <Package className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Let&apos;s Get Started
            </CardTitle>
            <CardDescription className="text-muted-foreground m-2">
              Create your account to start managing your inventory.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Business Name */}
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  type="text"
                  placeholder="Enter your business name"
                  value={formData.businessName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      businessName: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              {/* Business Email */}
              <div className="space-y-2">
                <Label htmlFor="businessEmail">Business Email</Label>
                <Input
                  id="businessEmail"
                  type="email"
                  placeholder="business@example.com"
                  value={formData.businessEmail}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      businessEmail: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Country Selection */}
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select
                  value={formData.country}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, country: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    {eastAfricanCountries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Interactive Map */}
              <div className="space-y-2">
                <Label>Business Location</Label>
                <div className="border rounded-lg p-4 bg-white">
                  <p className="text-sm text-gray-600 mb-3">
                    Click on a city to select your location:
                  </p>
                  <div className="relative">
                    <svg
                      viewBox="0 0 100 80"
                      className="w-full h-40 border rounded"
                      style={{ backgroundColor: "#e6f3ff" }}
                    >
                      {/* Simple East Africa outline */}
                      <path
                        d="M20,20 L80,15 L85,25 L80,35 L85,45 L80,55 L75,65 L65,70 L55,65 L45,70 L35,65 L25,60 L20,50 L15,40 L20,30 Z"
                        fill="#d4e6f1"
                        stroke="#2563eb"
                        strokeWidth="1"
                      />

                      {/* Location markers */}
                      {mapLocations.map((location) => (
                        <g key={location.id}>
                          <circle
                            cx={location.x}
                            cy={location.y}
                            r="3"
                            fill={
                              selectedLocation === location.name
                                ? "#ef4444"
                                : "#2563eb"
                            }
                            className="cursor-pointer hover:fill-red-500 transition-colors"
                            onClick={() => handleLocationClick(location)}
                          />
                          <text
                            x={location.x}
                            y={location.y - 5}
                            fontSize="6"
                            textAnchor="middle"
                            fill="#1f2937"
                            className="pointer-events-none text-xs"
                          >
                            {location.name.split(",")[0]}
                          </text>
                        </g>
                      ))}
                    </svg>
                  </div>
                  {selectedLocation && (
                    <p className="text-sm text-primary mt-2 font-medium">
                      Selected: {selectedLocation}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-primary hover:underline font-medium"
                  >
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-primary hover:underline font-medium"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <Button type="submit" className="w-full" size="lg">
                Create Account
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>

              {/* Additional Links */}
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in here
                  </a>
                </p>
                <a href="#" className="text-sm text-gray-500 hover:underline">
                  Forgot your password?
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

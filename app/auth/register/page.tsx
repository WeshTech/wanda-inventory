"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import VerifyEmail from "./verify";
import Link from "next/link";

// Zod Schema
const formSchema = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters")
    .max(100, "Business name must be less than 100 characters"),
  businessEmail: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  country: z.string().min(1, "Please select a country"),
  location: z.string().min(1, "Please select a business location"),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormData = z.infer<typeof formSchema>;

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

export default function InventorySignup() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      businessEmail: "",
      password: "",
      country: "",
      location: "",
      terms: false,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleLocationClick = (location: (typeof mapLocations)[0]) => {
    setSelectedLocation(location.name);
    form.setValue("location", location.name);
    form.clearErrors("location");
  };

  const onSubmit = async (data: FormData) => {
    try {
      console.log("Form submitted:", data);
      // Here you would typically send the data to your API
      {
        <VerifyEmail />;
      }
      // await createAccount(data)
    } catch (error) {
      console.error("Submission error:", error);
    }
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
              <Image
                src={
                  image ||
                  "/placeholder.svg?height=800&width=600&query=modern inventory management"
                }
                alt={`Inventory management ${index + 1}`}
                className="w-full h-full object-cover"
                height={800}
                width={600}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/60" />
            </div>
          ))}
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 flex flex-col items-start p-16 text-white">
          <div className="max-w-md">
            <div className="flex items-center mb-6">
              <Package className="h-12 w-12 text-yellow-400 mr-4" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Wanda Inventory
              </h1>
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

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
        <Card className="w-full mx-2 my-2 sm:mx-3 sm:my-3 md:mx-4 md:my-4 lg:mx-5 lg:my-5">
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Business Name */}
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your business name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Business Email */}
                <FormField
                  control={form.control}
                  name="businessEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="business@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            {...field}
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Country Selection */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {eastAfricanCountries.map((country) => (
                            <SelectItem
                              key={country.value}
                              value={country.value}
                            >
                              {country.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Interactive Map */}
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Location</FormLabel>
                      <FormControl>
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
                                    onClick={() =>
                                      handleLocationClick(location)
                                    }
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Terms and Conditions */}
                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-col xs:flex-row items-start gap-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5" // Small vertical alignment adjustment
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-xs sm:text-sm font-normal">
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
                        </FormLabel>
                        <FormMessage className="text-xs sm:text-sm" />
                      </div>
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Creating Account..."
                    : "Create Account"}
                  <ChevronRight className="ml-2 h-4 w-4 transition-all duration-200 group-hover:scale-125" />{" "}
                </Button>

                {/* Additional Links */}
                <div className="text-center space-y-2">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link
                      href="/auth/login"
                      className="text-primary hover:underline font-medium"
                    >
                      Sign in here
                    </Link>
                  </p>
                  <Link
                    href="/auth/login/forgot-password"
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

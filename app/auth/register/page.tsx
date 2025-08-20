"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import Link from "next/link";
import { type FormData, RegisterSchema } from "@/schemas/registrationSchema";
import LocationSelector from "./location-selector";
import { RegisterUser } from "@/server/auth/register";
import VerifyEmail from "./verify";
import toast from "react-hot-toast";

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
  { value: "ethiopia", label: "Ethiopia" },
];

const businessTypes = [
  { value: "electronics", label: "Electronics" },
  { value: "general_shop", label: "General Shop" },
  { value: "pharmacy", label: "Pharmacy" },
  { value: "bookshop", label: "Bookshop" },
  { value: "hardware", label: "Hardware" },
];

export default function InventorySignup() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerifyEmail, setShowVerifyEmail] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      businessName: "",
      businessEmail: "",
      businessType: "",
      password: "",
      country: "",
      county: "",
      constituency: "",
      ward: "",
      terms: false,
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = async (data: FormData) => {
    const response = await RegisterUser(data);
    console.log("Registration response:", response);
    if (response.status === true) {
      toast.success(response.message);
      setShowVerifyEmail(true);
    }
    if (response.status === false) {
      toast.error(response.message);
    }
  };
  if (showVerifyEmail) {
    return <VerifyEmail />;
  }

  return (
    <div className="min-h-screen flex m-2">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden rounded-2xl p-4">
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
                  "/placeholder.svg?height=800&width=600&query=modern inventory management" ||
                  "/placeholder.svg" ||
                  "/placeholder.svg" ||
                  "/placeholder.svg"
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

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full mx-2 my-2 sm:mx-3 sm:my-3 md:mx-4 md:my-4 lg:mx-5 lg:my-5">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4 lg:hidden">
              <Package className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="flexify gap-3 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              <Package className="h-8 w-8 text-secondary" />
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

                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select your business" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {businessTypes.map((bizType) => (
                            <SelectItem
                              key={bizType.value}
                              value={bizType.value}
                            >
                              {bizType.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                            className="pr-10"
                          />
                          <button
                            type="button"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent focus:outline-none"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          <SelectTrigger className="w-full">
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

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Business Location</h3>
                  <p className="text-sm text-gray-600">
                    Select your business location using the dropdowns below:
                  </p>
                  <LocationSelector form={form} />
                </div>

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-col xs:flex-row items-start gap-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-0.5"
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

                <Button
                  type="submit"
                  onClick={() => console.log("Submit button clicked")}
                  className={`w-full ${
                    form.formState.isSubmitting
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  size="lg"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting
                    ? "Creating Account..."
                    : "Create Account"}
                  <ChevronRight className="ml-2 h-4 w-4 transition-all duration-200 group-hover:scale-125" />
                </Button>

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

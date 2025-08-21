"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
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
  Mail,
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
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

export default function MergedRegistration() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showVerificationStep, setShowVerificationStep] = useState(false);
  const router = useRouter();
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

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

  useEffect(() => {
    if (showVerificationStep) {
      inputRefs.current[0]?.focus();
    }
  }, [showVerificationStep]);

  const handleVerificationInputChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerificationKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerificationPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (pastedData) {
      const newCode = [...verificationCode];
      for (let i = 0; i < pastedData.length; i++) {
        newCode[i] = pastedData[i];
      }
      setVerificationCode(newCode);

      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const onSubmit = async (data: FormData) => {
    if (showVerificationStep) {
      // Handle verification step
      const code = verificationCode.join("");
      if (code.length !== 6) {
        toast.error("Please enter the complete 6-digit code");
        return;
      }

      // Add verification code to form data
      const verificationData = { ...data, code };
      const response = await RegisterUser(verificationData);

      if (response.status === true) {
        toast.success(response.message);
        // Redirect or handle successful registration
        router.replace("/auth/login");
      } else {
        toast.error(response.message);
      }
    } else {
      // Handle initial registration step
      const response = await RegisterUser(data);
      console.log("Registration response:", response);

      if (response.verification === true) {
        toast.success(response.message);
        setShowVerificationStep(true);
      } else {
        toast.error(response.message);
      }
    }
  };

  const handleResendCode = async () => {
    const formData = form.getValues();
    const response = await RegisterUser(formData);

    if (response.status === true) {
      toast.success("Verification code resent!");
      setVerificationCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } else {
      toast.error("Failed to resend code");
    }
  };

  const isVerificationCodeComplete = verificationCode.every(
    (digit) => digit !== ""
  );

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
              {showVerificationStep
                ? "Verify Your Email"
                : "Streamline Your Business Inventory"}
            </h2>

            <p className="text-xl mb-8 text-gray-200">
              {showVerificationStep
                ? "We've sent a 6-digit verification code to your email address."
                : "Join thousands of businesses across East Africa managing their inventory efficiently with our cutting-edge platform."}
            </p>

            {!showVerificationStep && (
              <>
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
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full mx-2 my-2 sm:mx-3 sm:my-3 md:mx-4 md:my-4 lg:mx-5 lg:my-5">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4 lg:hidden">
              {showVerificationStep ? (
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
              ) : (
                <Package className="h-10 w-10 text-primary" />
              )}
            </div>
            <CardTitle className="flexify gap-3 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {!showVerificationStep && (
                <Package className="h-8 w-8 text-secondary" />
              )}
              {showVerificationStep ? "Verify Your Email" : "Let's Get Started"}
            </CardTitle>
            <CardDescription className="text-muted-foreground m-2">
              {showVerificationStep
                ? "Enter the 6-digit code sent to your email address."
                : "Create your account to start managing your inventory."}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {!showVerificationStep && (
                  <>
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
                  </>
                )}

                {showVerificationStep && (
                  <div className="space-y-6">
                    <div className="flex justify-center gap-2">
                      {verificationCode.map((digit, index) => (
                        <Input
                          key={index}
                          ref={(el) => {
                            if (el) {
                              inputRefs.current[index] = el;
                            }
                          }}
                          type="text"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          maxLength={1}
                          value={digit}
                          onChange={(e) =>
                            handleVerificationInputChange(index, e.target.value)
                          }
                          onKeyDown={(e) => handleVerificationKeyDown(index, e)}
                          onPaste={handleVerificationPaste}
                          className="w-12 h-12 text-center text-lg font-semibold"
                          disabled={form.formState.isSubmitting}
                        />
                      ))}
                    </div>

                    <div className="text-center space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Didn&apos;t receive the code?
                      </p>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleResendCode}
                        disabled={form.formState.isSubmitting}
                        className="text-sm"
                      >
                        Resend verification code
                      </Button>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className={`w-full ${
                    form.formState.isSubmitting
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                  size="lg"
                  disabled={
                    form.formState.isSubmitting ||
                    (showVerificationStep && !isVerificationCodeComplete)
                  }
                >
                  {form.formState.isSubmitting
                    ? showVerificationStep
                      ? "Verifying..."
                      : "Creating Account..."
                    : showVerificationStep
                    ? "Verify Email"
                    : "Create Account"}
                  <ChevronRight className="ml-2 h-4 w-4 transition-all duration-200 group-hover:scale-125" />
                </Button>

                {!showVerificationStep && (
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
                )}

                {showVerificationStep && (
                  <div className="flex items-center justify-center">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-sm text-muted-foreground"
                      onClick={() => setShowVerificationStep(false)}
                    >
                      ← Back to registration
                    </Button>
                  </div>
                )}
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

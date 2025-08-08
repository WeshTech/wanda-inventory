"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Package,
  Warehouse,
  BarChart3,
  Shield,
  Eye,
  EyeOff,
  Check,
  X,
  Lock,
  CheckCircle,
  ArrowRight,
  KeyRound,
} from "lucide-react";
import Link from "next/link";

// Password strength calculation
const calculatePasswordStrength = (password: string): number => {
  let strength = 0;
  if (password.length >= 8) strength += 25;
  if (/[a-z]/.test(password)) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
  return Math.min(strength, 100);
};

// Zod schema for password validation
const passwordResetSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordResetFormValues = z.infer<typeof passwordResetSchema>;

export default function Component() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  useEffect(() => {
    setPasswordStrength(calculatePasswordStrength(password));
  }, [password]);

  const onSubmit = async (values: PasswordResetFormValues) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call to reset password
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Password reset successful:", values);
      setIsSuccess(true);
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      console.error("Password reset error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 25) return "bg-red-500";
    if (strength < 50) return "bg-orange-500";
    if (strength < 75) return "bg-secondary";
    return "bg-primary";
  };

  const getStrengthText = (strength: number) => {
    if (strength < 25) return "Weak";
    if (strength < 50) return "Fair";
    if (strength < 75) return "Good";
    return "Strong";
  };

  const requirements = [
    { test: (pwd: string) => pwd.length >= 8, text: "At least 8 characters" },
    { test: (pwd: string) => /[a-z]/.test(pwd), text: "One lowercase letter" },
    { test: (pwd: string) => /[A-Z]/.test(pwd), text: "One uppercase letter" },
    { test: (pwd: string) => /[0-9]/.test(pwd), text: "One number" },
    {
      test: (pwd: string) => /[^a-zA-Z0-9]/.test(pwd),
      text: "One special character",
    },
  ];

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-40">
            <Package className="w-20 h-20 text-primary" />
          </div>
          <div className="absolute top-32 right-20">
            <Warehouse className="w-20 h-20 text-secondary" />
          </div>
          <div className="absolute bottom-20 left-60">
            <BarChart3 className="w-20 h-20 text-primary" />
          </div>
          <div className="absolute bottom-32 right-52">
            <Package className="w-20 h-20 text-secondary" />
          </div>
        </div>

        <div className="w-full max-w-md relative">
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg animate-pulse">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Password Reset Successful!
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Your password has been successfully updated. You can now sign in
                with your new password.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-2">
              <div className="text-center space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-green-700 font-medium">
                    Your account is now secure
                  </p>
                  <p className="text-xs text-green-600 mt-1">
                    Remember to keep your password safe
                  </p>
                </div>
              </div>

              <Button
                className="w-full h-11 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => console.log("Navigate to login")}
              >
                <div className="flex items-center space-x-2">
                  <Link href="/auth/login">Continue to Login</Link>
                  <ArrowRight className="w-4 h-4 transition-all duration-300 group-hover:scale-110 group-hover:translate-x-1" />{" "}
                </div>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-10 left-40">
          <Package className="w-20 h-20 text-primary" />
        </div>
        <div className="absolute top-32 right-20">
          <Warehouse className="w-20 h-20 text-secondary" />
        </div>
        <div className="absolute bottom-20 left-60">
          <BarChart3 className="w-20 h-20 text-primary" />
        </div>
        <div className="absolute bottom-32 right-52">
          <Package className="w-20 h-20 text-secondary" />
        </div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Main Card */}
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            {/* Logo/Icon Section */}
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <div className="relative w-8 h-8">
                {/* Gradient background */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary"></div>

                {/* Icon with mask */}
                <KeyRound className="absolute w-full h-full p-1 text-white" />
              </div>{" "}
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Reset Your Password
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              Create a strong new password for your inventory account
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-2">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <Shield className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* New Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your new password"
                            className="pl-10 pr-12 h-11 border-gray-200 focus:border-primary focus:ring-primary"
                            disabled={isLoading}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                            onClick={() => setShowPassword(!showPassword)}
                            disabled={isLoading}
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

                {/* Password Strength Indicator */}
                {password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Password Strength</span>
                      <span
                        className={`font-medium ${
                          passwordStrength < 25
                            ? "text-red-600"
                            : passwordStrength < 50
                            ? "text-orange-600"
                            : passwordStrength < 75
                            ? "text-secondary"
                            : "text-primary"
                        }`}
                      >
                        {getStrengthText(passwordStrength)}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(
                          passwordStrength
                        )}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Password Requirements */}
                {password && (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-gray-700">
                      Password Requirements:
                    </p>
                    <div className="grid grid-cols-1 gap-1">
                      {requirements.map((req, index) => {
                        const isValid = req.test(password);
                        return (
                          <div
                            key={index}
                            className="flex items-center space-x-2 text-xs"
                          >
                            {isValid ? (
                              <Check className="w-3 h-3 text-primary" />
                            ) : (
                              <X className="w-3 h-3 text-gray-400" />
                            )}
                            <span
                              className={
                                isValid ? "text-primary" : "text-gray-500"
                              }
                            >
                              {req.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Confirm New Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm your new password"
                            className="pl-10 pr-12 h-11 border-gray-200 focus:border-primary focus:ring-primary"
                            disabled={isLoading}
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            disabled={isLoading}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-gray-400" />
                            ) : (
                              <Eye className="h-4 w-4 text-gray-400" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                      {confirmPassword &&
                        password &&
                        confirmPassword === password && (
                          <div className="flex items-center space-x-1 text-xs text-primary">
                            <Check className="w-3 h-3" />
                            <span>Passwords match</span>
                          </div>
                        )}
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="group w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 mt-6"
                  disabled={isLoading || passwordStrength < 75}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Resetting Password...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <KeyRound className="w-4 h-4 transition-transform duration-300 group-hover:scale-125 group-hover:translate-x-0.5" />
                      <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                        Reset Password
                      </span>
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

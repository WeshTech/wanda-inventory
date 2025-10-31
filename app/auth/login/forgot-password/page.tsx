"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  ArrowLeft,
  Mail,
  Send,
  CheckCircle,
  Clock,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";
import { ResetPasswordApi } from "@/server/auth/resetPassword";
import {
  ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "@/schemas/auth/forgotPasswordSchema";
import { useRouter } from "next/navigation";

export default function Component() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<"email" | "code" | "password" | "success">(
    "email"
  );
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      code: null,
      password: null,
      confirmPassword: null,
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setError("");

    try {
      // Step 1: Send OTP (email only, code and password set to null)
      if (step === "email") {
        const response = await ResetPasswordApi({
          email: values.email,
          code: null,
          password: null,
        });

        if (response.success && response.code) {
          setStep("code");
        } else {
          setError(response.message || "Failed to send OTP. Please try again.");
        }
      }
      // Step 2: Verify OTP (email + code, password still null)
      else if (step === "code") {
        if (!values.code) {
          setError("Please enter the verification code");
          return;
        }

        const response = await ResetPasswordApi({
          email: values.email,
          code: values.code,
          password: null,
        });

        if (response.success && response.password) {
          setStep("password");
        } else {
          setError(response.message || "Invalid or expired OTP!");
        }
      }
      // Step 3: Update password (email + code + password)
      else if (step === "password") {
        if (!values.password || !values.confirmPassword) {
          setError("Please enter and confirm your new password");
          return;
        }

        if (values.password !== values.confirmPassword) {
          setError("Passwords do not match");
          return;
        }

        const response = await ResetPasswordApi({
          email: values.email,
          code: values.code!,
          password: values.password,
        });

        if (response.success && !response.code && !response.password) {
          setStep("success");
        } else {
          setError(response.message || "Failed to update password.");
        }
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push("/auth/login");
  };

  const handleResendOTP = async () => {
    const email = form.getValues("email");
    if (email) {
      setIsLoading(true);
      setError("");
      try {
        const response = await ResetPasswordApi({
          email,
          code: null,
          password: null,
        });

        if (response.success && response.code) {
          setError(""); // Clear any existing errors
          // Optionally show success message
        } else {
          setError(
            response.message || "Failed to resend OTP. Please try again."
          );
        }
      } catch {
        setError("Failed to resend OTP. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Success Screen - Password Reset Complete
  if (step === "success") {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0 overflow-visible">
          <div className="absolute top-10 left-40">
            <Package className="w-16 h-16 md:w-24 md:h-24 text-primary-600/50" />
          </div>
          <div className="absolute top-32 right-20">
            <Warehouse className="w-16 h-16 md:w-24 md:h-24 text-secondary-600/50" />
          </div>
          <div className="absolute bottom-20 left-60">
            <BarChart3 className="w-16 h-16 md:w-24 md:h-24 text-primary-600/50" />
          </div>
          <div className="absolute bottom-32 right-52">
            <Package className="w-16 h-16 md:w-24 md:h-24 text-secondary-600/50" />
          </div>
        </div>

        <div className="w-full max-w-md relative">
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Password Reset Successful!
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                Your password has been updated successfully. You can now log in
                with your new password.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-2">
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
                  <CheckCircle className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-sm text-primary font-medium">
                    Your account is now secure
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Link href="/auth/login">
                  <Button className="w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white">
                    Continue to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // OTP Verification or Password Reset Screen
  if (step === "code" || step === "password") {
    return (
      <div className="relative min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4">
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0 overflow-visible">
          <div className="absolute top-10 left-40">
            <Package className="w-16 h-16 md:w-24 md:h-24 text-primary-600/50" />
          </div>
          <div className="absolute top-32 right-20">
            <Warehouse className="w-16 h-16 md:w-24 md:h-24 text-secondary-600/50" />
          </div>
          <div className="absolute bottom-20 left-60">
            <BarChart3 className="w-16 h-16 md:w-24 md:h-24 text-primary-600/50" />
          </div>
          <div className="absolute bottom-32 right-52">
            <Package className="w-16 h-16 md:w-24 md:h-24 text-secondary-600/50" />
          </div>
        </div>

        <div className="w-full max-w-md relative">
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                {step === "code" ? (
                  <Mail className="w-8 h-8 text-white" />
                ) : (
                  <Lock className="w-8 h-8 text-white" />
                )}
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                {step === "code"
                  ? "Enter Verification Code"
                  : "Set New Password"}
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                {step === "code"
                  ? "We've sent a 6-digit code to your email address"
                  : "Create a strong password for your account"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-2">
              {step === "code" && (
                <div className="text-center space-y-4">
                  <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-3 border border-primary/20">
                    <Mail className="w-6 h-6 text-primary mx-auto mb-2" />
                    <p className="text-sm text-primary font-medium">
                      Check your email inbox
                    </p>
                    <p className="text-xs text-primary/80 mt-1">
                      {form.getValues("email")}
                    </p>
                  </div>

                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>The code will expire in 10 minutes</span>
                  </div>
                </div>
              )}

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
                  className="space-y-6"
                >
                  {/* OTP Code Field */}
                  {step === "code" && (
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Verification Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Enter 6-digit code"
                              className="h-11 border-gray-200 focus:border-primary focus:ring-primary text-center text-lg tracking-widest"
                              maxLength={6}
                              disabled={isLoading}
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Password Fields */}
                  {step === "password" && (
                    <>
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
                                  placeholder="Enter new password"
                                  className="pl-10 pr-10 h-11 border-gray-200 focus:border-primary focus:ring-primary"
                                  disabled={isLoading}
                                  {...field}
                                  value={field.value || ""}
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                  {showPassword ? (
                                    <EyeOff className="w-4 h-4 text-gray-400" />
                                  ) : (
                                    <Eye className="w-4 h-4 text-gray-400" />
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
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium text-gray-700">
                              Confirm Password
                            </FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                  type={
                                    showConfirmPassword ? "text" : "password"
                                  }
                                  placeholder="Confirm new password"
                                  className="pl-10 pr-10 h-11 border-gray-200 focus:border-primary focus:ring-primary"
                                  disabled={isLoading}
                                  {...field}
                                  value={field.value || ""}
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                  }
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                  {showConfirmPassword ? (
                                    <EyeOff className="w-4 h-4 text-gray-400" />
                                  ) : (
                                    <Eye className="w-4 h-4 text-gray-400" />
                                  )}
                                </button>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="group w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>
                          {step === "code"
                            ? "Verifying..."
                            : "Updating Password..."}
                        </span>
                      </div>
                    ) : (
                      <span>
                        {step === "code" ? "Verify Code" : "Update Password"}
                      </span>
                    )}
                  </Button>
                </form>
              </Form>

              <div className="space-y-3">
                {step === "code" && (
                  <Button
                    onClick={handleResendOTP}
                    variant="outline"
                    className="w-full h-11"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                        <span>Resending...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-4 h-4" />
                        <span>Resend OTP</span>
                      </div>
                    )}
                  </Button>
                )}

                <Button
                  onClick={handleBackToLogin}
                  variant="link"
                  className="w-full h-11 text-gray-600 hover:text-gray-800"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Initial Email Entry Screen
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
              <div className="relative inline-block w-8 h-8">
                {/* Gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full"></div>

                {/* Icon with white fill that will show the gradient beneath */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              No worries! Enter your email address and we&apos;ll send you an
              OTP to reset your password
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
                className="space-y-6"
              >
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input
                            type="email"
                            placeholder="Enter your registered email"
                            className="pl-10 h-11 border-gray-200 focus:border-primary focus:ring-primary"
                            disabled={isLoading}
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="group w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Sending OTP...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="w-4 h-4 transition-all duration-300 group-hover:scale-125" />
                      <span>Send Reset Code</span>
                    </div>
                  )}
                </Button>
              </form>
            </Form>

            {/* Back to Login */}
            <div className="text-center">
              <Link href="/auth/login">
                <Button
                  variant="link"
                  className="text-sm text-gray-600 hover:text-gray-800"
                  disabled={isLoading}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

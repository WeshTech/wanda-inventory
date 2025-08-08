"use client";

import { useState } from "react";
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
  ArrowLeft,
  Mail,
  Send,
  CheckCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";

// Zod schema for email validation
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export default function Component() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setError("");

    try {
      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Sending OTP to:", values.email);
      setIsSuccess(true);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    // Navigate back to login page
    console.log("Navigate to login");
  };

  const handleResendOTP = async () => {
    const email = form.getValues("email");
    if (email) {
      setIsLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log("Resending OTP to:", email);
      } catch (err) {
        setError("Failed to resend OTP. Please try again.");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

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
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                OTP Sent Successfully!
              </CardTitle>
              <CardDescription className="text-gray-600 mt-2">
                We&apos;ve sent a 6-digit verification code to your email
                address
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-2">
              <div className="text-center space-y-4">
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                  <Mail className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
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

              <div className="space-y-3">
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

                <Button
                  onClick={handleBackToLogin}
                  variant="ghost"
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10">
          <Package className="w-8 h-8 text-primary" />
        </div>
        <div className="absolute top-32 right-20">
          <Warehouse className="w-6 h-6 text-secondary" />
        </div>
        <div className="absolute bottom-20 left-20">
          <BarChart3 className="w-7 h-7 text-primary" />
        </div>
        <div className="absolute bottom-32 right-10">
          <Package className="w-5 h-5 text-secondary" />
        </div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Main Card */}
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            {/* Logo/Icon Section */}
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
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
                      <span>Reset Password</span>
                    </div>
                  )}
                </Button>
              </form>
            </Form>

            {/* Back to Login */}
            <div className="text-center">
              <Button
                onClick={handleBackToLogin}
                variant="link"
                className="text-sm text-gray-600 hover:text-gray-800"
                disabled={isLoading}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <Link href="/auth/login"> Back to Login</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

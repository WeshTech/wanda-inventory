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
import { Checkbox } from "@/components/ui/checkbox";
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
  Eye,
  EyeOff,
  Warehouse,
  BarChart3,
  Shield,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { loginSchema, LoginFormValues } from "@/schemas/loginSchema";
import { LoginUser } from "@/server/auth/login";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { InitializeLogin } from "@/server/auth/initializeLogin";

export default function Component() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState<{
    email: string;
    password: string;
    twoFactorCode?: string;
  } | null>(null);

  const router = useRouter();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      twoFactorCode: null,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Step 1: Initial login - send credentials
      if (!showTwoFactor) {
        const result = await InitializeLogin(values);
        console.log(result);

        if (result.success && result.twoFactor) {
          // Show 2FA input
          setShowTwoFactor(true);
          setLoginCredentials({
            email: values.email,
            password: values.password,
            twoFactorCode: undefined,
          });
          setSuccess("2FA code sent. Please check your email.");
          toast.success("2FA code sent!");
        } else if (result.success) {
          // Login successful without 2FA
          toast.success("Login successful!");
          router.replace("/dashboard");
        } else {
          // Login failed
          setError(result.message || "Login failed");
          toast.error(result.message || "Login failed");
        }
      }
      // Step 2: Verify 2FA code
      else {
        const twoFactorCode = form.getValues("twoFactorCode")?.trim();

        if (!loginCredentials || !twoFactorCode) {
          setError("Please enter the 2FA code");
          setIsLoading(false);
          return;
        }

        // Combine credentials with 2FA code
        const loginData = {
          ...loginCredentials,
          twoFactorCode: twoFactorCode,
        };

        const result = await LoginUser(loginData);

        if (result.success) {
          toast.success("Login successful!");
          router.replace("/dashboard");
        } else {
          setError(result.message || "Invalid 2FA code");
          toast.error(result.message || "Invalid 2FA code");
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
      toast.error("An unexpected error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToLogin = () => {
    setShowTwoFactor(false);
    setLoginCredentials(null);
    form.resetField("twoFactorCode", { defaultValue: "" });
    setError("");
    setSuccess("");
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary/20 via-background to-secondary/20 flex items-center justify-center">
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
        <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 shadow-lg">
              <Warehouse className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Wanda Inventory
            </CardTitle>
            <CardDescription className="text-gray-600 mt-2">
              {showTwoFactor
                ? "Enter the 6-digit code from your email"
                : "Sign in to manage your inventory operations."}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-2">
            {error && (
              <Alert variant="destructive" className="border-red-200 bg-red-50">
                <Shield className="h-4 w-4" />
                <AlertDescription className="text-red-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="border-green-200 bg-green-50">
                <Shield className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700">
                  {success}
                </AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* Email & Password (Hidden in 2FA step) */}
                {!showTwoFactor && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Email Address
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="admin@inventory.com"
                              className="h-11 border-gray-200 focus:border-primary focus:ring-primary"
                              disabled={isLoading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Password
                          </FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="pr-12 h-11 border-gray-200 focus:border-primary focus:ring-primary"
                                disabled={isLoading}
                                {...field}
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="group absolute right-0 top-0 h-11 px-3 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                              >
                                {showPassword ? (
                                  <EyeOff className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:scale-125" />
                                ) : (
                                  <Eye className="h-4 w-4 text-gray-400 transition-transform duration-200 group-hover:scale-125" />
                                )}
                              </Button>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rememberMe"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between space-y-0">
                          <div className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                disabled={isLoading}
                              />
                            </FormControl>
                            <FormLabel className="text-sm text-gray-600 cursor-pointer">
                              Remember me
                            </FormLabel>
                          </div>
                          <Button
                            variant="link"
                            className="px-0 text-sm text-primary hover:text-primary"
                            disabled={isLoading}
                            type="button"
                          >
                            <Link href="/auth/login/forgot-password">
                              Forgot password?
                            </Link>
                          </Button>
                        </FormItem>
                      )}
                    />
                  </>
                )}

                {/* 2FA Code Input */}
                {showTwoFactor && (
                  <FormField
                    control={form.control}
                    name="twoFactorCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          2FA Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="000000"
                            maxLength={6}
                            className="h-12 text-center text-xl tracking-widest font-mono"
                            disabled={isLoading}
                            {...field}
                            value={field.value || ""} //  Ensures valid string type
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Submit / Verify Button */}
                <Button
                  type="submit"
                  className="group w-full h-11 bg-gradient-to-r from-primary to-secondary hover:from-primary hover:to-secondary text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>
                        {showTwoFactor ? "Verifying..." : "Signing in..."}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="transition-transform duration-200 group-hover:translate-x-1">
                        {showTwoFactor ? "Verify Code" : "Sign In"}
                      </span>
                      <ArrowRight className="w-4 h-4 transition-all duration-200 group-hover:scale-125 group-hover:translate-x-1" />
                    </div>
                  )}
                </Button>

                {/* Back to Login (in 2FA mode) */}
                {showTwoFactor && (
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleBackToLogin}
                    disabled={isLoading}
                  >
                    Back to Login
                  </Button>
                )}
              </form>
            </Form>

            {/* Registration Link */}
            {!showTwoFactor && (
              <div className="text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-primary hover:underline"
                >
                  Register here
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

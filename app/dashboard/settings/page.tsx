"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  Mail,
  User,
  MapPin,
  Lock,
  Wallet,
  Crown,
  Camera,
} from "lucide-react";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { FullscreenImage } from "./coverImage";
import {
  useAuthBusinessId,
  useAuthStore,
  useAuthUser,
} from "@/stores/authStore";
import { z } from "zod";
import { useBusinessInfo } from "@/server-queries/settingsQueries";
import { CreativeLoading } from "../reports/sales/receipt/[invid]/invoiceLoading";

// Schema
export const passwordChangeSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;

export default function BusinessProfilePage() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Auth state
  const isAuthLoading = useAuthStore((state) => state.isLoading);
  const businessId = useAuthBusinessId();
  const user = useAuthUser();
  const userId = typeof user === "object" && user !== null ? user.userId : "";

  const {
    data: businessResponse,
    isLoading,
    isError,
    error,
    isFetching,
  } = useBusinessInfo({
    businessId: businessId ?? "",
    userId: userId ?? "",
  });

  const businessInfo = businessResponse?.data;

  // Form setup
  const form = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<PasswordChangeFormData> = async (data) => {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.oldPassword !== "oldpassword") {
            reject(new Error("Incorrect old password"));
          } else {
            resolve(true);
          }
        }, 1000);
      });

      toast.success("Password changed successfully");
      setIsChangingPassword(false);
      form.reset();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to change password"
      );
    }
  };

  // === 1. First Load Spinner ===
  if (isLoading && !businessResponse) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <CreativeLoading
          message={
            isAuthLoading
              ? "Performing a quick security check..."
              : "Preparing your business profile"
          }
          subMessage={
            isAuthLoading
              ? "Just a moment while we verify your access..."
              : "Loading your business details..."
          }
          size="lg"
          showDocument={true}
          showParticles={true}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">
              Failed to load business information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {error?.message || "Please try again later."}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!businessInfo) {
    return null;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-KE", {
      year: "numeric",
      month: "long",
    });
  };

  const subscriptionMap: Record<
    string,
    { color: string; description: string }
  > = {
    BASIC: {
      color: "bg-gray-500",
      description: "Essential features for small businesses",
    },
    PROFESSIONAL: {
      color: "bg-blue-600",
      description: "Advanced tools for growing businesses",
    },
    ADVANCED: {
      color: "bg-purple-600",
      description: "Premium features for established companies",
    },
    ENTERPRISE: {
      color: "bg-yellow-600",
      description: "Full suite for large organizations",
    },
  };

  const planInfo = subscriptionMap[businessInfo.currentPlan] || {
    color: "bg-gray-500",
    description: "Unknown plan",
  };

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Optional: Show subtle "updating" indicator during background refetch */}
      {isFetching && !isLoading && (
        <div className="fixed top-4 right-4 z-50 animate-pulse">
          <Badge variant="secondary" className="text-xs">
            Updating...
          </Badge>
        </div>
      )}

      {/* Header Image Section */}
      <div className="relative h-64 bg-gradient-to-r from-primary/20 to-secondary/20 overflow-hidden">
        <FullscreenImage />
        <div className="absolute inset-0 bg-black/40" />

        {/* Logo and Business Name */}
        <div className="absolute bottom-6 left-6 flex items-end gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
              <AvatarImage src="/modern-business-logo-with-tc-letters.jpg" />
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {businessInfo.businessName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="secondary"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
              onClick={() => toast.success("Logo upload coming soon!")}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-white mb-2">
            <h1 className="text-3xl font-bold text-balance">
              {businessInfo.businessName
                ? businessInfo.businessName.charAt(0).toUpperCase() +
                  businessInfo.businessName.slice(1).toLowerCase()
                : ""}
            </h1>
            <p className="text-white/80 text-lg">
              {businessInfo.category
                ? businessInfo.category.charAt(0).toUpperCase() +
                  businessInfo.category.slice(1).toLowerCase()
                : ""}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Main Profile Section */}
            <div className="col-span-1 lg:col-span-2 space-y-6">
              {/* Business Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Business Information
                  </CardTitle>
                  <CardDescription>
                    Your business details are managed securely
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <FormLabel>Business Name</FormLabel>
                      <Input
                        value={businessInfo.businessName}
                        disabled
                        className="bg-muted"
                      />
                    </div>

                    <div className="space-y-1">
                      <FormLabel>Email Address</FormLabel>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={businessInfo.email}
                          disabled
                          className="pl-10 bg-muted"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <FormLabel>Owner Name</FormLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={businessInfo.ownerName}
                          disabled
                          className="pl-10 bg-muted"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <FormLabel>Category</FormLabel>
                      <Input
                        value={businessInfo.category}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Location Information */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Location Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <FormLabel>County</FormLabel>
                        <Input
                          value={businessInfo.county}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                      <div className="space-y-1">
                        <FormLabel>Constituency</FormLabel>
                        <Input
                          value={businessInfo.constituency}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                      <div className="space-y-1">
                        <FormLabel>Ward</FormLabel>
                        <Input
                          value={businessInfo.ward}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Change Section */}
                  {!isChangingPassword ? (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsChangingPassword(true)}
                      className="w-full"
                    >
                      <Lock className="h-4 w-4 mr-2" />
                      Change Password
                    </Button>
                  ) : (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Lock className="h-4 w-4 text-primary" />
                          Change Password
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="password"
                                    placeholder="••••••••"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="password"
                                    placeholder="••••••••"
                                  />
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
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="password"
                                    placeholder="••••••••"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex gap-3 pt-4">
                          <Button type="submit" className="flex-1">
                            Update Password
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setIsChangingPassword(false);
                              form.reset();
                            }}
                            className="flex-1"
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Subscription Status Card */}
              <Card className="shadow-md">
                <CardHeader className="text-center">
                  <CardTitle className="flex items-center justify-center gap-2 text-xl font-bold">
                    <Crown className="h-5 w-5 text-primary" />
                    Subscription Plan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Current Plan
                      </p>
                      <Badge
                        variant="secondary"
                        className={`px-4 py-1 text-md rounded-full ${planInfo.color} text-white`}
                      >
                        {businessInfo.currentPlan}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {planInfo.description}
                    </p>
                    <Button
                      variant="default"
                      className="w-full font-medium"
                      onClick={() =>
                        toast.success("Please contact us for Upgrades")
                      }
                    >
                      Upgrade Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Wallet Balance Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Wallet className="h-5 w-5 text-primary" />
                    Wallet Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div>
                      <p className="text-xl font-bold text-primary">
                        KSh{" "}
                        {businessInfo.walletBalance.toLocaleString("en-KE", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <p className="text-sm text-secondary">
                        Available Balance
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Account Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Member Since
                    </span>
                    <span className="font-semibold">
                      {formatDate(businessInfo.memberSince)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Business ID
                    </span>
                    <span className="font-mono text-xs">{businessId}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

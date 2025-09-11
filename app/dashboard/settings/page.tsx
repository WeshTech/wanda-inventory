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
  Edit3,
  Save,
  Camera,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  businessProfileSchema,
  BusinessProfileFormData,
} from "@/schemas/businessProfileSchema";
import { Badge } from "@/components/ui/badge";
import { FullscreenImage } from "./coverImage";

interface BusinessProfile {
  businessName: string;
  email: string;
  ownerName: string;
  category: string;
  county: string;
  constituency: string;
  ward: string;
  subscription: "BASIC" | "PROFESSIONAL" | "ADVANCED" | "ENTERPRISE";
  walletBalance: number;
}

export default function BusinessProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<BusinessProfile>({
    businessName: "TechCorp Solutions Ltd",
    email: "contact@techcorp.co.ke",
    ownerName: "John Kamau",
    category: "Technology Services",
    county: "Nairobi",
    constituency: "Westlands",
    ward: "Parklands",
    subscription: "PROFESSIONAL",
    walletBalance: 45750.5,
  });

  const form = useForm<BusinessProfileFormData>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      businessName: profile.businessName,
      email: profile.email,
      ownerName: profile.ownerName,
      category: profile.category,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const subscriptionDetails = {
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
      color: "bg-gold-600",
      description: "Full suite for large organizations",
    },
  };

  const onSubmit: SubmitHandler<BusinessProfileFormData> = async (data) => {
    try {
      // Simulate API call to validate old password and update profile
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Mock validation: Assume old password is "oldpassword" for demo
          if (data.oldPassword && data.oldPassword !== "oldpassword") {
            reject(new Error("Invalid old password"));
          } else {
            resolve(true);
          }
        }, 1000);
      });

      // Update profile state
      setProfile((prev) => ({
        ...prev,
        businessName: data.businessName,
        email: data.email,
        ownerName: data.ownerName,
        category: data.category,
      }));

      toast.success("Profile updated successfully");
      setIsEditing(false);
      form.reset({
        businessName: data.businessName,
        email: data.email,
        ownerName: data.ownerName,
        category: data.category,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(
        `Update failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  return (
    <div className="min-h-screen bg-background bg-gradient-to-br from-primary/5 via-background to-secondary/10">
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
                TC
              </AvatarFallback>
            </Avatar>
            <Button
              size="sm"
              variant="secondary"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
              disabled={!isEditing}
            >
              <Camera className="h-4 w-4" />
            </Button>
          </div>
          <div className="text-white mb-2">
            <h1 className="text-3xl font-bold text-balance">
              {profile.businessName}
            </h1>
            <p className="text-white/80 text-lg">{profile.category}</p>
          </div>
        </div>

        {/* Edit Toggle Button */}
        <div className="absolute top-6 right-6">
          <Button
            onClick={() => {
              setIsEditing(!isEditing);
              if (isEditing) form.reset();
            }}
            variant={isEditing ? "secondary" : "outline"}
            className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            {isEditing ? (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            ) : (
              <>
                <Edit3 className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Main Profile Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Business Information Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Business Information
                  </CardTitle>
                  <CardDescription>
                    Manage your business details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="businessName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Business Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={!isEditing}
                              className={!isEditing ? "bg-muted" : ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                {...field}
                                type="email"
                                disabled={!isEditing}
                                className={`pl-10 ${
                                  !isEditing ? "bg-muted" : ""
                                }`}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="ownerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Owner Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input
                                {...field}
                                disabled={!isEditing}
                                className={`pl-10 ${
                                  !isEditing ? "bg-muted" : ""
                                }`}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={!isEditing}
                              className={!isEditing ? "bg-muted" : ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  {/* Location Information (Non-editable) */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      Location Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <FormLabel>County</FormLabel>
                        <Input
                          value={profile.county}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                      <div className="space-y-2">
                        <FormLabel>Constituency</FormLabel>
                        <Input
                          value={profile.constituency}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                      <div className="space-y-2">
                        <FormLabel>Ward</FormLabel>
                        <Input
                          value={profile.ward}
                          disabled
                          className="bg-muted"
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <>
                      <Separator />
                      {/* Password Section */}
                      <div>
                        <h4 className="font-medium mb-3 flex items-center gap-2">
                          <Lock className="h-4 w-4 text-primary" />
                          Update Password
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField
                            control={form.control}
                            name="oldPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Old Password</FormLabel>
                                <FormControl>
                                  <Input
                                    {...field}
                                    type="password"
                                    placeholder="Enter old password"
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
                                    placeholder="Enter new password"
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
                                    placeholder="Confirm new password"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <Button type="submit" className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsEditing(false);
                          form.reset();
                        }}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
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
                    {/* Current Plan */}
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Current Plan
                      </p>
                      <Badge
                        variant="secondary"
                        className="px-4 py-1 text-md rounded-full"
                      >
                        {profile.subscription}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {subscriptionDetails[profile.subscription].description}
                    </p>

                    {/* Action */}
                    <Button variant="default" className="w-full font-medium">
                      Upgrade Plan
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Wallet Balance Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Wallet className="h-5 w-5 text-primary " />
                    Wallet Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div>
                      <p className="text-xl font-bold text-primary">
                        KSh{" "}
                        {profile.walletBalance.toLocaleString("en-KE", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                      <p className="text-sm text-secondary">
                        Available Balance
                      </p>
                    </div>
                    {/* <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        Add Funds
                      </Button>
                      <Button variant="outline" size="sm">
                        Withdraw
                      </Button>
                    </div> */}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Profile Completion
                    </span>
                    <span className="font-semibold text-secondary">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Last Login
                    </span>
                    <span className="font-semibold">Today</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Member Since
                    </span>
                    <span className="font-semibold">Jan 2024</span>
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

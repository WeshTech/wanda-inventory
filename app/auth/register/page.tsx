"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FormData,
  RegisterSchema,
} from "@/schemas/auth/registrationSchema";
import { RegisterUser } from "@/server/auth/register";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PackageSelection from "./package-selection";
import VerificationPage from "./verification-page";
import RegistrationForm from "./registration-form";

export default function RegistrationPage() {
  const [showVerificationStep, setShowVerificationStep] = useState(false);
  const [showPackageStep, setShowPackageStep] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<string>("");
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      businessName: "",
      businessEmail: "",
      businessType: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
      country: "",
      county: "",
      constituency: "",
      ward: "",
      terms: false,
    },
  });

  const handleInitialSubmit = async (data: FormData) => {
    try {
      const response = await RegisterUser(data);
      console.log("Registration response:", response);

      if (response.verification === true) {
        toast.success(response.message);
        setShowVerificationStep(true);
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    }
  };

  const handleVerificationSubmit = async (code: string) => {
    try {
      const data = form.getValues();
      const response = await RegisterUser({
        ...data,
        code,
      });

      if (response.package === true) {
        toast.success("Verification successful! Please select a package.");
        setShowPackageStep(true);
        setShowVerificationStep(false);
      } else if (response.status === true) {
        toast.success(response.message || "Registration successful!");
        router.replace("/auth/login");
      } else {
        toast.error(response.message || "Verification failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    }
  };

  const handlePackageConfirm = async (packageId: string) => {
    try {
      const data = form.getValues();
      const response = await RegisterUser({
        ...data,
        subscriptionPackage: packageId,
      });

      if (response.status === true) {
        toast.success(response.message || "Registration successful!");
        router.replace("/auth/login");
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error(error);
    }
  };

  const handleBackToVerification = () => {
    setShowPackageStep(false);
    setShowVerificationStep(true);
  };

  if (showPackageStep) {
    return (
      <PackageSelection
        selectedPackage={selectedPackage}
        onPackageSelect={setSelectedPackage}
        onConfirm={handlePackageConfirm}
        onBack={handleBackToVerification}
        isSubmitting={form.formState.isSubmitting}
      />
    );
  }

  if (showVerificationStep) {
    return (
      <VerificationPage
        onSubmit={handleVerificationSubmit}
        onResendCode={() => handleInitialSubmit(form.getValues())}
        isSubmitting={form.formState.isSubmitting}
      />
    );
  }

  return (
    <RegistrationForm
      form={form}
      onSubmit={handleInitialSubmit}
      isSubmitting={form.formState.isSubmitting}
    />
  );
}

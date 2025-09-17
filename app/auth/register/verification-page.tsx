"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import { Package, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import toast from "react-hot-toast";

const images = [
  "/images/pharmacy.jpg",
  "/images/supermarket.jpg",
  "/images/warehouse.jpg",
];

interface VerificationPageProps {
  onSubmit: (code: string) => Promise<void>;
  onBack: () => void;
  onResendCode: () => Promise<void>;
  isSubmitting: boolean;
}

export default function VerificationPage({
  onSubmit,
  onBack,
  onResendCode,
  isSubmitting,
}: VerificationPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = verificationCode.join("");
    if (code.length !== 6) {
      toast.error("Please enter a 6-digit code.");
      return;
    }
    await onSubmit(code);
  };

  const isVerificationCodeComplete = verificationCode.every(
    (digit) => digit !== ""
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 rounded-xl flex m-2">
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
              Verify Your Email
            </h2>

            <p className="text-xl mb-8 text-gray-200">
              {"We've sent a 6-digit verification code to your email address."}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full mx-2 my-2 sm:mx-3 sm:my-3 md:mx-4 md:my-4 lg:mx-5 lg:my-5">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4 lg:hidden">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary" />
              </div>
            </div>
            <CardTitle className="flexify gap-3 text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Verify Your Email
            </CardTitle>
            <CardDescription className="text-muted-foreground m-2">
              Enter the 6-digit code sent to your email address.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                      disabled={isSubmitting}
                    />
                  ))}
                </div>

                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {"Didn't receive the code?"}
                  </p>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onResendCode}
                    disabled={isSubmitting}
                    className="text-sm"
                  >
                    Resend verification code
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className={`w-full ${
                  isSubmitting
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                size="lg"
                disabled={isSubmitting || !isVerificationCodeComplete}
              >
                {isSubmitting ? "Verifying..." : "Verify Email"}
              </Button>

              <div className="flex items-center justify-center">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-sm text-muted-foreground"
                  onClick={onBack}
                >
                  ← Back to registration
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

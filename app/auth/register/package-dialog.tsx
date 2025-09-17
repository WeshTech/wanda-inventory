"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Package, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface PackagePlan {
  id: string;
  name: string;
  price: string;
  currency: string;
  period: string;
  description: string;
  popular: boolean;
  features: {
    icon: React.ComponentType<{ className?: string }>;
    text: string;
  }[];
}

export interface PackageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan: PackagePlan | undefined;
  onConfirm: () => Promise<void>;
}

export default function PackageDialog({
  open,
  onOpenChange,
  selectedPlan,
  onConfirm,
}: PackageDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Confirm Your Package Selection
          </AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <p>You have selected the following package:</p>
              {selectedPlan && (
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-lg">
                      {selectedPlan.name}
                    </h4>
                    {selectedPlan.popular && (
                      <Badge variant="secondary" className="text-xs">
                        Most Popular
                      </Badge>
                    )}
                  </div>
                  <div className="mb-3">
                    {selectedPlan.price === "Custom" ? (
                      <span className="text-2xl font-bold">Custom Pricing</span>
                    ) : (
                      <span className="text-2xl font-bold">
                        {selectedPlan.currency} {selectedPlan.price}
                        <span className="text-sm font-normal text-muted-foreground">
                          /{selectedPlan.period}
                        </span>
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {selectedPlan.description}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Features:</p>
                    <ul className="text-sm space-y-1">
                      {selectedPlan.features
                        .slice(0, 4)
                        .map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-primary" />
                            {feature.text}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              )}
              <p className="text-sm">
                Are you sure you want to proceed with this package? You can
                change your plan later from your dashboard.
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-primary hover:bg-primary/90"
          >
            Yes, Complete Registration
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

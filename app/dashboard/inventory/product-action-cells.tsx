"use client"; // This is a Client Component

import { useState } from "react";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash2, EyeOff } from "lucide-react";
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

interface ProductActionsCellProps {
  product: Product;
}

export function ProductActionsCell({ product }: ProductActionsCellProps) {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"hide" | "delete" | null>(null);

  // Handles opening the alert dialog for hide/delete actions
  const handleActionClick = (action: "hide" | "delete") => {
    setActionType(action);
    setIsAlertDialogOpen(true);
  };

  // Handles confirming the action in the alert dialog
  const handleConfirmAction = () => {
    if (actionType) {
      console.log(`${actionType} product:`, product.name);
      // In a real application, you would send a request to your backend here
      // e.g., using a Server Action or an API route to update/delete the product
      // After successful action, you might want to refresh the page data:
      // router.refresh(); // if using Next.js router
    }
    setIsAlertDialogOpen(false);
    setActionType(null);
  };

  return (
    <div className="text-right">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <MoreHorizontal className="w-4 h-4" />
            <span className="sr-only">Actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleActionClick("hide")}>
            <EyeOff className="w-4 h-4 mr-2" />
            Hide Product
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleActionClick("delete")}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Product
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Confirmation Alert Dialog for Hide/Delete Actions */}
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to {actionType} &quot;{product.name}&quot;?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently {actionType}{" "}
              the product from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction}>
              {actionType === "delete" ? "Delete" : "Hide"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

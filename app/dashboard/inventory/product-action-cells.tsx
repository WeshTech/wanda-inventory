"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import toast from "react-hot-toast";

interface ProductActionsCellProps {
  product: Product;
}

export function ProductActionsCell({ product }: ProductActionsCellProps) {
  const [isAlertDialogOpen, setIsAlertDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<"delete" | null>(null);

  // Handles opening the alert dialog for delete action
  const handleActionClick = (action: "delete") => {
    setActionType(action);
    setIsAlertDialogOpen(true);
  };

  // Handles confirming the delete action
  const handleConfirmAction = () => {
    if (actionType) {
      toast.error(`We do not allow deleting products yet!`);
    }
    setIsAlertDialogOpen(false);
    setActionType(null);
  };

  // Handles direct view action
  const handleViewProduct = () => {
    console.log("Viewing product:", product.name);
  };

  return (
    <div className="flex justify-end gap-3">
      <TooltipProvider>
        {/* View Product Icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleViewProduct}
              className="w-8 h-8"
            >
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span className="sr-only">View Product</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>View Product</p>
          </TooltipContent>
        </Tooltip>

        {/* Delete Icon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleActionClick("delete")}
              className="w-8 h-8 hover:bg-red-200"
            >
              <Trash2 className="w-4 h-4 text-destructive" />
              <span className="sr-only">Delete Product</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Delete Product</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Confirmation Dialog (only for delete) */}
      <AlertDialog open={isAlertDialogOpen} onOpenChange={setIsAlertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete “{product.name}”?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove the
              product from your inventory.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            {/* Render the actual Button as the Action using asChild so classes apply */}
            <AlertDialogAction asChild>
              <Button
                onClick={handleConfirmAction}
                className="bg-red-200 text-red-800 hover:bg-red-300 focus-visible:ring-2 focus-visible:ring-red-400 transition-colors"
              >
                Delete
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

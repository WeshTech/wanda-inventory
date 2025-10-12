"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Search } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSearchStoreProducts } from "@/server-queries/storeProductQueries";
import { useGetBusinessStores } from "@/server-queries/storeQueries";

interface CreateTransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormData {
  searchTerm: string;
  productCode: string;
  productName: string;
  fromStore: string;
  toStore: string;
  quantity: string;
  notes: string;
}

const BUSINESS_ID = "68ce994dfba92cd4362e1abd";
const BUSINESS_USER_ID = "0bb76180-080d-4cd4-af6e-a8a6d772f477";
const STORE_ID = "527c51bf-3a90-4873-86c4-f33dc4f60cb5";

export function CreateTransferDialog({
  open,
  onOpenChange,
}: CreateTransferDialogProps) {
  const [formData, setFormData] = useState<FormData>({
    searchTerm: "",
    productCode: "",
    productName: "",
    fromStore: "",
    toStore: "",
    quantity: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedProductImage, setSelectedProductImage] = useState<
    string | undefined
  >();

  const { data: businessStoresData, isLoading: isLoadingStores } =
    useGetBusinessStores();

  const stores = useMemo(() => {
    return (
      businessStoresData?.data?.stores?.map((store) => ({
        value: store.id,
        label: store.name,
      })) || []
    );
  }, [businessStoresData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(formData.searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.searchTerm]);

  const { data: searchResults, isLoading: isSearching } =
    useSearchStoreProducts({
      businessId: BUSINESS_ID,
      businessUserId: BUSINESS_USER_ID,
      storeId: STORE_ID,
      searchTerm: debouncedSearchTerm,
    });

  const products = useMemo(
    () => searchResults?.data || [],
    [searchResults?.data]
  );

  useEffect(() => {
    if (formData.productCode || formData.productName) {
      const selectedProduct = products.find(
        (p) =>
          p.productCode === formData.productCode ||
          p.productName === formData.productName
      );
      setSelectedProductImage(selectedProduct?.imageUrl);
    } else {
      setSelectedProductImage(undefined);
    }
  }, [formData.productCode, formData.productName, products]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    if (field === "searchTerm" && value.length > 50) return;
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.productCode.trim())
      newErrors.productCode = "Product code is required";
    if (!formData.productName.trim())
      newErrors.productName = "Product name is required";
    if (!formData.fromStore) newErrors.fromStore = "From store is required";
    if (!formData.toStore) newErrors.toStore = "To store is required";
    if (formData.fromStore === formData.toStore && formData.fromStore) {
      newErrors.fromStore = "From and To stores must be different";
      newErrors.toStore = "From and To stores must be different";
    }
    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    } else {
      const q = Number(formData.quantity);
      if (isNaN(q) || q <= 0) newErrors.quantity = "Quantity must be positive";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const resetForm = () => {
    setFormData({
      searchTerm: "",
      productCode: "",
      productName: "",
      fromStore: "",
      toStore: "",
      quantity: "",
      notes: "",
    });
    setErrors({});
    setSelectedProductImage(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // mock delay
    resetForm();
    setIsSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[95vh] overflow-y-auto lg:overflow-visible">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Single Transfer
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onOpenChange(false)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Search product by name to get started
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Search field */}
          <div className="space-y-2">
            <Label htmlFor="search" className="text-sm font-medium">
              Search Product
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="search"
                placeholder="Type to search products..."
                value={formData.searchTerm}
                onChange={(e) =>
                  handleInputChange("searchTerm", e.target.value)
                }
                maxLength={50}
                className="pl-9"
              />
              {isSearching && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  Searching...
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {formData.searchTerm.length}/50 characters
            </p>
          </div>

          {/* Responsive Grid Section */}
          <div
            className="
              grid grid-cols-1 
              md:grid-cols-[1.3fr_0.7fr] 
              lg:grid-cols-3 
              gap-6
            "
          >
            {/* LEFT SECTION (Product info & Stores) */}
            <div className="space-y-4 lg:col-span-2 md:col-span-1">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Product Code */}
                <div className="space-y-2">
                  <Label htmlFor="productCode" className="text-sm font-medium">
                    Product Code *
                  </Label>
                  <Select
                    value={formData.productCode}
                    onValueChange={(value) => {
                      handleInputChange("productCode", value);
                      const product = products.find(
                        (p) => p.productCode === value
                      );
                      if (product)
                        handleInputChange("productName", product.productName);
                    }}
                    disabled={products.length === 0}
                  >
                    <SelectTrigger
                      className={errors.productCode ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select product code" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem
                          key={product.storeProductId}
                          value={product.productCode}
                        >
                          {product.productCode}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.productCode && (
                    <p className="text-sm text-red-500">{errors.productCode}</p>
                  )}
                </div>

                {/* Product Name */}
                <div className="space-y-2">
                  <Label htmlFor="productName" className="text-sm font-medium">
                    Product Name *
                  </Label>
                  <Select
                    value={formData.productName}
                    onValueChange={(value) => {
                      handleInputChange("productName", value);
                      const product = products.find(
                        (p) => p.productName === value
                      );
                      if (product)
                        handleInputChange("productCode", product.productCode);
                    }}
                    disabled={products.length === 0}
                  >
                    <SelectTrigger
                      className={errors.productName ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select product name" />
                    </SelectTrigger>
                    <SelectContent>
                      {products.map((product) => (
                        <SelectItem
                          key={product.storeProductId}
                          value={product.productName}
                        >
                          {product.productName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.productName && (
                    <p className="text-sm text-red-500">{errors.productName}</p>
                  )}
                </div>
              </div>

              {/* Store Selectors */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromStore" className="text-sm font-medium">
                    From Store *
                  </Label>
                  <Select
                    value={formData.fromStore}
                    onValueChange={(value) =>
                      handleInputChange("fromStore", value)
                    }
                    disabled={isLoadingStores}
                  >
                    <SelectTrigger
                      className={errors.fromStore ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select source store" />
                    </SelectTrigger>
                    <SelectContent>
                      {stores
                        .filter((store) => store.value !== formData.toStore) // Exclude the selected "To Store"
                        .map((store) => (
                          <SelectItem key={store.value} value={store.value}>
                            {store.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {errors.fromStore && (
                    <p className="text-sm text-red-500">{errors.fromStore}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="toStore" className="text-sm font-medium">
                    To Store *
                  </Label>
                  <Select
                    value={formData.toStore}
                    onValueChange={(value) =>
                      handleInputChange("toStore", value)
                    }
                    disabled={isLoadingStores}
                  >
                    <SelectTrigger
                      className={errors.toStore ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select destination store" />
                    </SelectTrigger>
                    <SelectContent>
                      {stores
                        .filter((store) => store.value !== formData.fromStore) // Exclude the selected "From Store"
                        .map((store) => (
                          <SelectItem key={store.value} value={store.value}>
                            {store.label}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  {errors.toStore && (
                    <p className="text-sm text-red-500">{errors.toStore}</p>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT SECTION (Product Image) */}
            <div className="flex flex-col items-center justify-start gap-2 md:items-end lg:items-center">
              <Label className="text-sm font-medium self-start lg:self-center">
                Product Image
              </Label>
              <Avatar className="h-32 w-32 rounded-lg shadow-md">
                <AvatarImage
                  src={selectedProductImage || "/images/noimagefound.jpg"}
                  alt="Product"
                  className="object-cover"
                />
                <AvatarFallback className="rounded-lg">No Image</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium">
              Quantity *
            </Label>
            <Input
              id="quantity"
              placeholder="Enter quantity"
              value={formData.quantity}
              onChange={(e) => handleInputChange("quantity", e.target.value)}
              className={errors.quantity ? "border-red-500" : ""}
            />
            {errors.quantity && (
              <p className="text-sm text-red-500">{errors.quantity}</p>
            )}
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-sm font-medium">
              Notes
            </Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes or instructions..."
              className="resize-none"
              rows={3}
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 pt-4 mb-4">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={resetForm}
              disabled={isSubmitting}
            >
              Reset
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="rounded-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Transfer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

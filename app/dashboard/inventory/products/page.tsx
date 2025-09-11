"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Scan, Type } from "lucide-react";
import Image from "next/image";
import { ComboBox } from "@/components/ui/combobox";
import { AddSupplierDialog } from "./add-supplier-dialog";
import { AddStoreDialog } from "./add-store-dialog";
import { AddCategoryDialog } from "./add-category-dialog";
import toast from "react-hot-toast";

// Zod schema for form validation
const inventorySchema = z.object({
  productType: z.enum(["global", "custom"]),
  barcode: z.string().min(1, "Barcode is required"),
  scanType: z.enum(["scan", "type"]),
  name: z.string().min(1, "Product name is required"),
  brand: z.string().min(1, "Brand is required"),
  unit: z.string().min(1, "Unit is required"),
  supplier: z.string().min(1, "Supplier is required"),
  store: z.string().min(1, "Store is required"),
  category: z.string().min(1, "Category is required"),
  buyingPrice: z.number().min(0, "Buying price must be positive"),
  sellingPrice: z.number().min(0, "Selling price must be positive"),
  minStockLevel: z.number().min(0, "Min stock level must be positive"),
  image: z.string().optional(),
  description: z.string().optional(),
  isCustom: z.boolean(),
});

type InventoryFormData = z.infer<typeof inventorySchema>;

// Mock data - replace with actual API calls
const mockSuppliers = [
  { value: "supplier1", label: "ABC Suppliers Ltd" },
  { value: "supplier2", label: "XYZ Trading Co" },
  { value: "supplier3", label: "Global Distributors" },
];

const mockStores = [
  { value: "store1", label: "Main Store" },
  { value: "store2", label: "Warehouse A" },
  { value: "store3", label: "Branch Store" },
];

const mockCategories = [
  { value: "category1", label: "Electronics" },
  { value: "category2", label: "Clothing" },
  { value: "category3", label: "Food & Beverages" },
];

const commonUnits = [
  "Piece",
  "Kilogram",
  "Gram",
  "Liter",
  "Milliliter",
  "Meter",
  "Centimeter",
  "Box",
  "Pack",
  "Dozen",
  "Carton",
  "Bottle",
  "Can",
  "Bag",
  "Roll",
];

export default function AddInventoryPage() {
  const [productType, setProductType] = useState<"global" | "custom">("global");
  const [scanType, setScanType] = useState<"scan" | "type">("scan");
  const [barcodeInput, setBarcodeInput] = useState("");
  const [debouncedBarcode, setDebouncedBarcode] = useState("");
  const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
  const [isStoreDialogOpen, setIsStoreDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [productImage, setProductImage] = useState<string>("/imagenotset.jpg");

  const form = useForm<InventoryFormData>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
      productType: "global",
      scanType: "scan",
      barcode: "",
      name: "",
      brand: "",
      unit: "",
      supplier: "",
      store: "",
      category: "",
      buyingPrice: 0,
      sellingPrice: 0,
      minStockLevel: 0,
      image: "",
      description: "",
      isCustom: false,
    },
  });

  // Debounce barcode input when typing
  useEffect(() => {
    if (scanType === "type") {
      const timer = setTimeout(() => {
        setDebouncedBarcode(barcodeInput);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setDebouncedBarcode(barcodeInput);
    }
  }, [barcodeInput, scanType]);

  // Simulate global product lookup
  useEffect(() => {
    if (debouncedBarcode && productType === "global") {
      // Simulate API call to global database
      const mockGlobalProduct = {
        name: "Sample Product",
        brand: "Sample Brand",
        unit: "Piece",
        image: "/imagenotset.jpg",
      };

      // Simulate product found/not found
      const productFound = Math.random() > 0.5;

      if (productFound) {
        form.setValue("name", mockGlobalProduct.name);
        form.setValue("brand", mockGlobalProduct.brand);
        form.setValue("unit", mockGlobalProduct.unit);
        setProductImage(mockGlobalProduct.image);
        form.setValue("isCustom", false);
      } else {
        // Switch to custom mode if product not found
        setProductType("custom");
        form.setValue("productType", "custom");
        form.setValue("name", "");
        form.setValue("brand", "");
        form.setValue("unit", "");
        form.setValue("isCustom", true);
        setProductImage("/imagenotset.jpg");
      }
    }
  }, [debouncedBarcode, productType, form]);

  const onSubmit: SubmitHandler<InventoryFormData> = (data) => {
    console.log("Form submitted:", data);
    toast.success("Product submitted!!!");
    // Handle form submission
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="container mx-auto p-6 max-w-5xl bg-transparent/10">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Add Inventory Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Product Type Selection */}
              <div className="flex gap-6 justify-center mb-8">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="global"
                    checked={productType === "global"}
                    onCheckedChange={() => {
                      setProductType("global");
                      form.setValue("productType", "global");
                      form.setValue("isCustom", false);
                    }}
                    className="rounded-full"
                  />
                  <Label htmlFor="global" className="font-medium">
                    Global Product
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="custom"
                    checked={productType === "custom"}
                    onCheckedChange={() => {
                      setProductType("custom");
                      form.setValue("productType", "custom");
                      form.setValue("isCustom", true);
                    }}
                    className="rounded-full"
                  />
                  <Label htmlFor="custom" className="font-medium">
                    Customize Product
                  </Label>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Form Fields */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Barcode Field */}
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input
                      id="barcode"
                      type="text"
                      value={barcodeInput}
                      onChange={(e) => {
                        setBarcodeInput(e.target.value);
                        form.setValue("barcode", e.target.value);
                      }}
                      placeholder="Enter or scan barcode"
                    />
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="scan"
                          checked={scanType === "scan"}
                          onCheckedChange={() => {
                            setScanType("scan");
                            form.setValue("scanType", "scan");
                          }}
                          className="rounded-full"
                        />
                        <Label
                          htmlFor="scan"
                          className="flex items-center gap-1"
                        >
                          <Scan className="w-4 h-4" />
                          Scan
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="type"
                          checked={scanType === "type"}
                          onCheckedChange={() => {
                            setScanType("type");
                            form.setValue("scanType", "type");
                          }}
                          className="rounded-full"
                        />
                        <Label
                          htmlFor="type"
                          className="flex items-center gap-1"
                        >
                          <Type className="w-4 h-4" />
                          Type
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      {...form.register("name")}
                      placeholder="Enter product name"
                    />
                    {form.formState.errors.name && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Brand Field */}
                  <div className="space-y-2">
                    <Label htmlFor="brand">Brand</Label>
                    <Input
                      id="brand"
                      {...form.register("brand")}
                      placeholder="Enter brand name"
                    />
                    {form.formState.errors.brand && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.brand.message}
                      </p>
                    )}
                  </div>

                  {/* Unit Field */}
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select
                      onValueChange={(value) => form.setValue("unit", value)}
                    >
                      <SelectTrigger className="w-1/2">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {commonUnits.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.unit && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.unit.message}
                      </p>
                    )}
                  </div>

                  {/* Supplier Field */}
                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <ComboBox
                          options={mockSuppliers}
                          placeholder="suppliers..."
                          onSelect={(value) => form.setValue("supplier", value)}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setIsSupplierDialogOpen(true)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {form.formState.errors.supplier && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.supplier.message}
                      </p>
                    )}
                  </div>

                  {/* Store Field */}
                  <div className="space-y-2">
                    <Label htmlFor="store">Store</Label>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <ComboBox
                          options={mockStores}
                          placeholder="stores..."
                          onSelect={(value) => form.setValue("store", value)}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setIsStoreDialogOpen(true)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {form.formState.errors.store && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.store.message}
                      </p>
                    )}
                  </div>

                  {/* Category Field */}
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <ComboBox
                          options={mockCategories}
                          placeholder="categories..."
                          onSelect={(value) => form.setValue("category", value)}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setIsCategoryDialogOpen(true)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    {form.formState.errors.category && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.category.message}
                      </p>
                    )}
                  </div>

                  {/* Price Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="buyingPrice">Buying Price</Label>
                      <Input
                        id="buyingPrice"
                        type="number"
                        step="0.01"
                        {...form.register("buyingPrice", {
                          valueAsNumber: true,
                        })}
                        placeholder="0.00"
                      />
                      {form.formState.errors.buyingPrice && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.buyingPrice.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sellingPrice">Selling Price</Label>
                      <Input
                        id="sellingPrice"
                        type="number"
                        step="0.01"
                        {...form.register("sellingPrice", {
                          valueAsNumber: true,
                        })}
                        placeholder="0.00"
                      />
                      {form.formState.errors.sellingPrice && (
                        <p className="text-sm text-destructive">
                          {form.formState.errors.sellingPrice.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Min Stock Level */}
                  <div className="space-y-2">
                    <Label htmlFor="minStockLevel">Minimum Stock Level</Label>
                    <Input
                      id="minStockLevel"
                      type="number"
                      {...form.register("minStockLevel", {
                        valueAsNumber: true,
                      })}
                      placeholder="0"
                    />
                    {form.formState.errors.minStockLevel && (
                      <p className="text-sm text-destructive">
                        {form.formState.errors.minStockLevel.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Column - Product Image */}
                <div className="space-y-4">
                  <Label>Product Image</Label>
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-48 h-48 border-2 border-dashed border-border rounded-lg overflow-hidden">
                      <Image
                        src={productImage || "/placeholder.svg"}
                        alt="Product preview"
                        fill
                        className="object-cover rounded-lg"
                        onError={() => setProductImage("/imagenotset.jpg")}
                      />
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setProductImage(url);
                          form.setValue("image", url);
                        }
                      }}
                      className="max-w-48"
                    />
                  </div>

                  {/* Description Field */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      {...form.register("description")}
                      placeholder="Enter product description (optional)"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <Button type="submit" className="px-8">
                  Add Product
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Dialogs */}
        <AddSupplierDialog
          open={isSupplierDialogOpen}
          onOpenChange={setIsSupplierDialogOpen}
        />
        <AddStoreDialog
          open={isStoreDialogOpen}
          onOpenChange={setIsStoreDialogOpen}
        />
        <AddCategoryDialog
          open={isCategoryDialogOpen}
          onOpenChange={setIsCategoryDialogOpen}
        />
      </div>
    </div>
  );
}

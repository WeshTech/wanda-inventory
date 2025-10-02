"use client";

import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Plus, Scan, Search, Type } from "lucide-react";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ComboBox } from "@/components/ui/combobox";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";
import { useBusinessSuppliersQuery } from "@/server-queries/supplierQueries";
import { useGetBusinessStores } from "@/server-queries/storeQueries";
import { useStoreCategories } from "@/server-queries/storeCategoryQueries";
import {
  InventoryFormData,
  inventorySchema,
} from "@/schemas/inventory/add-inventory";
import { commonUnits } from "./commonUnits";
import { AddSupplierDialog } from "../../suppliers/add-suppler-dialog";
import { CreateStoreDialog } from "../../stores/create-store-dialog";
import { AddCategoryDialog } from "../../category/add-category-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  useCreateBusinessProduct,
  useFindProductByBarcode,
} from "@/server-queries/inventoryQueries";
import { CreateBusinessProductResponse } from "@/types/inventory";

// Define types
export type FoundAtType = "catalogue" | "business";

export type FoundProductData = {
  id: string;
  description: string;
  brand: string;
  imageUrl: string;
  unit: string;
};

export interface FindProductByBarcodeResponse {
  success: boolean;
  foundAt: FoundAtType | null;
  data: FoundProductData | null;
}

export default function AddInventoryPage() {
  const { user } = useAuthStore();
  const businessId = user?.businessId || "";

  const { data: suppliersData } = useBusinessSuppliersQuery(businessId);
  const { data: storesQuery } = useGetBusinessStores();
  const { data: categoriesData } = useStoreCategories(businessId);

  const suppliers = suppliersData?.data || [];
  const stores = storesQuery?.data?.stores || [];
  const categories = categoriesData?.data || [];

  const suppliersOptions = suppliers.map((s) => ({
    value: s.supplierId,
    label: s.name,
  }));

  const storesOptions = stores.map((s) => ({
    value: s.id,
    label: `${s.name} - ${s.ward}`,
  }));

  const categoriesOptions = categories.map((c) => ({
    value: c.categoryId,
    label: c.name,
  }));

  const [scanType, setScanType] = useState<"scan" | "type">("scan");
  const [isSupplierDialogOpen, setIsSupplierDialogOpen] = useState(false);
  const [isStoreDialogOpen, setIsStoreDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [productImage, setProductImage] = useState<string>("/imagenotset.jpg");
  const [barcodeToCheck, setBarcodeToCheck] = useState<string>("");
  const [queryEnabled, setQueryEnabled] = useState(false);
  const [productData, setProductData] =
    useState<FindProductByBarcodeResponse | null>(null);

  const form = useForm<InventoryFormData>({
    resolver: zodResolver(inventorySchema),
    defaultValues: {
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
      quantity: 1,
      image: "",
      description: "",
    },
  });

  // Use the hook at the top level of the component
  const { data, isLoading, error, refetch } = useFindProductByBarcode(
    businessId,
    barcodeToCheck,
    queryEnabled
  );

  // Initialize the mutation hook
  const { mutate, isPending } = useCreateBusinessProduct();

  // Handle query results with useEffect
  useEffect(() => {
    if (isLoading) {
      toast.loading("Checking product...", { id: "checkProduct" });
    } else {
      toast.dismiss("checkProduct");
    }

    if (error) {
      toast.error("Product not found");
      setQueryEnabled(false);
      return;
    }

    if (data?.success && data.data) {
      // Populate form fields with product data
      setProductData(data);
      form.setValue("foundAt", data.foundAt || undefined);
      form.setValue("id", data.data.id || "");
      form.setValue("name", data.data.name || "");
      form.setValue("brand", data.data.brand || "");
      form.setValue("unit", data.data.unit || "");
      form.setValue("description", data.data.description || "");
      form.setValue("image", data.data.imageUrl || "");
      setProductImage(data.data.imageUrl || "/imagenotset.jpg");
      toast.success("Product found and fields populated!");
      setQueryEnabled(false);
    } else if (data && !data.success) {
      toast.error("Product not found");
      setQueryEnabled(false);
    }
  }, [data, isLoading, error, form]);

  // Function to handle product check
  const checkProduct = () => {
    const barcode = form.getValues("barcode");
    if (!barcode) {
      toast.error("Please enter a barcode");
      return;
    }

    setBarcodeToCheck(barcode);
    setQueryEnabled(true);
    refetch();
  };

  const onSubmit: SubmitHandler<InventoryFormData> = (data) => {
    console.log({ productData });
    console.log("Form submitted:", data);
    toast.loading("Adding product...", { id: "addProduct" });

    mutate(
      { formData: data, businessId },
      {
        onSuccess: (response: CreateBusinessProductResponse) => {
          if (response.success) {
            toast.dismiss("addProduct");
            toast.success("Product added successfully!");
            setProductData(null);
            form.reset();
            setProductImage("/imagenotset.jpg");
          } else {
            toast.dismiss("addProduct");
            toast.error(response.message || "Failed to add product");
          }
        },
        onError: (error) => {
          toast.error(`${error.message}` || `Failed to add product`);
        },
      }
    );
  };

  return (
    <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="container mx-auto p-6 max-w-5xl bg-transparent/40">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">
              Add Inventory Product
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - Form Fields */}
                  <div className="lg:col-span-2 space-y-4">
                    <FormField
                      control={form.control}
                      name="barcode"
                      disabled={isPending}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Barcode</FormLabel>
                          <FormControl>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Input
                                  type="text"
                                  autoFocus
                                  placeholder="Enter or scan barcode"
                                  {...field}
                                />
                                {scanType === "type" && (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-1"
                                        onClick={checkProduct}
                                      >
                                        <Search className="w-3 h-3" />
                                        <Type className="w-3 h-3" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      Check if product exists
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>

                              {/* Scan / Type Mode Toggle */}
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      disabled={isPending}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Name</FormLabel>
                          <FormControl>
                            <Input
                              id="name"
                              placeholder="Enter product name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Brand Field */}
                    <FormField
                      control={form.control}
                      name="brand"
                      disabled={isPending}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand</FormLabel>
                          <FormControl>
                            <Input
                              id="brand"
                              placeholder="Enter brand name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Unit Field */}
                    <FormField
                      control={form.control}
                      name="unit"
                      disabled={isPending}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Unit</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Supplier Field */}
                    <FormField
                      control={form.control}
                      name="supplier"
                      disabled={isPending}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Supplier</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <div className="w-3/4">
                                <ComboBox
                                  options={suppliersOptions}
                                  placeholder="select a supplier..."
                                  onSelect={(value) => field.onChange(value)}
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Store Field */}
                    <FormField
                      control={form.control}
                      name="store"
                      disabled={isPending}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Store</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <div className="w-3/4">
                                <ComboBox
                                  options={storesOptions}
                                  placeholder="select a store..."
                                  onSelect={(value) => field.onChange(value)}
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Category Field */}
                    <FormField
                      control={form.control}
                      name="category"
                      disabled={isPending}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <div className="flex gap-2">
                              <div className="w-3/4">
                                <ComboBox
                                  options={categoriesOptions}
                                  placeholder="select a category..."
                                  onSelect={(value) => field.onChange(value)}
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Price Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="buyingPrice"
                        disabled={isPending}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Buying Price</FormLabel>
                            <FormControl>
                              <Input
                                id="buyingPrice"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="sellingPrice"
                        disabled={isPending}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Selling Price</FormLabel>
                            <FormControl>
                              <Input
                                id="sellingPrice"
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="quantity"
                        disabled={isPending}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Available quantity</FormLabel>
                            <FormControl>
                              <Input
                                id="quantity"
                                type="number"
                                placeholder="0"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value) || 0)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Min Stock Level */}
                      <FormField
                        control={form.control}
                        name="minStockLevel"
                        disabled={isPending}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Stock Level</FormLabel>
                            <FormControl>
                              <Input
                                id="minStockLevel"
                                type="number"
                                placeholder="0"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value) || 0)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Right Column - Product Image */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="image"
                      disabled={isPending}
                      render={() => (
                        <FormItem>
                          <FormLabel className="mx-auto">
                            Product Image
                          </FormLabel>
                          <FormControl>
                            <div className="flex flex-col items-center space-y-4">
                              <div className="relative w-48 h-48 border-2 border-dashed border-border rounded-lg overflow-hidden">
                                <Image
                                  src={productImage || "/placeholder.svg"}
                                  alt="Product preview"
                                  fill
                                  className="object-cover rounded-lg"
                                  onError={() =>
                                    setProductImage("/imagenotset.jpg")
                                  }
                                />
                              </div>
                              <Input
                                type="file"
                                disabled={isPending}
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
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description Field */}
                    <FormField
                      control={form.control}
                      name="description"
                      disabled={isPending}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              id="description"
                              placeholder="Enter product description (optional)"
                              {...field}
                              className="min-h-[80px] resize-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6">
                  <Button
                    type="submit"
                    className="px-8 disabled:cursor-not-allowed"
                    disabled={isPending}
                  >
                    {isPending ? "Adding Product..." : "Add Product"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Dialogs */}
        <AddSupplierDialog
          open={isSupplierDialogOpen}
          onOpenChange={setIsSupplierDialogOpen}
        />
        <CreateStoreDialog
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

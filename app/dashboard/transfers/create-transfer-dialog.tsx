"use client";
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { X, Search } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useSearchStoreProducts } from "@/server-queries/storeProductQueries";
import { useGetBusinessStores } from "@/server-queries/storeQueries";
import toast from "react-hot-toast";
import type { SingleTransferFormData } from "@/types/transfers";
import { useCreateSingleTransfer } from "@/server-queries/transferQueries";
import {
  transferFormSchema,
  TransferFormValues,
} from "@/schemas/transfers/singleTransferSchema";

interface CreateTransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BUSINESS_ID = "68ce994dfba92cd4362e1abd";
const BUSINESS_USER_ID = "0bb76180-080d-4cd4-af6e-a8a6d772f477";
const STORE_ID = "527c51bf-3a90-4873-86c4-f33dc4f60cb5";

export function CreateTransferDialog({
  open,
  onOpenChange,
}: CreateTransferDialogProps) {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedProductImage, setSelectedProductImage] = useState<
    string | undefined
  >();

  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferFormSchema),
    defaultValues: {
      searchTerm: "",
      productCode: "",
      productName: "",
      storeProductId: "",
      fromStore: "",
      toStore: "",
      quantity: "",
      notes: "",
    },
  });

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

  const { mutate: createTransfer, isPending: isSubmitting } =
    useCreateSingleTransfer();

  const searchTerm = form.watch("searchTerm");
  const productCode = form.watch("productCode");
  const productName = form.watch("productName");
  const fromStore = form.watch("fromStore");
  const toStore = form.watch("toStore");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

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
    if (productCode || productName) {
      const selectedProduct = products.find(
        (p) => p.productCode === productCode || p.productName === productName
      );
      setSelectedProductImage(selectedProduct?.imageUrl);
      form.setValue("storeProductId", selectedProduct?.storeProductId || "");
    } else {
      setSelectedProductImage(undefined);
      form.setValue("storeProductId", "");
    }
  }, [productCode, productName, products, form]);

  const handleProductCodeChange = (value: string) => {
    const product = products.find((p) => p.productCode === value);
    if (product) {
      form.setValue("productCode", value);
      form.setValue("productName", product.productName);
      form.setValue("storeProductId", product.storeProductId);
    }
  };

  const handleProductNameChange = (value: string) => {
    const product = products.find((p) => p.productName === value);
    if (product) {
      form.setValue("productName", value);
      form.setValue("productCode", product.productCode);
      form.setValue("storeProductId", product.storeProductId);
    }
  };

  const resetForm = () => {
    form.reset();
    setSelectedProductImage(undefined);
  };

  const onSubmit = (data: TransferFormValues) => {
    const toastId = toast.loading("Creating transfer...");

    const transferData: SingleTransferFormData = {
      storeProductId: data.storeProductId,
      fromStore: data.fromStore,
      toStore: data.toStore,
      quantity: Number(data.quantity),
      notes: data.notes || null,
      searchTerm: data.searchTerm,
      productCode: data.productCode,
      productName: data.productName,
    };

    createTransfer(
      {
        formData: transferData,
        businessId: BUSINESS_ID,
        businessUserId: BUSINESS_USER_ID,
      },
      {
        onSuccess: (response) => {
          toast.success(response.message || "Transfer created successfully", {
            id: toastId,
          });
          resetForm();
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create transfer", {
            id: toastId,
          });
        },
      }
    );
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
              disabled={isSubmitting}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Search product by name to get started
          </p>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 py-4"
          >
            {/* Search field */}
            <FormField
              control={form.control}
              name="searchTerm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Search Product</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Type to search products..."
                        {...field}
                        maxLength={50}
                        className="pl-9"
                        disabled={isSubmitting}
                      />
                      {isSearching && (
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                          Searching...
                        </span>
                      )}
                    </div>
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    {field.value.length}/50 characters
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormField
                    control={form.control}
                    name="productCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Code *</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={handleProductCodeChange}
                          disabled={products.length === 0 || isSubmitting}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product code" />
                            </SelectTrigger>
                          </FormControl>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Product Name */}
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name *</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={handleProductNameChange}
                          disabled={products.length === 0 || isSubmitting}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select product name" />
                            </SelectTrigger>
                          </FormControl>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Store Selectors */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fromStore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>From Store *</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isLoadingStores || isSubmitting}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select source store" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {stores
                              .filter((store) => store.value !== toStore)
                              .map((store) => (
                                <SelectItem
                                  key={store.value}
                                  value={store.value}
                                >
                                  {store.label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="toStore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>To Store *</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isLoadingStores || isSubmitting}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select destination store" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {stores
                              .filter((store) => store.value !== fromStore)
                              .map((store) => (
                                <SelectItem
                                  key={store.value}
                                  value={store.value}
                                >
                                  {store.label}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
                  <AvatarFallback className="rounded-lg">
                    No Image
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>

            {/* Quantity */}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter quantity"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any additional notes or instructions..."
                      className="resize-none"
                      rows={3}
                      {...field}
                      value={field.value ?? ""}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Buttons */}
            <div className="flex justify-center gap-3 pt-4 mb-4">
              <Button
                type="button"
                variant="outline"
                className="rounded-full bg-transparent"
                onClick={resetForm}
                disabled={isSubmitting}
              >
                Reset
              </Button>
              <Button
                type="button"
                variant="outline"
                className="rounded-full bg-transparent"
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
        </Form>
      </DialogContent>
    </Dialog>
  );
}

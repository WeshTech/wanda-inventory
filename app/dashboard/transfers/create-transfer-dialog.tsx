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
import {
  useBusinessStoreInfo,
  useStoreInfoQuery,
} from "@/server-queries/storeQueries";
import toast from "react-hot-toast";
import type { SingleTransferFormData } from "@/types/transfers";
import { useCreateSingleTransfer } from "@/server-queries/transferQueries";
import {
  transferFormSchema,
  TransferFormValues,
} from "@/schemas/transfers/singleTransferSchema";
import {
  useAuthBusinessId,
  useAuthStore,
  useAuthStoreAccess,
  useAuthUser,
} from "@/stores/authStore";

interface CreateTransferDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTransferDialog({
  open,
  onOpenChange,
}: CreateTransferDialogProps) {
  const businessId = useAuthBusinessId() ?? "";
  const storeAccess = useAuthStoreAccess();
  const user = useAuthUser();
  const businessUserId =
    typeof user === "object" && user !== null ? user.userId : "";
  const isAuthLoading = useAuthStore((s) => s.isLoading);

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

  // Business-level stores (for the "to store" dropdown)
  const { data: businessStoresData, isLoading: isLoadingBusinessStores } =
    useBusinessStoreInfo(businessId ?? "");

  const businessStores: { storeId: string; storeName: string; ward: string }[] =
    useMemo(
      () =>
        (Array.isArray(businessStoresData?.data)
          ? businessStoresData?.data
          : businessStoresData?.data
          ? [businessStoresData.data]
          : []) || [],
      [businessStoresData?.data]
    );

  // Accessible stores (for the "from store" dropdown)
  const accessibleStoreIds = storeAccess || [];
  const { data: accessibleStoresData, isLoading: isLoadingAccessibleStores } =
    useStoreInfoQuery(businessId, accessibleStoreIds);

  const accessibleStores: {
    storeId: string;
    storeName: string;
    ward: string;
  }[] = useMemo(
    () =>
      (Array.isArray(accessibleStoresData?.data)
        ? accessibleStoresData?.data
        : accessibleStoresData?.data
        ? [accessibleStoresData.data]
        : []) || [],
    [accessibleStoresData?.data]
  );

  // Determine which storeId to use for product search: prefer selected fromStore, otherwise first store in storeAccess
  const selectedFromStore = form.watch("fromStore");
  const searchTermValue = form.watch("searchTerm");

  const defaultSearchStoreId = useMemo(() => {
    if (selectedFromStore) return selectedFromStore;
    if (storeAccess && storeAccess.length > 0) return storeAccess[0];
    return businessStores[0]?.storeId ?? "";
  }, [selectedFromStore, storeAccess, businessStores]);

  // Search products (storeId is dynamic)
  const { data: searchResults, isLoading: isSearching } =
    useSearchStoreProducts({
      isLoading: isAuthLoading,
      businessId: businessId,
      businessUserId: businessUserId,
      storeId: defaultSearchStoreId,
      searchTerm: debouncedSearchTerm,
    });

  const products = useMemo(
    () => searchResults?.data || [],
    [searchResults?.data]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTermValue || "");
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTermValue]);

  useEffect(() => {
    const productCode = form.getValues("productCode");
    const productName = form.getValues("productName");
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
  }, [products, form]);

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

  const { mutate: createTransfer, isPending: isSubmitting } =
    useCreateSingleTransfer();

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
        businessId: businessId ?? "",
        businessUserId: businessUserId ?? "",
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

  // Combined loading state to prevent flicker
  const isLoadingAny =
    isAuthLoading ||
    isLoadingBusinessStores ||
    isLoadingAccessibleStores ||
    isSearching ||
    isSubmitting;

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
                        disabled={isLoadingAny}
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
                          disabled={products.length === 0 || isLoadingAny}
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
                          disabled={products.length === 0 || isLoadingAny}
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
                          onValueChange={(val) => field.onChange(val)}
                          disabled={isLoadingAny}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select source store" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {accessibleStores.map((store) => (
                              <SelectItem
                                key={store.storeId}
                                value={store.storeId}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="truncate">
                                    {store.storeName}
                                  </span>
                                  <span className="text-xs text-muted-foreground truncate">
                                    {store.ward}
                                  </span>
                                </div>
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
                          disabled={isLoadingAny}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select destination store" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {businessStores
                              .filter((s) => s.storeId !== selectedFromStore)
                              .map((store) => (
                                <SelectItem
                                  key={store.storeId}
                                  value={store.storeId}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="truncate">
                                      {store.storeName}
                                    </span>
                                    <span className="text-xs text-muted-foreground truncate">
                                      {store.ward}
                                    </span>
                                  </div>
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

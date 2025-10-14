"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Save } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuthBusinessId, useAuthStore } from "@/stores/authStore";
import {
  useGetPurchaseReceiptById,
  useUpdatePurchaseReceipt,
} from "@/server-queries/purchaseReceiptsQueries";
import { z } from "zod";
import type {
  PurchaseReceiptProduct,
  UpdateReceiptSubmissionData,
} from "@/types/purchasereceipts";
import { toast } from "react-hot-toast";
import { toast as sonnerToast } from "sonner";

// Form schema for client-side validation
const UpdateReceiptFormSchema = z.object({
  receiptName: z.string().min(1, "Receipt name is required"),
  store: z.string().min(1, "Store name is required"),
  supplier: z.string().min(1, "Supplier name is required"),
  purchaseOrderId: z.string().min(1, "Purchase order ID is required"),
  receiptNumber: z.number().min(0, "Receipt number is required"),
  products: z
    .array(
      z.object({
        businessProductId: z.string().min(1, "Business product ID is required"),
        productCode: z.string().min(1, "Product code is required"),
        productName: z.string().min(1, "Product name is required"),
        unitPrice: z.number().min(0, "Unit price must be non-negative"),
        quantity: z.number().min(1, "Quantity must be at least 1"),
        imageUrl: z.string().nullable().optional(),
      })
    )
    .min(1, "At least one product is required"),
});

type UpdateReceiptFormData = z.infer<typeof UpdateReceiptFormSchema>;

export default function UpdateReceiptPage() {
  const params = useParams();
  const purchaseReceiptId = params.prid as string;
  const { isLoading: isAuthLoading } = useAuthStore();
  const businessId = useAuthBusinessId() ?? "";

  const {
    data,
    isLoading: isDataLoading,
    error,
  } = useGetPurchaseReceiptById(businessId ?? "", purchaseReceiptId);

  // Import and use the mutation hook
  const updateReceiptMutation = useUpdatePurchaseReceipt();

  const [totalAmount, setTotalAmount] = useState(0);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [modifiedProducts, setModifiedProducts] = useState<Set<number>>(
    new Set()
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState<number | null>(null);

  const form = useForm<UpdateReceiptFormData>({
    defaultValues: {
      receiptName: "",
      store: "",
      supplier: "",
      purchaseOrderId: "PO-2024-001",
      receiptNumber: 0,
      products: [],
    },
    mode: "onChange",
  });

  const { fields, update } = useFieldArray({
    control: form.control,
    name: "products",
  });

  useEffect(() => {
    const subscription = form.watch(() => {
      setIsFormDirty(form.formState.isDirty);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  useEffect(() => {
    if (data?.success && data.data) {
      const loadedProducts: UpdateReceiptFormData["products"] =
        data.data.products.map((p: PurchaseReceiptProduct) => ({
          businessProductId: p.businessProductId ?? "",
          imageUrl: p.imageUrl,
          productCode: p.productCode ?? "",
          productName: p.productName ?? "",
          unitPrice: p.unitPrice,
          quantity: p.quantity,
        }));

      form.reset({
        receiptName: data.data.receiptName,
        store: data.data.storeName,
        supplier: data.data.supplierName,
        purchaseOrderId: `PO-${data.data.purchaseOrderId.slice(-6)}`,
        receiptNumber: data.data.receiptNumber,
        products: loadedProducts,
      });
    }
  }, [data, form]);

  useEffect(() => {
    const total = fields.reduce(
      (sum, field) => sum + field.unitPrice * field.quantity,
      0
    );
    setTotalAmount(total);
  }, [fields]);

  const onSubmit = async (formData: UpdateReceiptFormData) => {
    try {
      const validatedData = UpdateReceiptFormSchema.parse(formData);
      const dirtyProducts = validatedData.products.filter((_, index) =>
        modifiedProducts.has(index)
      );

      const calculatedTotal = validatedData.products.reduce(
        (sum, p) => sum + p.unitPrice * p.quantity,
        0
      );

      const submissionData: UpdateReceiptSubmissionData = {
        receiptName: validatedData.receiptName,
        purchaseReceiptId: data?.data?.purchaseReceiptId,
        store: validatedData.store,
        supplier: validatedData.supplier,
        purchaseOrderId: validatedData.purchaseOrderId,
        receiptNumber: validatedData.receiptNumber,
        totalAmount: calculatedTotal,
        products: dirtyProducts,
      };

      // Show loading toast (using sonner)
      const loadingToastId = sonnerToast.loading(
        "Updating purchase receipt..."
      );

      // Run mutation
      const response = await updateReceiptMutation.mutateAsync({
        businessId: businessId!,
        businessUserId: "ab5c1e61-20f6-4816-898c-67e9857e76a3",
        formData: submissionData,
      });

      // Dismiss loading toast
      sonnerToast.dismiss(loadingToastId);

      // Handle success
      if (response.success) {
        toast.success(
          response.message || "Purchase receipt updated successfully!"
        );
        setModifiedProducts(new Set());
        form.reset(formData); // reset form to mark clean
        setIsFormDirty(false);
      } else {
        // Handle server-side validation or business logic errors
        toast.error(response.message || "Failed to update receipt.");
      }
    } catch {
      sonnerToast.dismiss();
      toast.error("Failed to update receipt. Please check the form data.");
    }
  };

  const productForm = useForm<UpdateReceiptFormData["products"][0]>({
    defaultValues: {
      businessProductId: "",
      imageUrl: null,
      productCode: "",
      productName: "",
      unitPrice: 0,
      quantity: 0,
    },
    mode: "onChange",
  });

  const handleProductSubmit = (
    data: UpdateReceiptFormData["products"][0],
    index: number
  ) => {
    update(index, {
      ...data,
      imageUrl: data.imageUrl ?? null,
    });
    setModifiedProducts((prev) => new Set(prev).add(index));
    productForm.reset();
    setIsFormDirty(true);
    setDialogOpen(false);
  };

  const openUpdateDialog = (
    product: UpdateReceiptFormData["products"][0],
    index: number
  ) => {
    productForm.reset({
      businessProductId: product.businessProductId,
      imageUrl: product.imageUrl,
      productCode: product.productCode,
      productName: product.productName,
      unitPrice: product.unitPrice,
      quantity: product.quantity,
    });
    setCurrentEditIndex(index);
    setDialogOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  if (isAuthLoading || isDataLoading) {
    return (
      <div className="min-h-screen bg-background p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading receipt data...</p>
        </div>
      </div>
    );
  }

  if (error || !businessId) {
    return (
      <div className="min-h-screen bg-background p-6">
        Error: {error?.message || "Business ID not found"}
      </div>
    );
  }

  if (!data?.success || !data.data) {
    return (
      <div className="min-h-screen bg-background p-6">
        No receipt data available
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-left mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Update Purchase Receipt
          </h1>
          <p className="text-muted-foreground">
            Edit received products and update receipt information
          </p>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Receipt Information</CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="submit"
                    form="receipt-form"
                    disabled={!isFormDirty || updateReceiptMutation.isPending}
                    className="hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/30 dark:hover:text-green-400"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {updateReceiptMutation.isPending
                      ? "Updating..."
                      : "Update Receipt"}
                  </Button>
                </TooltipTrigger>
                {!isFormDirty && (
                  <TooltipContent>
                    <p>Update products or Receipt Name to submit</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                id="receipt-form"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="purchaseOrderId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purchase Order ID</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled
                            className="bg-muted font-mono"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="receiptNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Receipt Number</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            disabled
                            className="bg-muted font-mono"
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
                    name="receiptName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Receipt Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter receipt name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="supplier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled
                            placeholder="Enter supplier name"
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
                    name="store"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Store</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled
                            placeholder="Enter store name"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormLabel>Total Amount (KSh)</FormLabel>
                  <Input
                    type="number"
                    step="0.01"
                    disabled
                    className="bg-muted font-medium text-lg"
                    value={totalAmount.toFixed(2)}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Products</h2>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Image</TableHead>
                  <TableHead className="text-center">Product Code</TableHead>
                  <TableHead className="text-center">Product Name</TableHead>
                  <TableHead className="text-center">Unit Price</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                  <TableHead className="text-center">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fields.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center text-muted-foreground py-8"
                    >
                      No products available.
                    </TableCell>
                  </TableRow>
                ) : (
                  fields.map((field, index) => (
                    <TooltipProvider key={field.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <TableRow
                            className={
                              modifiedProducts.has(index)
                                ? "bg-yellow-50 dark:bg-yellow-900/20"
                                : ""
                            }
                          >
                            <TableCell className="text-center">
                              <Avatar className="w-10 h-10 border-2 border-primary mx-auto">
                                <AvatarImage
                                  src={field.imageUrl || "/placeholder.svg"}
                                  alt={field.productName}
                                  className="object-cover"
                                />
                                <AvatarFallback className="text-sm bg-muted text-foreground">
                                  {field.productName?.charAt(0).toUpperCase() ||
                                    "P"}
                                </AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell className="text-center">
                              <Input
                                value={field.productCode}
                                disabled
                                className="bg-muted font-mono text-center"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Input
                                value={field.productName}
                                disabled
                                className="bg-muted text-center"
                              />
                            </TableCell>
                            <TableCell
                              className="text-center cursor-pointer"
                              onClick={() => openUpdateDialog(field, index)}
                            >
                              <Input
                                value={formatCurrency(field.unitPrice)}
                                className="text-center cursor-pointer"
                                readOnly
                              />
                            </TableCell>
                            <TableCell
                              className="text-center cursor-pointer"
                              onClick={() => openUpdateDialog(field, index)}
                            >
                              <Input
                                value={field.quantity}
                                className="text-center cursor-pointer"
                                readOnly
                              />
                            </TableCell>
                            <TableCell className="text-center font-medium">
                              <Input
                                value={formatCurrency(
                                  field.unitPrice * field.quantity
                                )}
                                disabled
                                className="bg-muted text-center"
                              />
                            </TableCell>
                            <TableCell className="text-center">
                              <Dialog
                                open={dialogOpen && currentEditIndex === index}
                                onOpenChange={(open) => {
                                  setDialogOpen(open);
                                  if (!open) setCurrentEditIndex(null);
                                }}
                              >
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-primary hover:text-primary"
                                    onClick={() =>
                                      openUpdateDialog(field, index)
                                    }
                                  >
                                    <Pencil className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Update Product</DialogTitle>
                                  </DialogHeader>
                                  <Form {...productForm}>
                                    <form
                                      onSubmit={productForm.handleSubmit(
                                        (data) =>
                                          handleProductSubmit(data, index)
                                      )}
                                      className="space-y-4"
                                    >
                                      <FormField
                                        control={productForm.control}
                                        name="productCode"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Product Code</FormLabel>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                disabled
                                                placeholder="Enter product code"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={productForm.control}
                                        name="productName"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                disabled
                                                placeholder="Enter product name"
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={productForm.control}
                                        name="unitPrice"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>
                                              Unit Price (KSh)
                                            </FormLabel>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                type="number"
                                                step="0.01"
                                                placeholder="Enter unit price"
                                                onChange={(e) =>
                                                  field.onChange(
                                                    Number.parseFloat(
                                                      e.target.value
                                                    ) || 0
                                                  )
                                                }
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <FormField
                                        control={productForm.control}
                                        name="quantity"
                                        render={({ field }) => (
                                          <FormItem>
                                            <FormLabel>Quantity</FormLabel>
                                            <FormControl>
                                              <Input
                                                {...field}
                                                type="number"
                                                placeholder="Enter quantity"
                                                onChange={(e) =>
                                                  field.onChange(
                                                    Number.parseInt(
                                                      e.target.value
                                                    ) || 0
                                                  )
                                                }
                                              />
                                            </FormControl>
                                            <FormMessage />
                                          </FormItem>
                                        )}
                                      />
                                      <Button type="submit">
                                        Update Product
                                      </Button>
                                    </form>
                                  </Form>
                                </DialogContent>
                              </Dialog>
                            </TableCell>
                          </TableRow>
                        </TooltipTrigger>
                        {modifiedProducts.has(index) && (
                          <TooltipContent>
                            <p>Modified</p>
                          </TooltipContent>
                        )}
                      </Tooltip>
                    </TooltipProvider>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {fields.length > 0 && (
            <div className="flex justify-end mb-3">
              <div className="bg-card border rounded-lg p-3 sm:p-4 min-w-48 sm:min-w-64">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-sm sm:text-base font-medium">
                    Total Amount:
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-primary">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

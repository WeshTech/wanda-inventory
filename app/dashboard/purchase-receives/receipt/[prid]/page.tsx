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
import { useAuthStore } from "@/stores/authStore";
import { useGetPurchaseReceiptById } from "@/server-queries/purchaseReceiptsQueries";
import { z } from "zod";
import type { PurchaseReceiptProduct } from "@/types/purchasereceipts";

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
  const { user, isLoading: isAuthLoading } = useAuthStore();
  const businessId = user?.businessId;

  const {
    data,
    isLoading: isDataLoading,
    error,
  } = useGetPurchaseReceiptById(businessId ?? "", purchaseReceiptId);

  const [totalAmount, setTotalAmount] = useState(0);
  const [isFormDirty, setIsFormDirty] = useState(false);

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

  // Track form changes
  useEffect(() => {
    const subscription = form.watch(() => {
      setIsFormDirty(form.formState.isDirty);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Populate form with backend data
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

  // Calculate total amount
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
      const calculatedTotal = validatedData.products.reduce(
        (sum, p) => sum + p.unitPrice * p.quantity,
        0
      );
      console.log("Validated receipt data:", {
        ...validatedData,
        totalAmount: calculatedTotal,
      });
      // TODO: Call update API mutation here
      alert("Receipt updated successfully!");
    } catch (error) {
      console.error("Validation failed:", error);
      alert("Failed to update receipt. Please check the form data.");
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
    productForm.reset();
    setIsFormDirty(true);
  };

  const openUpdateDialog = (product: UpdateReceiptFormData["products"][0]) => {
    productForm.reset({
      businessProductId: product.businessProductId,
      imageUrl: product.imageUrl,
      productCode: product.productCode,
      productName: product.productName,
      unitPrice: product.unitPrice,
      quantity: product.quantity,
    });
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
            <Button
              type="submit"
              form="receipt-form"
              disabled={!isFormDirty}
              className="hover:bg-green-100 hover:text-green-700 dark:hover:bg-green-900/30 dark:hover:text-green-400"
            >
              <Save className="w-4 h-4 mr-2" />
              Update Receipt
            </Button>
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

                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="hover:bg-yellow-50 hover:text-yellow-700 dark:hover:bg-yellow-900/30 dark:hover:text-yellow-400 bg-transparent"
                  >
                    Cancel
                  </Button>
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
                    <TableRow key={field.id}>
                      <TableCell className="text-center">
                        <Avatar className="w-10 h-10 border-2 border-primary mx-auto">
                          <AvatarImage
                            src={field.imageUrl || "/placeholder.svg"}
                            alt={field.productName}
                            className="object-cover"
                          />
                          <AvatarFallback className="text-sm bg-muted text-foreground">
                            {field.productName?.charAt(0).toUpperCase() || "P"}
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
                      <TableCell className="text-center">
                        <Input
                          value={formatCurrency(field.unitPrice)}
                          disabled
                          className="bg-muted text-center"
                        />
                      </TableCell>
                      <TableCell className="text-center">
                        <Input
                          value={field.quantity}
                          disabled
                          className="bg-muted text-center"
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
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:text-primary"
                              onClick={() => openUpdateDialog(field)}
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
                                onSubmit={productForm.handleSubmit((data) =>
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
                                      <FormLabel>Unit Price (KSh)</FormLabel>
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
                                              Number.parseInt(e.target.value) ||
                                                0
                                            )
                                          }
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                <Button type="submit">Update Product</Button>
                              </form>
                            </Form>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {fields.length > 0 && (
            <div className="flex justify-end">
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

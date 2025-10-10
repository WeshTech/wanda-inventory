"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Pencil, Plus, Trash2 } from "lucide-react";
import {
  ProductItemFormData,
  PurchaseReceiptFormData,
  purchaseReceiptSchema,
} from "@/schemas/purchase-receipts/addPurchaseReceiptSchema";
import { ProductDialog } from "./add-product-dialog";
import { useAuthStore } from "@/stores/authStore";
import { useBusinessSuppliersQuery } from "@/server-queries/supplierQueries";
import { SupplierData } from "@/types/suppliers";
import { useGetBusinessStores } from "@/server-queries/storeQueries";
import { Store } from "@/types/stores";
import { useCreatePurchaseReceipt } from "@/server-queries/purchaseReceiptsQueries";
import { toast as sonnerToast } from "sonner";
import toast from "react-hot-toast";

const purchaseOrders = [
  { value: "PO-2024-001", label: "PO-2024-001" },
  { value: "PO-2024-002", label: "PO-2024-002" },
  { value: "PO-2024-003", label: "PO-2024-003" },
];

const statuses = [
  { value: "received", label: "Received" },
  { value: "partial", label: "Partial" },
  { value: "rejected", label: "Rejected" },
];

export default function CreatePurchaseReceiptPage() {
  const [products, setProducts] = useState<ProductItemFormData[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [editingProduct, setEditingProduct] =
    useState<ProductItemFormData | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const { user, isLoading: authLoading } = useAuthStore();
  const businessId = user?.businessId || "";

  const {
    data: suppliersData,
    isLoading: suppliersLoading,
    error: suppliersError,
  } = useBusinessSuppliersQuery(businessId);

  const {
    data: storesData,
    isLoading: storesLoading,
    error: storesError,
  } = useGetBusinessStores();

  const form = useForm<PurchaseReceiptFormData>({
    resolver: zodResolver(purchaseReceiptSchema),
    defaultValues: {
      purchaseOrderId: "",
      receiptName: "",
      supplier: "",
      store: "",
      status: "received",
      totalAmount: 0,
      products: [],
    },
  });

  const { mutate: createPurchaseReceipt, isPending } =
    useCreatePurchaseReceipt();

  useEffect(() => {
    const total = products.reduce(
      (sum, product) => sum + product.accepted * product.unitPrice,
      0
    );
    form.setValue("totalAmount", total);
    form.setValue("products", products);
  }, [products, form]);

  useEffect(() => {
    let loadingToastId: string | number | undefined;

    if (isPending) {
      loadingToastId = sonnerToast.loading("Creating purchase receipt...", {
        duration: Infinity,
      });
    } else {
      if (loadingToastId) sonnerToast.dismiss(loadingToastId);
    }

    return () => {
      if (loadingToastId) sonnerToast.dismiss(loadingToastId);
    };
  }, [isPending]);

  const handleAddProduct = () => {
    setDialogMode("add");
    setEditingProduct(null);
    setEditingIndex(null);
    setDialogOpen(true);
  };

  const handleEditProduct = (index: number) => {
    setDialogMode("edit");
    setEditingProduct(products[index]);
    setEditingIndex(index);
    setDialogOpen(true);
  };

  const handleSaveProduct = (product: ProductItemFormData) => {
    setProducts((prev) =>
      dialogMode === "add"
        ? [...prev, product]
        : prev.map((p, i) => (i === editingIndex ? product : p))
    );
  };

  const handleRemoveProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = (data: PurchaseReceiptFormData) => {
    createPurchaseReceipt(
      { formData: data, businessId, createdBy: user?.email || "" },
      {
        onSuccess: (response) => {
          sonnerToast.dismiss();
          toast.success(
            response.message || "Purchase receipt created successfully!"
          );
        },
        onError: (error) => {
          sonnerToast.dismiss();
          toast.error(
            error.message ||
              "Failed to create purchase receipt. Please try again."
          );
        },
      }
    );
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 2,
    }).format(amount);

  if (authLoading || !businessId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-screen-lg space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Create Purchase Receipt
          </h1>
          <p className="text-muted-foreground mt-1">
            Record received products and create a new purchase receipt
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Purchase Receipt Details</CardTitle>
                <Button type="submit" size="lg" disabled={isPending}>
                  {isPending ? "Saving..." : "Save Purchase Receipt"}
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="purchaseOrderId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Purchase Order (Optional)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isPending}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a purchase order" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {purchaseOrders.map((po) => (
                            <SelectItem key={po.value} value={po.value}>
                              {po.label}
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
                  name="receiptName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Receipt Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter receipt name"
                          disabled={isPending}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="supplier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Supplier <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={
                            isPending || suppliersLoading || !!suppliersError
                          }
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  suppliersLoading
                                    ? "Loading suppliers..."
                                    : suppliersError
                                    ? "Error loading suppliers"
                                    : "Select a supplier"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {suppliersData?.data?.map(
                              (supplier: SupplierData) => (
                                <SelectItem
                                  key={supplier.supplierId}
                                  value={supplier.supplierId}
                                >
                                  {supplier.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="store"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Store <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isPending || storesLoading || !!storesError}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  storesLoading
                                    ? "Loading stores..."
                                    : storesError
                                    ? "Error loading stores"
                                    : "Select a store"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {storesData?.data?.stores?.map((store: Store) => (
                              <SelectItem key={store.id} value={store.id}>
                                <div className="flex items-center gap-2">
                                  <span>{store.name}</span>
                                  <span className="text-muted-foreground">
                                    ({store.ward})
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Status <span className="text-destructive">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isPending}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {statuses.map((status) => (
                              <SelectItem
                                key={status.value}
                                value={status.value}
                              >
                                {status.label}
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
                    name="totalAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Amount (KSh)</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            value={formatCurrency(field.value)}
                            disabled
                            className="bg-muted font-medium text-lg"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Product Details</CardTitle>
                <Button
                  type="button"
                  onClick={handleAddProduct}
                  variant="default"
                  size="sm"
                  disabled={isPending}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto mb-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-16">PR No</TableHead>
                        <TableHead className="min-w-[120px]">
                          Product Code
                        </TableHead>
                        <TableHead className="min-w-[150px]">
                          Product Name
                        </TableHead>
                        <TableHead className="min-w-[100px]">
                          Accepted
                        </TableHead>
                        <TableHead className="min-w-[100px]">
                          Rejected
                        </TableHead>
                        <TableHead className="min-w-[120px]">
                          Unit Price
                        </TableHead>
                        <TableHead className="min-w-[120px]">Total</TableHead>
                        <TableHead className="w-24">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={8}
                            className="text-center text-muted-foreground py-8"
                          >
                            No products added yet. Click Add Product to get
                            started.
                          </TableCell>
                        </TableRow>
                      ) : (
                        products.map((product, index) => (
                          <TableRow key={product.id}>
                            <TableCell className="font-medium">
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <span className="font-mono text-sm">
                                {product.productCode}
                              </span>
                            </TableCell>
                            <TableCell>{product.productName}</TableCell>
                            <TableCell>{product.accepted}</TableCell>
                            <TableCell>{product.rejected}</TableCell>
                            <TableCell>
                              {formatCurrency(product.unitPrice)}
                            </TableCell>
                            <TableCell className="font-medium">
                              {formatCurrency(
                                product.accepted * product.unitPrice
                              )}
                            </TableCell>
                            <TableCell>
                              <TooltipProvider>
                                <div className="flex gap-1">
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEditProduct(index)}
                                        disabled={isPending}
                                      >
                                        <Pencil className="w-4 h-4 text-blue-600" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Edit Product</p>
                                    </TooltipContent>
                                  </Tooltip>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          handleRemoveProduct(index)
                                        }
                                        className="text-destructive hover:text-destructive"
                                        disabled={isPending}
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Delete Product</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </div>
                              </TooltipProvider>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
                {form.formState.errors.products && (
                  <p className="text-sm text-destructive mt-2">
                    {form.formState.errors.products.message}
                  </p>
                )}
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>

      <ProductDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSave={handleSaveProduct}
        product={editingProduct}
        mode={dialogMode}
      />
    </div>
  );
}

// "use client";

// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import { Pencil, Plus, Trash2 } from "lucide-react";
// import {
//   ProductItemFormData,
//   PurchaseReceiptFormData,
//   purchaseReceiptSchema,
// } from "@/schemas/purchase-receipts/addPurchaseReceiptSchema";
// import { ProductDialog } from "./add-product-dialog";
// import { useAuthStore } from "@/stores/authStore";
// import { useBusinessSuppliersQuery } from "@/server-queries/supplierQueries";
// import { SupplierData } from "@/types/suppliers";
// import { useGetBusinessStores } from "@/server-queries/storeQueries";
// import { Store } from "@/types/stores";
// import { useCreatePurchaseReceipt } from "@/server-queries/purchaseReceiptsQueries";

// const purchaseOrders = [
//   { value: "PO-2024-001", label: "PO-2024-001" },
//   { value: "PO-2024-002", label: "PO-2024-002" },
//   { value: "PO-2024-003", label: "PO-2024-003" },
// ];

// const statuses = [
//   { value: "received", label: "Received" },
//   { value: "partial", label: "Partial" },
//   { value: "rejected", label: "Rejected" },
// ];

// export default function CreatePurchaseReceiptPage() {
//   const [products, setProducts] = useState<ProductItemFormData[]>([]);
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
//   const [editingProduct, setEditingProduct] =
//     useState<ProductItemFormData | null>(null);
//   const [editingIndex, setEditingIndex] = useState<number | null>(null);

//   const { user } = useAuthStore();
//   const businessId = user?.businessId || "";

//   const {
//     data: suppliersData,
//     isLoading: suppliersLoading,
//     error: suppliersError,
//   } = useBusinessSuppliersQuery(businessId);

//   const {
//     data: storesData,
//     isLoading: storesLoading,
//     error: storesError,
//   } = useGetBusinessStores();

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<PurchaseReceiptFormData>({
//     resolver: zodResolver(purchaseReceiptSchema),
//     defaultValues: {
//       purchaseOrderId: "",
//       receiptName: "",
//       supplier: "",
//       store: "",
//       status: "received",
//       totalAmount: 0,
//       products: [],
//     },
//   });

//   // Initialize the mutation hook
//   const { mutate: createPurchaseReceipt, isPending } =
//     useCreatePurchaseReceipt();

//   const totalAmount = watch("totalAmount");

//   useEffect(() => {
//     const total = products.reduce((sum, product) => {
//       const productTotal = product.accepted * product.unitPrice;
//       return sum + productTotal;
//     }, 0);
//     setValue("totalAmount", total);
//     setValue("products", products);
//   }, [products, setValue]);

//   const handleAddProduct = () => {
//     setDialogMode("add");
//     setEditingProduct(null);
//     setEditingIndex(null);
//     setDialogOpen(true);
//   };

//   const handleEditProduct = (index: number) => {
//     setDialogMode("edit");
//     setEditingProduct(products[index]);
//     setEditingIndex(index);
//     setDialogOpen(true);
//   };

//   const handleSaveProduct = (product: ProductItemFormData) => {
//     if (dialogMode === "add") {
//       setProducts([...products, product]);
//     } else if (dialogMode === "edit" && editingIndex !== null) {
//       const updatedProducts = [...products];
//       updatedProducts[editingIndex] = product;
//       setProducts(updatedProducts);
//     }
//   };

//   const handleRemoveProduct = (index: number) => {
//     setProducts(products.filter((_, i) => i !== index));
//   };

//   const onSubmit = (data: PurchaseReceiptFormData) => {
//     createPurchaseReceipt(
//       {
//         formData: data,
//         businessId,
//         createdBy: "",
//       },
//       {
//         onSuccess: () => {
//           alert("Purchase receipt created successfully!");
//         },
//         onError: (error) => {
//           console.error("Error creating purchase receipt:", error);
//           alert("Failed to create purchase receipt. Please try again.");
//         },
//       }
//     );
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat("en-KE", {
//       style: "currency",
//       currency: "KES",
//       minimumFractionDigits: 2,
//     }).format(amount);
//   };

//   return (
//     <div className="min-h-screen bg-background p-6">
//       <div className="max-w-screen mx-auto space-y-6 mb">
//         {/* Header Section */}
//         <div className="flex items-start justify-between">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground">
//               Create Purchase Receipt
//             </h1>
//             <p className="text-muted-foreground mt-1">
//               Record received products and create a new purchase receipt
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* Purchase Receipt Details Card */}
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle>Purchase Receipt Details</CardTitle>
//               <Button type="submit" size="lg" disabled={isPending}>
//                 {isPending ? "Saving..." : "Save Purchase Receipt"}
//               </Button>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div>
//                 <Label htmlFor="purchaseOrderId">
//                   Purchase Order (Optional)
//                 </Label>
//                 <Select
//                   value={watch("purchaseOrderId")}
//                   onValueChange={(value) => setValue("purchaseOrderId", value)}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select a purchase order" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {purchaseOrders.map((po) => (
//                       <SelectItem key={po.value} value={po.value}>
//                         {po.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div>
//                 <Label htmlFor="receiptName">
//                   Receipt Name <span className="text-destructive">*</span>
//                 </Label>
//                 <Input
//                   id="receiptName"
//                   {...register("receiptName")}
//                   placeholder="Enter receipt name"
//                 />
//                 {errors.receiptName && (
//                   <p className="text-sm text-destructive mt-1">
//                     {errors.receiptName.message}
//                   </p>
//                 )}
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="supplier">
//                     Supplier <span className="text-destructive">*</span>
//                   </Label>
//                   <Select
//                     value={watch("supplier")}
//                     onValueChange={(value) => setValue("supplier", value)}
//                     disabled={suppliersLoading || !!suppliersError}
//                   >
//                     <SelectTrigger>
//                       <SelectValue
//                         placeholder={
//                           suppliersLoading
//                             ? "Loading suppliers..."
//                             : suppliersError
//                             ? "Error loading suppliers"
//                             : "Select a supplier"
//                         }
//                       />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {suppliersData?.data?.map((supplier: SupplierData) => (
//                         <SelectItem
//                           key={supplier.supplierId}
//                           value={supplier.supplierId}
//                         >
//                           {supplier.name}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   {errors.supplier && (
//                     <p className="text-sm text-destructive mt-1">
//                       {errors.supplier.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <Label htmlFor="store">
//                     Store <span className="text-destructive">*</span>
//                   </Label>
//                   <Select
//                     value={watch("store")}
//                     onValueChange={(value) => setValue("store", value)}
//                     disabled={storesLoading || !!storesError}
//                   >
//                     <SelectTrigger>
//                       <SelectValue
//                         placeholder={
//                           storesLoading
//                             ? "Loading stores..."
//                             : storesError
//                             ? "Error loading stores"
//                             : "Select a store"
//                         }
//                       />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {storesData?.data?.stores?.map((store: Store) => (
//                         <SelectItem key={store.id} value={store.id}>
//                           <div className="flex items-center gap-2">
//                             <span>{store.name}</span>
//                             <span className="text-muted-foreground">
//                               ({store.ward})
//                             </span>
//                           </div>
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   {errors.store && (
//                     <p className="text-sm text-destructive mt-1">
//                       {errors.store.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="status">
//                     Status <span className="text-destructive">*</span>
//                   </Label>
//                   <Select
//                     value={watch("status")}
//                     onValueChange={(value) =>
//                       setValue(
//                         "status",
//                         value as "received" | "partial" | "rejected"
//                       )
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select status" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {statuses.map((status) => (
//                         <SelectItem key={status.value} value={status.value}>
//                           {status.label}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   {errors.status && (
//                     <p className="text-sm text-destructive mt-1">
//                       {errors.status.message}
//                     </p>
//                   )}
//                 </div>

//                 <div>
//                   <Label htmlFor="totalAmount">Total Amount (KSh)</Label>
//                   <Input
//                     id="totalAmount"
//                     type="text"
//                     value={formatCurrency(totalAmount)}
//                     disabled
//                     className="bg-muted font-medium text-lg"
//                   />
//                 </div>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Product Details Card */}
//           <Card className="mb-8">
//             <CardHeader className="flex flex-row items-center justify-between">
//               <CardTitle>Product Details</CardTitle>
//               <Button
//                 type="button"
//                 onClick={handleAddProduct}
//                 variant="default"
//                 size="sm"
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add Product
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <div className="overflow-x-auto mb-4">
//                 <Table>
//                   <TableHeader>
//                     <TableRow>
//                       <TableHead className="w-16">PR No</TableHead>
//                       <TableHead className="min-w-[120px]">
//                         Product Code
//                       </TableHead>
//                       <TableHead className="min-w-[150px]">
//                         Product Name
//                       </TableHead>
//                       <TableHead className="min-w-[100px]">Accepted</TableHead>
//                       <TableHead className="min-w-[100px]">Rejected</TableHead>
//                       <TableHead className="min-w-[120px]">
//                         Unit Price
//                       </TableHead>
//                       <TableHead className="min-w-[120px]">Total</TableHead>
//                       <TableHead className="w-24">Actions</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {products.length === 0 ? (
//                       <TableRow>
//                         <TableCell
//                           colSpan={8}
//                           className="text-center text-muted-foreground py-8"
//                         >
//                           No products added yet. Click Add Product to get
//                           started.
//                         </TableCell>
//                       </TableRow>
//                     ) : (
//                       products.map((product, index) => {
//                         const rowTotal = product.accepted * product.unitPrice;
//                         return (
//                           <TableRow key={product.id}>
//                             <TableCell className="font-medium">
//                               {index + 1}
//                             </TableCell>
//                             <TableCell>
//                               <span className="font-mono text-sm">
//                                 {product.productCode}
//                               </span>
//                             </TableCell>
//                             <TableCell>{product.productName}</TableCell>
//                             <TableCell>{product.accepted}</TableCell>
//                             <TableCell>{product.rejected}</TableCell>
//                             <TableCell>
//                               {formatCurrency(product.unitPrice)}
//                             </TableCell>
//                             <TableCell className="font-medium">
//                               {formatCurrency(rowTotal)}
//                             </TableCell>
//                             <TableCell>
//                               <TooltipProvider>
//                                 <div className="flex gap-1">
//                                   <Tooltip>
//                                     <TooltipTrigger asChild>
//                                       <Button
//                                         type="button"
//                                         variant="ghost"
//                                         size="sm"
//                                         onClick={() => handleEditProduct(index)}
//                                       >
//                                         <Pencil className="w-4 h-4 text-blue-600" />
//                                       </Button>
//                                     </TooltipTrigger>
//                                     <TooltipContent>
//                                       <p>Edit Product</p>
//                                     </TooltipContent>
//                                   </Tooltip>
//                                   <Tooltip>
//                                     <TooltipTrigger asChild>
//                                       <Button
//                                         type="button"
//                                         variant="ghost"
//                                         size="sm"
//                                         onClick={() =>
//                                           handleRemoveProduct(index)
//                                         }
//                                         className="text-destructive hover:text-destructive"
//                                       >
//                                         <Trash2 className="w-4 h-4" />
//                                       </Button>
//                                     </TooltipTrigger>
//                                     <TooltipContent>
//                                       <p>Delete Product</p>
//                                     </TooltipContent>
//                                   </Tooltip>
//                                 </div>
//                               </TooltipProvider>
//                             </TableCell>
//                           </TableRow>
//                         );
//                       })
//                     )}
//                   </TableBody>
//                 </Table>
//               </div>
//               {errors.products && (
//                 <p className="text-sm text-destructive mt-2">
//                   {errors.products.message}
//                 </p>
//               )}
//             </CardContent>
//           </Card>
//         </form>
//       </div>

//       <ProductDialog
//         open={dialogOpen}
//         onOpenChange={setDialogOpen}
//         onSave={handleSaveProduct}
//         product={editingProduct}
//         mode={dialogMode}
//       />
//     </div>
//   );
// }

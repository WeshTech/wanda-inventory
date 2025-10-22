"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Save, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { UpdateProductDialog } from "./update-product-dialog";
import { DeleteProductDialog } from "./[poid]/delete-product-dialog";
import {
  type CreatePurchaseOrderFormData,
  createPurchaseOrderSchema,
} from "@/schemas/purchaseOrderSchema";
import type { AddProductFormData } from "@/schemas/purchaseorder/addProductSchema";
import { AddProductDialog } from "./add-product-dialog";
import {
  useAuthBusinessId,
  useAuthStoreAccess,
  useAuthUser,
} from "@/stores/authStore";
import { useBusinessSuppliersQuery } from "@/server-queries/supplierQueries";
import { useStoreInfoQuery } from "@/server-queries/storeQueries";
import { toast as sonnerToast } from "sonner";
import toast from "react-hot-toast";
import { useCreatePurchaseOrder } from "@/server-queries/purchaseorderQueries";
import { ToKenyanShillings } from "@/utils/toKenyanShillings";

type Product = {
  id: string;
  businessProductId: string;
  barcode: string;
  name: string;
  quantity: number;
  price: number;
  total: number;
};

// Status options aligned with zod schema
const statusOptions = [
  {
    value: "DRAFT",
    label: "Draft",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  },
  {
    value: "SUBMITTED",
    label: "Submitted",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    value: "APPROVED",
    label: "Approved",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  {
    value: "REJECTED",
    label: "Rejected",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  {
    value: "RECEIVED",
    label: "Received",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  {
    value: "PARTIAL",
    label: "Partial",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  {
    value: "CANCELLED",
    label: "Cancelled",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
  {
    value: "CLOSED",
    label: "Closed",
    color: "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300",
  },
] as const;

export default function CreatePurchaseOrderPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [tableError, setTableError] = useState<string | null>(null);

  // Get auth data
  const businessId = useAuthBusinessId();
  const user = useAuthUser();
  const storeAccess = useAuthStoreAccess();
  const userId = typeof user === "object" && user !== null ? user.userId : "";

  // Initialize mutation hook
  const { mutate: createPurchaseOrder, isPending } = useCreatePurchaseOrder();

  // Fetch suppliers
  const { data: suppliersData, isLoading: suppliersLoading } =
    useBusinessSuppliersQuery(businessId ?? "");
  const suppliers = suppliersData?.data ?? [];

  // Fetch store info
  const { data: storesData, isLoading: storesLoading } = useStoreInfoQuery(
    businessId ?? "",
    storeAccess
  );
  const stores = Array.isArray(storesData?.data)
    ? storesData.data
    : storesData?.data
    ? [storesData.data]
    : [];

  const form = useForm<CreatePurchaseOrderFormData>({
    resolver: zodResolver(createPurchaseOrderSchema),
    defaultValues: {
      supplier: "",
      store: "",
      status: "DRAFT",
      dateExpected: "",
      createdBy: user?.email || "John Doe",
      products: [],
    },
  });

  const onSubmit: SubmitHandler<CreatePurchaseOrderFormData> = (data) => {
    if (products.length === 0) {
      setTableError("At least one product is required");
      return;
    }
    if (!businessId || !userId) {
      toast.error("Authentication details are missing");
      return;
    }

    setTableError(null);

    // Show loading toast
    const loadingToastId = sonnerToast.loading("Creating purchase order...");

    // Call mutation
    createPurchaseOrder(
      {
        formData: { ...data, products },
        businessId,
        userId,
      },
      {
        onSuccess: (response) => {
          // Dismiss loading toast
          sonnerToast.dismiss(loadingToastId);
          // Show success toast
          toast.success(
            response.message || "Purchase order created successfully!"
          );
        },
        onError: (error) => {
          // Dismiss loading toast
          sonnerToast.dismiss(loadingToastId);
          // Show error toast
          toast.error(error.message || "Failed to create purchase order");
        },
      }
    );
  };

  const handleAddProduct = (product: AddProductFormData) => {
    const newProduct: Product = {
      id: `product-${Date.now()}`,
      businessProductId: product.businessProductId,
      barcode: product.productBarcode,
      name: product.productName,
      quantity: product.quantity,
      price: product.price,
      total: product.total,
    };
    setProducts([...products, newProduct]);
    form.setValue("products", [...products, newProduct]);
    setShowAddProduct(false);
    setTableError(null);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    const updatedProducts = products.map((p) =>
      p.id === updatedProduct.id ? updatedProduct : p
    );
    setProducts(updatedProducts);
    form.setValue("products", updatedProducts);
    setShowUpdateProduct(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      const updatedProducts = products.filter(
        (p) => p.id !== selectedProduct.id
      );
      setProducts(updatedProducts);
      form.setValue("products", updatedProducts);
      setShowDeleteProduct(false);
      setSelectedProduct(null);
    }
  };

  const openUpdateDialog = (product: Product) => {
    setSelectedProduct(product);
    setShowUpdateProduct(true);
  };

  const openDeleteDialog = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteProduct(true);
  };

  // Calculate totals
  const subtotal = products.reduce((sum, product) => sum + product.total, 0);
  const total = subtotal;

  return (
    <div className="container mx-auto py-6 px-4 space-y-6 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-balance">
                  Create Purchase Order
                </h1>
                <p className="text-muted-foreground">
                  Fill in the details to create a new purchase order
                </p>
              </div>
            </div>
            <Button type="submit" className="gap-2" disabled={isPending}>
              <Save className="h-4 w-4" />
              Create Order
            </Button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Order Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex flex-col gap-3 w-full">
                        <FormField
                          control={form.control}
                          name="supplier"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Supplier *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={suppliersLoading || isPending}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-3/4">
                                    <SelectValue
                                      placeholder={
                                        suppliersLoading
                                          ? "Loading suppliers..."
                                          : "Select supplier"
                                      }
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {suppliers.map((supplier) => (
                                    <SelectItem
                                      key={supplier.supplierId}
                                      value={supplier.supplierId}
                                    >
                                      {supplier.name}
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
                          name="store"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Store *</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={storesLoading || isPending}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-3/4">
                                    <SelectValue
                                      placeholder={
                                        storesLoading
                                          ? "Loading stores..."
                                          : "Select store"
                                      }
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {stores.map((store) => (
                                    <SelectItem
                                      key={store.storeId}
                                      value={store.storeId}
                                    >
                                      <div className="flex items-center gap-2">
                                        <span>{store.storeName}</span>
                                        <span className="text-muted-foreground">
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
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Status</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={isPending}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-3/4">
                                    <SelectValue />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {statusOptions.map((status) => (
                                    <SelectItem
                                      key={status.value}
                                      value={status.value}
                                    >
                                      <div className="flex items-center gap-2">
                                        <Badge
                                          variant="secondary"
                                          className={status.color}
                                        >
                                          {status.label}
                                        </Badge>
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
                          name="dateExpected"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expected Date *</FormLabel>
                              <FormControl>
                                <Input
                                  type="date"
                                  {...field}
                                  disabled={isPending}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="createdBy"
                          render={({ field }) => (
                            <FormItem className="md:col-span-2">
                              <FormLabel>Created By</FormLabel>
                              <FormControl>
                                <Input {...field} disabled />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Side: Order Summary and Quick Actions */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Items:</span>
                        <span className="font-medium">{products.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Qty:</span>
                        <span className="font-medium">
                          {products.reduce((sum, p) => sum + p.quantity, 0)}
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-medium">
                          {ToKenyanShillings(subtotal)}
                        </span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-semibold text-base">
                        <span>Total:</span>
                        <span>{ToKenyanShillings(total)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start gap-2 bg-transparent"
                      onClick={() => setShowAddProduct(true)}
                      disabled={isPending}
                    >
                      <Plus className="h-4 w-4" />
                      Add Product
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full justify-start gap-2 bg-transparent"
                      disabled={isPending}
                    >
                      <Save className="h-4 w-4" />
                      Save as Draft
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom Row: Products Table - Full Width */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Products ({products.length})</CardTitle>
                  <Button
                    type="button"
                    onClick={() => setShowAddProduct(true)}
                    className="gap-2"
                    disabled={isPending}
                  >
                    <Plus className="h-4 w-4" />
                    Add Product
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {products.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      No products added yet
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Click Add Product to get started
                    </p>
                    {tableError && (
                      <p className="text-destructive text-sm font-medium">
                        ⚠️ {tableError}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-12">PRD NO</TableHead>
                            <TableHead>Product Code</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                            <TableHead className="text-right">
                              Quantity
                            </TableHead>
                            <TableHead className="text-right">Total</TableHead>
                            <TableHead className="w-24 text-center">
                              Actions
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {products.map((product, index) => (
                            <TableRow key={product.id}>
                              <TableCell className="font-medium">
                                {index + 1}
                              </TableCell>
                              <TableCell className="font-mono text-sm">
                                {product.barcode}
                              </TableCell>
                              <TableCell className="font-medium">
                                {product.name}
                              </TableCell>
                              <TableCell className="text-right">
                                {ToKenyanShillings(product.price)}
                              </TableCell>
                              <TableCell className="text-right">
                                {product.quantity}
                              </TableCell>
                              <TableCell className="text-right font-medium">
                                {ToKenyanShillings(product.total)}
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2 justify-center">
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => openUpdateDialog(product)}
                                    title="Edit product"
                                    disabled={isPending}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => openDeleteDialog(product)}
                                    className="text-destructive hover:text-destructive"
                                    title="Delete product"
                                    disabled={isPending}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    {tableError && (
                      <div className="bg-destructive/10 border border-destructive/30 rounded-md p-3">
                        <p className="text-destructive text-sm font-medium">
                          ⚠️ {tableError}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </form>
      </Form>

      <AddProductDialog
        open={showAddProduct}
        onOpenChange={setShowAddProduct}
        onAdd={handleAddProduct}
      />

      {selectedProduct && (
        <UpdateProductDialog
          open={showUpdateProduct}
          onOpenChange={setShowUpdateProduct}
          product={selectedProduct}
          onUpdate={handleUpdateProduct}
        />
      )}

      {selectedProduct && (
        <DeleteProductDialog
          open={showDeleteProduct}
          onOpenChange={setShowDeleteProduct}
          product={selectedProduct}
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  );
}

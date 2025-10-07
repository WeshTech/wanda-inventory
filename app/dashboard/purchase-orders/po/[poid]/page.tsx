"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Plus, Trash2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AddProductDialog } from "./add-product-dialog";
import { UpdateProductDialog } from "./update-product-dialog";
import { DeleteProductDialog } from "./delete-product-dialog";
import { format } from "date-fns";
import type { PurchaseOrderProduct } from "@/types/purchaseorder";
import { useAuthStore } from "@/stores/authStore";
import { usePurchaseOrderDetail } from "@/server-queries/purchaseorderQueries";
import { toast } from "sonner";
import {
  type UpdatePurchaseOrderFormData,
  updatePurchaseOrderSchema,
} from "@/schemas/purchaseOrderSchema";

interface Product {
  id: string;
  businessProductId: string;
  barcode: string | null;
  name: string | null;
  quantity: number;
  price: number;
  isModified?: boolean;
}

const DEFAULT_BUSINESS_PRODUCT_ID = "00000000-0000-0000-0000-000000000000";

export default function EditPurchaseOrderPage() {
  const { poid } = useParams<{ poid: string }>();
  const { user, isAuthenticated } = useAuthStore();
  const businessId = user?.businessId || "";
  const router = useRouter();

  const {
    data: purchaseOrderResponse,
    isLoading: isQueryLoading,
    error,
  } = usePurchaseOrderDetail(businessId, poid);
  const purchaseOrder = purchaseOrderResponse?.data;

  const [products, setProducts] = useState<Product[]>([]);
  const [originalProducts, setOriginalProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const form = useForm<UpdatePurchaseOrderFormData>({
    resolver: zodResolver(updatePurchaseOrderSchema),
    defaultValues: {
      purchaseOrderId: poid,
      status: undefined,
      products: [],
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to load purchase order.");
      const timer = setTimeout(() => {
        router.replace("/dashboard/purchase-orders");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [error, router]);

  useEffect(() => {
    if (purchaseOrder) {
      const initialProducts = purchaseOrder.products.map(
        (p: PurchaseOrderProduct, index: number) => ({
          id: `${index + 1}`,
          businessProductId: p.businessProductId,
          barcode: p.barcode,
          name: p.productName,
          quantity: p.quantity,
          price: p.price,
          isModified: false,
        })
      );

      form.reset({
        purchaseOrderId: poid,
        status: purchaseOrder.status,
        products: initialProducts.map((p) => ({
          businessProductId: p.businessProductId,
          barcode: p.barcode || undefined,
          productName: p.name || undefined,
          quantity: p.quantity,
          price: p.price,
        })),
      });

      setProducts(initialProducts);
      setOriginalProducts(JSON.parse(JSON.stringify(initialProducts)));
    }
  }, [purchaseOrder, form, poid]);

  const checkIfDirty = () => {
    const currentStatus = form.getValues("status");
    const originalStatus = purchaseOrder?.status;

    const statusChanged = currentStatus !== originalStatus;
    const productsChanged = products.some((p) => p.isModified);

    return statusChanged || productsChanged;
  };

  useEffect(() => {
    form.setValue(
      "products",
      products.map((p) => ({
        businessProductId: p.businessProductId,
        barcode: p.barcode || undefined,
        productName: p.name || undefined,
        quantity: p.quantity,
        price: p.price,
      }))
    );
  }, [products, form]);

  const onSubmit = (data: UpdatePurchaseOrderFormData) => {
    if (!checkIfDirty()) {
      toast.warning("No changes detected", {
        description: "Please make changes to the form before updating.",
      });
      return;
    }

    console.log("[v0] Purchase order form submitted:", data);
    // Handle form submission logic here
    toast.success("Purchase order updated successfully!");

    setProducts((prev) => prev.map((p) => ({ ...p, isModified: false })));
    setOriginalProducts(JSON.parse(JSON.stringify(products)));
  };

  const handleAddProduct = (
    product: Omit<Product, "id" | "businessProductId">
  ) => {
    const newProduct: Product = {
      ...product,
      id: `${products.length + 1}`,
      businessProductId: DEFAULT_BUSINESS_PRODUCT_ID,
      isModified: true,
    };
    setProducts([...products, newProduct]);
    setShowAddDialog(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === updatedProduct.id) {
          const original = originalProducts.find((op) => op.id === p.id);
          const isModified = original
            ? original.quantity !== updatedProduct.quantity ||
              original.price !== updatedProduct.price ||
              original.barcode !== updatedProduct.barcode ||
              original.name !== updatedProduct.name
            : true;

          return { ...updatedProduct, isModified };
        }
        return p;
      })
    );
    setShowUpdateDialog(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId));
    setShowDeleteDialog(false);
    setSelectedProduct(null);
  };

  const subtotal = products.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );
  const tax = 0;
  const total = subtotal + tax;

  const isLoading = isQueryLoading || !isAuthenticated;

  if (isLoading) return <div>Loading purchase order...</div>;

  if (!purchaseOrder) return <div>Purchase order not found.</div>;

  return (
    <div className="container mx-auto p-6 max-w-6xl bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="mb-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-balance">
            Edit Purchase Order
          </h1>
          <p className="text-muted-foreground mb-4">
            Purchase Order ID:{" "}
            {`PO-${new Date(purchaseOrder.dateCreated).getFullYear()}-${String(
              purchaseOrder.orderNumber
            ).padStart(3, "0")}`}
          </p>
        </div>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="shrink-0 gap-2"
          size="lg"
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Form {...form}>
        <form className="grid gap-6">
          {/* Purchase Order Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Purchase Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="w-full">
                  <FormLabel>Supplier</FormLabel>
                  <Input
                    value={purchaseOrder.supplier || "N/A"}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="w-full">
                  <FormLabel>Store</FormLabel>
                  <Input
                    value={purchaseOrder.store || "N/A"}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                          <SelectItem value="SUBMITTED">Submitted</SelectItem>
                          <SelectItem value="APPROVED">Approved</SelectItem>
                          <SelectItem value="REJECTED">Rejected</SelectItem>
                          <SelectItem value="RECEIVED">Received</SelectItem>
                          <SelectItem value="PARTIAL">Partial</SelectItem>
                          <SelectItem value="CANCELLED">Cancelled</SelectItem>
                          <SelectItem value="CLOSED">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="w-full">
                  <FormLabel>Date Created</FormLabel>
                  <Input
                    value={format(
                      new Date(purchaseOrder.dateCreated),
                      "yyyy-MM-dd"
                    )}
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="w-full">
                  <FormLabel>Date Expected</FormLabel>
                  <Input
                    value={
                      purchaseOrder.dateExpected
                        ? new Date(purchaseOrder.dateExpected).toLocaleString(
                            "en-KE",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            }
                          )
                        : "N/A"
                    }
                    disabled
                    className="bg-muted"
                  />
                </div>
                <div className="w-full">
                  <FormLabel>Created By</FormLabel>
                  <Input
                    value={purchaseOrder.createdBy}
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Products Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Products</CardTitle>
              <Button
                type="button"
                onClick={() => setShowAddDialog(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center">PO NO</TableHead>
                      <TableHead className="text-center">Product ID</TableHead>
                      <TableHead className="text-center">Barcode</TableHead>
                      <TableHead className="text-center">
                        Product Name
                      </TableHead>
                      <TableHead className="text-center">Quantity</TableHead>
                      <TableHead className="text-center">
                        Unit Price (KES)
                      </TableHead>
                      <TableHead className="text-center">Total (KES)</TableHead>
                      <TableHead className="text-center w-[100px]">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product, index) => (
                      <TooltipProvider key={product.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <TableRow
                              className={
                                product.isModified
                                  ? "bg-yellow-100 dark:bg-yellow-950/30 hover:bg-yellow-200 dark:hover:bg-yellow-950/50"
                                  : ""
                              }
                            >
                              <TableCell className="text-center">
                                {index + 1}
                              </TableCell>
                              <TableCell className="font-mono text-sm text-center">
                                {product.businessProductId.slice(-6)}
                              </TableCell>
                              <TableCell className="font-mono text-sm text-center">
                                {product.barcode || "-"}
                              </TableCell>
                              <TableCell className="text-center">
                                {product.name || "-"}
                              </TableCell>
                              <TableCell className="text-center">
                                {product.quantity}
                              </TableCell>
                              <TableCell className="text-center">
                                KES {product.price.toFixed(2)}
                              </TableCell>
                              <TableCell className="text-center font-medium">
                                KES{" "}
                                {(product.quantity * product.price).toFixed(2)}
                              </TableCell>
                              <TableCell className="flex gap-2 justify-center">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => {
                                          setSelectedProduct(product);
                                          setShowUpdateDialog(true);
                                        }}
                                      >
                                        <Edit className="h-4 w-4" />
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
                                        onClick={() => {
                                          setSelectedProduct(product);
                                          setShowDeleteDialog(true);
                                        }}
                                      >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                      </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Delete Product</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </TableCell>
                            </TableRow>
                          </TooltipTrigger>
                          {product.isModified && (
                            <TooltipContent side="left">
                              <p className="font-semibold">Modified</p>
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Totals Section */}
              <div className="mt-6 flex justify-end">
                <div className="w-full max-w-sm space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>KES {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Tax (0%):</span>
                    <span>KES {tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>KES {total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>

      {/* Dialogs */}
      <AddProductDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onAdd={handleAddProduct}
      />

      {selectedProduct && (
        <>
          <UpdateProductDialog
            open={showUpdateDialog}
            onOpenChange={setShowUpdateDialog}
            product={selectedProduct}
            onUpdate={handleUpdateProduct}
          />

          <DeleteProductDialog
            open={showDeleteDialog}
            onOpenChange={setShowDeleteDialog}
            product={selectedProduct}
            onDelete={() => handleDeleteProduct(selectedProduct.id)}
          />
        </>
      )}
    </div>
  );
}

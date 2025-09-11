"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Save, MoreHorizontal, Trash2, Edit } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AddProductDialog } from "./[poid]/add-product-dialog";
import { UpdateProductDialog } from "./[poid]/update-product-dialog";
import {
  CreatePurchaseOrderFormData,
  createPurchaseOrderSchema,
} from "@/schemas/purchaseOrderSchema";
import { DeleteProductDialog } from "./delete-product-dialog";

type Product = {
  id: string;
  barcode: string;
  name: string;
  quantity: number;
  price: number;
};

// Mock data for dropdowns
const suppliers = [
  { value: "supplier-1", label: "Tech Solutions Inc." },
  { value: "supplier-2", label: "Office Supplies Co." },
  { value: "supplier-3", label: "Electronics World" },
  { value: "supplier-4", label: "Global Distributors" },
];

const stores = [
  { value: "store-1", label: "Main Store - Downtown" },
  { value: "store-2", label: "Branch Store - Mall" },
  { value: "store-3", label: "Warehouse - Industrial" },
  { value: "store-4", label: "Online Store" },
];

const statusOptions = [
  {
    value: "pending",
    label: "Pending",
    color:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
  },
  {
    value: "approved",
    label: "Approved",
    color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  },
  {
    value: "shipped",
    label: "Shipped",
    color:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
  },
  {
    value: "delivered",
    label: "Delivered",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  },
  {
    value: "cancelled",
    label: "Cancelled",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  },
] as const;

export default function CreatePurchaseOrderPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showUpdateProduct, setShowUpdateProduct] = useState(false);
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const form = useForm<CreatePurchaseOrderFormData>({
    resolver: zodResolver(createPurchaseOrderSchema),
    defaultValues: {
      supplier: "",
      store: "",
      status: "pending",
      dateExpected: "",
      createdBy: "John Doe", // This would typically come from auth context
    },
  });

  const onSubmit: SubmitHandler<CreatePurchaseOrderFormData> = (data) => {
    console.log("[v0] Creating purchase order:", { ...data, products });
    // Here you would typically send the data to your API
    alert("Purchase order created successfully!");
  };

  const handleAddProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: `product-${Date.now()}`,
    };
    setProducts([...products, newProduct]);
    setShowAddProduct(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setShowUpdateProduct(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = () => {
    if (selectedProduct) {
      setProducts(products.filter((p) => p.id !== selectedProduct.id));
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
  const subtotal = products.reduce(
    (sum, product) => sum + product.quantity * product.price,
    0
  );
  const total = subtotal;

  return (
    <div className="container mx-auto py-6 px-4 space-y-6 bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Header */}
      <div className="flex items-center justify-between">
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
        <Button onClick={form.handleSubmit(onSubmit)} className="gap-2">
          <Save className="h-4 w-4" />
          Create Order
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Purchase Order Details */}
          <Card>
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <FormField
                    control={form.control}
                    name="supplier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier *</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select supplier" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {suppliers.map((supplier) => (
                              <SelectItem
                                key={supplier.value}
                                value={supplier.value}
                              >
                                {supplier.label}
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
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select store" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {stores.map((store) => (
                              <SelectItem key={store.value} value={store.value}>
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
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
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
                          <Input type="date" {...field} />
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
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Products Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Products ({products.length})</CardTitle>
                <Button
                  onClick={() => setShowAddProduct(true)}
                  className="gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Product
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {products.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No products added yet</p>
                  <p className="text-sm">Click Add Product to get started</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Barcode</TableHead>
                        <TableHead>Product Name</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                        <TableHead className="w-[50px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-mono text-sm">
                            {product.barcode}
                          </TableCell>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell className="text-right">
                            {product.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ${product.price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ${(product.quantity * product.price).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() => openUpdateDialog(product)}
                                >
                                  <Edit className="h-4 w-4 mr-2" />
                                  Update
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => openDeleteDialog(product)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Items:</span>
                  <span>{products.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Quantity:</span>
                  <span>
                    {products.reduce((sum, p) => sum + p.quantity, 0)}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start gap-2 bg-transparent"
                onClick={() => setShowAddProduct(true)}
              >
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start gap-2 bg-transparent"
                onClick={form.handleSubmit(onSubmit)}
              >
                <Save className="h-4 w-4" />
                Save as Draft
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Dialogs */}
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
          onConfirm={handleDeleteProduct}
        />
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, MoreHorizontal } from "lucide-react";
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
import {
  PurchaseOrderFormData,
  purchaseOrderSchema,
} from "@/schemas/purchaseOrderSchema";
import { AddProductDialog } from "./add-product-dialog";
import { UpdateProductDialog } from "./update-product-dialog";
import { DeleteProductDialog } from "./delete-product-dialog";

type Product = {
  id: string;
  barcode: string;
  name: string;
  quantity: number;
  price: number;
};

type PurchaseOrder = {
  id: string;
  supplier: string;
  store: string;
  status: "pending" | "approved" | "shipped" | "delivered" | "cancelled";
  dateCreated: string;
  dateExpected: string;
  createdBy: string;
  products: Product[];
};

// Mock data
const mockSuppliers = [
  { value: "supplier-1", label: "ABC Electronics Ltd" },
  { value: "supplier-2", label: "Tech Solutions Inc" },
  { value: "supplier-3", label: "Global Parts Co" },
];

const mockStores = [
  { value: "store-1", label: "Main Store - Downtown" },
  { value: "store-2", label: "Branch Store - Mall" },
  { value: "store-3", label: "Warehouse - Industrial" },
];

const mockPurchaseOrder: PurchaseOrder = {
  id: "PO-2024-001",
  supplier: "supplier-1",
  store: "store-1",
  status: "pending",
  dateCreated: "2024-01-15",
  dateExpected: "2024-01-25",
  createdBy: "John Doe",
  products: [
    {
      id: "1",
      barcode: "1234567890123",
      name: "Wireless Mouse",
      quantity: 10,
      price: 25.99,
    },
    {
      id: "2",
      barcode: "2345678901234",
      name: "USB Cable",
      quantity: 50,
      price: 8.5,
    },
    {
      id: "3",
      barcode: "3456789012345",
      name: "Keyboard",
      quantity: 15,
      price: 45.0,
    },
  ],
};

export default function EditPurchaseOrderPage() {
  const [purchaseOrder, setPurchaseOrder] =
    useState<PurchaseOrder>(mockPurchaseOrder);
  const [products, setProducts] = useState<Product[]>(
    mockPurchaseOrder.products
  );
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const form = useForm<PurchaseOrderFormData>({
    resolver: zodResolver(purchaseOrderSchema),
    defaultValues: {
      supplier: purchaseOrder.supplier,
      store: purchaseOrder.store,
      status: purchaseOrder.status,
    },
  });

  const onSubmit = (data: PurchaseOrderFormData) => {
    console.log("[v0] Purchase order form submitted:", data);
    // Handle form submission
  };

  const handleAddProduct = (product: Omit<Product, "id">) => {
    const newProduct = { ...product, id: Date.now().toString() };
    setProducts([...products, newProduct]);
    setShowAddDialog(false);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
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
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="container mx-auto p-6 max-w-6xl bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-balance">Edit Purchase Order</h1>
        <p className="text-muted-foreground">
          Purchase Order ID: {purchaseOrder.id}
        </p>
      </div>

      <div className="grid gap-6">
        {/* Purchase Order Details Form */}
        <Card>
          <CardHeader>
            <CardTitle>Purchase Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="supplier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supplier</FormLabel>
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
                            {mockSuppliers.map((supplier) => (
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
                        <FormLabel>Store</FormLabel>
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
                            {mockStores.map((store) => (
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
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="shipped">Shipped</SelectItem>
                            <SelectItem value="delivered">Delivered</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <FormLabel>Date Created</FormLabel>
                    <Input
                      value={purchaseOrder.dateCreated}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <FormLabel>Date Expected</FormLabel>
                    <Input
                      value={purchaseOrder.dateExpected}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <FormLabel>Created By</FormLabel>
                    <Input
                      value={purchaseOrder.createdBy}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full md:w-auto">
                  Save Changes
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Products Section */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Products</CardTitle>
            <Button onClick={() => setShowAddDialog(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Product
            </Button>
          </CardHeader>
          <CardContent>
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
                      <TableCell>{product.name}</TableCell>
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
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowUpdateDialog(true);
                              }}
                            >
                              Update
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedProduct(product);
                                setShowDeleteDialog(true);
                              }}
                              className="text-destructive"
                            >
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

            {/* Totals Section */}
            <div className="mt-6 flex justify-end">
              <div className="w-full max-w-sm space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax (10%):</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-2">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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

"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/schemas/purchaseReceiptSchema";
import { Trash2 } from "lucide-react";

interface ProductsTableProps {
  products: Product[];
  onRemoveProduct: (id: string) => void;
}

export function ProductsTable({
  products,
  onRemoveProduct,
}: ProductsTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">Image</TableHead>
            <TableHead>Product Code</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead className="text-right">Unit Price</TableHead>
            <TableHead className="text-right">Quantity</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="w-16">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground py-8"
              >
                No products added yet. Click Add Product to get started.
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {product.productName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {product.productCode}
                </TableCell>
                <TableCell>{product.productName}</TableCell>
                <TableCell className="text-right">
                  {formatCurrency(product.unitPrice)}
                </TableCell>
                <TableCell className="text-right">{product.quantity}</TableCell>
                <TableCell className="text-right font-medium">
                  {formatCurrency(product.total)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => product.id && onRemoveProduct(product.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// Defines the possible statuses for a product
export type ProductStatus = "In Stock" | "Low Stock" | "Out of Stock";

// Defines the structure of a Product object
export interface Product {
  id: string;
  serialNumber: string;
  name: string;
  category: string;
  quantity: number;
  status: ProductStatus;
  price: number;
  image: string;
}

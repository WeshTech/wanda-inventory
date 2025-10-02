//found at
export type FoundAtType = "catalogue" | "business";

//single product
export type FoundProductData = {
  name: string;
  id: string;
  description: string;
  brand: string;
  imageUrl: string;
  unit: string;
};

//product response
export interface FindProductByBarcodeResponse {
  success: boolean;
  foundAt: FoundAtType | null;
  data: FoundProductData | null;
}

// single product object
export type ProductData = {
  productId: string;
  createdAt: string | null;
};

// product creation response
export type CreateBusinessProductResponse = {
  success: boolean;
  message: string;
  data: ProductData | null;
};

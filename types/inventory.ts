//found at
export type FoundAtType = "catalogue" | "business";

//single product
export type FoundProductData = {
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

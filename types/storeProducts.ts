//single product response
export type StoreProductSearchResult = {
  storeProductId: string;
  productCode: string;
  productName: string;
  imageUrl?: string;
};

// products response structure
export type SearchStoreProductResponse = {
  success: boolean;
  message: string;
  data: StoreProductSearchResult[] | null;
}

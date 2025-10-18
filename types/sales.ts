// single sale product
export type StoreSaleProduct = {
  productId: string;
  imgUrl: string | null;
  productCode: string | null;
  productName: string | null;
  category: string | null;
  quantity: number;
  price: number;
};

// sale product response
export type GetStoreSaleProductsResult = {
  success: boolean;
  message: string;
  data: StoreSaleProduct[] | null;
};

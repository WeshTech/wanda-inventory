import { useQuery } from "@tanstack/react-query";
import { FindProductByBarcodeResponse } from "@/types/inventory";
import { getProductApi } from "@/server/inventory/get-product";

//find product by barcode
export function useFindProductByBarcode(
  businessId: string,
  barcode: string,
  qEnabled: boolean
) {
  return useQuery<FindProductByBarcodeResponse, Error>({
    queryKey: ["findProductByBarcode", businessId, barcode],
    queryFn: () => getProductApi(businessId, barcode),
    enabled: qEnabled,
    staleTime: 1000 * 60 * 5,
  });
}

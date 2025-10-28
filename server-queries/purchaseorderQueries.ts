import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CreatePurchaseOrderResponse,
  GeneratePurchaseOrderResponse,
  PurchaseOrderDetailResponse,
  PurchaseOrderResponse,
  SearchBusinessProductResponse,
  UpdatePurchaseOrderResponse,
} from "@/types/purchaseorder";
import { generatePurchaseOrderApi } from "@/server/purchaseorder/generate-purchaseorder";
import { GeneratePurchaseOrderFormData } from "@/schemas/purchaseorder/generatePurchaseorderSchema";
import { getPurchaseordersApi } from "@/server/purchaseorder/get-purchaseorder";
import { getPurchaseorderByIdApi } from "@/server/purchaseorder/get-PO-by-id";
import { CreatePurchaseOrderFormData } from "@/schemas/purchaseOrderSchema";
import { updatePurchaseorderByIdApi } from "@/server/purchaseorder/update-PO-byId";
import { searchBusinessProductsPOApi } from "@/server/purchaseorder/search-products";
import { createPurchaseordersApi } from "@/server/purchaseorder/create-PO";
import { UpdatePurchaseOrderFormData } from "@/schemas/purchaseorder/updatePOSchema";

// Hook to generate a purchase order
export const useGeneratePurchaseOrder = (): UseMutationResult<
  GeneratePurchaseOrderResponse,
  Error,
  {
    formData: GeneratePurchaseOrderFormData;
    businessId: string;
    userId: string;
  }
> => {
  const queryClient = useQueryClient();

  return useMutation<
    GeneratePurchaseOrderResponse,
    Error,
    {
      formData: GeneratePurchaseOrderFormData;
      businessId: string;
      userId: string;
    }
  >({
    mutationKey: ["generatepurchaseorder"],
    mutationFn: ({ formData, businessId, userId }) =>
      generatePurchaseOrderApi(formData, businessId, userId),
    onSuccess: (_, { businessId }) => {
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrders", businessId],
      });
    },
  });
};

// Get purchase orders
export const useGetPurchaseOrders = (
  businessId: string,
  page: number = 1,
  pageSize: number = 10
): UseQueryResult<PurchaseOrderResponse, Error> => {
  return useQuery<PurchaseOrderResponse, Error>({
    queryKey: ["purchaseOrders", businessId, page, pageSize],
    queryFn: () => getPurchaseordersApi(businessId, { page, pageSize }),
    enabled: !!businessId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Get purchase order by ID
export const usePurchaseOrderDetail = (
  businessId: string,
  purchaseOrderId: string
): UseQueryResult<PurchaseOrderDetailResponse, Error> => {
  return useQuery({
    queryKey: ["purchaseOrderDetail", businessId, purchaseOrderId],
    queryFn: async () => getPurchaseorderByIdApi(businessId, purchaseOrderId),
    enabled: !!businessId && !!purchaseOrderId,
    staleTime: 5,
  });
};

// Update purchase order by ID
export const useUpdatePurchaseOrder = (businessId: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdatePurchaseOrderResponse,
    Error,
    UpdatePurchaseOrderFormData
  >({
    mutationFn: async (formData) => {
      return await updatePurchaseorderByIdApi(formData, businessId);
    },
    onSuccess: (data) => {
      // Invalidate the specific purchase order detail query
      if (data?.data?.purchaseOrderId) {
        queryClient.invalidateQueries({
          queryKey: [
            "purchaseOrderDetail",
            businessId,
            data.data.purchaseOrderId,
          ],
        });
      }
      //invalidate the purchase orders list query
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrders", businessId],
      });
    },
  });
};

//search products for purchase order
export const useSearchBusinessProductsPO = (
  businessId: string,
  userId: string,
  searchTerm: string
) => {
  return useQuery<SearchBusinessProductResponse>({
    queryKey: ["searchBusinessProductsPO", businessId, userId, searchTerm],
    queryFn: () => searchBusinessProductsPOApi(businessId, userId, searchTerm),
    enabled: Boolean(businessId && userId && searchTerm),
    staleTime: 5,
  });
};

// create purchase order
export const useCreatePurchaseOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CreatePurchaseOrderResponse,
    Error,
    {
      formData: CreatePurchaseOrderFormData;
      businessId: string;
      userId: string;
    }
  >({
    mutationKey: ["createPurchaseOrder"],
    mutationFn: ({ formData, businessId, userId }) =>
      createPurchaseordersApi(formData, businessId, userId),

    onSuccess: (_, variables) => {
      // invalidate the get purchase orders query for the same businessId
      queryClient.invalidateQueries({
        queryKey: ["purchaseOrders", variables.businessId],
      });
    },
  });
};

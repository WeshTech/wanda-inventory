// single category data
export interface CategoryData {
  categoryId: string;
  name: string;
  description: string | null;
  quantity: number;
}

// response for creating one category
export interface CreateCategoryDataResponse {
  success: boolean;
  message: string;
  data: CategoryData | null;
}

// Single category DTO
export interface GetCategoryData {
  categoryId: string;
  name: string;
  description: string | null;
  quantity: number;
  storeName: string;
}

// response for getting multiple categories
export interface GetBusinessCategoryDataResponse {
  success: boolean;
  message: string;
  data: GetCategoryData[];
}

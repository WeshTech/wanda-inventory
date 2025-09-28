//single category data
export interface CategoryData {
  categoryId: string;
  name: string;
  description: string | null;
  quantity: number;
}

//category response
export interface CreateCategoryDataResponse {
  success: boolean;
  message: string;
  data: CategoryData | null;
}

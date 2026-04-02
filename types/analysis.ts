//analysis time response
export type AnalysisTimeResponse = {
  success: boolean;
  message: string;
  date: string | null;
};

//single product
export interface RegionalRecommendationItem {
  business_product_id: string;
  product_name: string;
  brand: string;
  total_quantity: number;
  county: string;
  business_count: number;
  constituency: string;
  ward: string;
  unit: string;
  business_type: string;
  total_revenue: number;
  avg_daily_quantity: number;
}

//regional filters
export interface RegionalRecommendationsFilters {
  county: string;
  constituency: string;
  ward: string;
  business_type: string;
  days: number;
  limit: number;
}

//combined data
export interface RegionalRecommendationsData {
  filters: RegionalRecommendationsFilters;
  total_recommendations: number;
  recommendations: RegionalRecommendationItem[];
}

//regional response
export interface RegionalRecommendationsResponse {
  success: boolean;
  message: string;
  data: RegionalRecommendationsData;
}

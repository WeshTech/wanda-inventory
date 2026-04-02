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

// ── Restock Recommendations ───────────────────────────────────────────────────

// export type RestockSignal = 'HIGH' | 'MEDIUM' | 'LOW';
export type RestockSignal = string;

export interface RestockRecommendationItem {
  business_product_id: string;
  product_name: string;
  brand: string;
  business_type: string;
  county: string;
  constituency: string;
  ward: string;
  total_quantity: number;
  total_revenue: number;
  transaction_count: number;
  rank: number;
  restock_signal: RestockSignal;
  insight: string;
}

export interface RestockRecommendationsFilters {
  business_type: string;
  county: string;
  constituency: string;
  ward: string;
  days: number;
  limit: number;
}

export interface RestockRecommendationsData {
  filters: RestockRecommendationsFilters;
  total_items: number;
  items: RestockRecommendationItem[];
}

export interface RestockRecommendationsResponse {
  success: boolean;
  message: string;
  data: RestockRecommendationsData;
}

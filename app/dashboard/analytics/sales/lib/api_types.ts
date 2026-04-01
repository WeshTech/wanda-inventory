// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// ==================== Forecast Data Types ====================

export interface ForecastPoint {
  ds: string; // ISO date
  yhat: number;
  yhat_lower: number;
  yhat_upper: number;
}

export interface StoreSalesForecastData {
  store_id: string;
  forecast: ForecastPoint[];
}

export interface ProductSalesForecastData {
  store_id: string;
  store_product_id: string;
  forecast: ForecastPoint[];
}

export interface BusinessProfitForecastData {
  business_id: string;
  forecast: ForecastPoint[];
}

// ==================== Analytics Data Types ====================

export interface DailySalesRecord {
  sale_date: string;
  total_sales: number;
  total_transactions: number;
}

export interface StoreSalesHistoryData {
  store_id: string;
  records: DailySalesRecord[];
}

// ==================== Recommendation Data Types ====================

export interface FastMovingGoodsItem {
  business_product_id: string;
  product_name: string;
  total_revenue: number;
  insight: string;
}

export interface FastMovingGoodsData {
  store_id: string;
  products: FastMovingGoodsItem[];
}

export interface WeekendHotSalesItem {
  business_product_id: string;
  product_name: string;
  weekend_sales: number;
  insight: string;
}

export interface WeekendHotSalesData {
  store_id: string;
  products: WeekendHotSalesItem[];
}

export interface SeasonalProductsItem {
  business_product_id: string;
  product_name: string;
  seasonal_trend: string;
  insight: string;
}

export interface SeasonalProductsData {
  store_id: string;
  products: SeasonalProductsItem[];
}

export interface RestockItem {
  business_product_id: string;
  product_name: string;
  restock_signal: "HIGH" | "MEDIUM" | "LOW";
  insight: string;
}

export interface RestockData {
  business_type: string;
  products: RestockItem[];
}

export interface RegionalRecommendationsItem {
  business_product_id: string;
  product_name: string;
  regional_demand: string;
  insight: string;
}

export interface RegionalRecommendationsData {
  location: string;
  products: RegionalRecommendationsItem[];
}

// ==================== Request Filter Types ====================

export interface ForecastFilters {
  store_id: string;
  history_days: number;
  forecast_days: number;
}

export interface ProductForecastFilters {
  store_id: string;
  store_product_id: string;
  history_days: number;
  forecast_days: number;
}

export interface BusinessForecastFilters {
  business_id: string;
  history_days: number;
  forecast_days: number;
}

export interface AnalyticsFilters {
  store_id: string;
  days: number;
}

export interface RecommendationFilters {
  store_id?: string;
  business_type?: string;
  county?: string;
  constituency?: string;
  ward?: string;
  days: number;
  limit: number;
}

export interface LocationFilters {
  county?: string;
  constituency?: string;
  ward?: string;
}

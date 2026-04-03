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

//weekend hot sales data

export interface WeekendHotSalesFilters {
  store_id: string;
  days?: number; // default: 3650, min: 1, max: 3650
  limit?: number; // default: 10, min: 1, max: 50
}
export interface WeekendHotSaleItem {
  business_product_id: string;
  product_name: string;
  total_quantity: number;
  total_revenue: number;
  rank: number;
  insight: string;
}

export interface WeekendHotSalesData {
  store_id: string;
  days: number;
  limit: number;
  total_items: number;
  items: WeekendHotSaleItem[];
}

export interface WeekendHotSalesResponse {
  success: boolean;
  message: string;
  data: WeekendHotSalesData;
}

//seasonal product types

export interface SeasonalFilters {
  store_id: string;
  days?: number; // default: 3650, min: 30, max: 3650
  limit?: number; // default: 20, min: 1, max: 100
}
export interface SeasonalProductItem {
  business_product_id: string;
  product_name: string;
  brand: string;
  sale_month: number;
  total_quantity: number;
  total_revenue: number;
  season: string;
  insight: string;
}

export interface SeasonalProductsData {
  store_id: string;
  days: number;
  limit: number;
  total_items: number;
  items: SeasonalProductItem[];
}

export interface SeasonalProductsResponse {
  success: boolean;
  message: string;
  data: SeasonalProductsData;
}

//fast moving goods
export interface FastMovingFilters {
  store_id: string;
  days?: number; // default: 3650, min: 1, max: 3650
  limit?: number; // default: 10, min: 1, max: 50
}

export interface FastMovingGoodItem {
  business_product_id: string;
  product_name: string;
  brand: string;
  total_quantity: number;
  total_revenue: number;
  rank: number;
  insight: string;
}

export interface FastMovingGoodsData {
  store_id: string;
  days: number;
  limit: number;
  total_items: number;
  items: FastMovingGoodItem[];
}

export interface FastMovingGoodsResponse {
  success: boolean;
  message: string;
  data: FastMovingGoodsData;
}

//intelligenct types
// ─── Filters ────────────────────────────────────────────────────────────────

export interface StoreIntelligenceFilters {
  store_id: string;
  county: string;
  constituency: string;
  ward: string;
  lookback_days: number;
}

// ─── Store Rank ──────────────────────────────────────────────────────────────

export interface StoreRank {
  store_id: string;
  ward: string;
  county: string;
  constituency: string;
  ward_rank: number;
  total_stores_in_ward: number;
  composite_score: number;
  sale_volume_average: number;
  revenue_gain_average: number;
  total_transactions: number;
  active_sale_days: number;
  unique_products_sold: number;
  avg_transaction_value: number;
  supply_average: number;
  supply_quality_score: number;
  unique_suppliers: number;
  po_fulfilment_rate: number;
  stock_health_score: number;
  out_of_stock_count: number;
  low_stock_count: number;
  stockout_risk_average: number;
  days_of_inventory_average: number;
}

// ─── Product Item ─────────────────────────────────────────────────────────────

export type ForecastTrend = "up" | "down" | "stable";

export type StockoutRiskLevel = "low" | "medium" | "high" | "critical";

export type DeadStockRiskLevel = "low" | "medium" | "high";

export type SuggestedAction =
  | "healthy"
  | "reorder immediately"
  | "reorder soon"
  | "liquidate"
  | "monitor"
  | "discontinue";

export interface StoreIntelligenceItem {
  store_product_id: string;
  business_product_id: string;
  product_catalogue_id: string | null;
  barcode: string | null;
  sku: string | null;
  name: string;
  brand: string | null;
  unit: string;
  category_name: string;
  selling_price: number;
  quantity_on_hand: number;
  min_stock_level: number;
  instock: boolean;

  // Sales rates
  ward_daily_sale_rate: number;
  store_daily_sale_rate: number;
  blended_daily_sale_rate: number;
  ward_sale_frequency: number;
  store_sale_frequency: number;
  sale_frequency: number;

  // Forecasting
  prophet_daily_forecast: number;
  forecast_next_7_days_units: number;
  forecast_next_30_days_units: number;
  forecast_trend: ForecastTrend;

  // Risk & inventory health
  days_of_inventory: number;
  stockout_risk_score: number;
  stockout_risk_level: StockoutRiskLevel;
  dead_stock_risk_score: number;
  dead_stock_risk_level: DeadStockRiskLevel;

  // Activity
  last_sale_at: string; // ISO 8601 datetime string
  days_since_last_sale: number;
  suggested_action: SuggestedAction;
}

// ─── Data Payload ─────────────────────────────────────────────────────────────

export interface StoreIntelligenceData {
  filters: StoreIntelligenceFilters;
  store_rank: StoreRank;
  total_products: number;
  items: StoreIntelligenceItem[];
}

// ─── Top-level API Response ───────────────────────────────────────────────────

export interface StoreIntelligenceResponse {
  success: boolean;
  message: string;
  data: StoreIntelligenceData;
}

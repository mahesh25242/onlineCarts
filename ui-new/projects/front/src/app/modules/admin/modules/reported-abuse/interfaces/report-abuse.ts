import { Pagination, Shop, ShopProduct } from "../../../../../lib/interfaces";

export interface ReportAbuseType {
  id?: number;
  name?: string;
  description?: string;
  status?: number;
  created_at?: string;
}

export interface ReportAbuse {
  id?: number;
  shop_id?: number;
  url?: string;
  name?: string;
  report_abuse_type_id?: number;
  content?: string;
  shop_product_id?: number;
  shop?: Shop;
  report_abuse_type?: ReportAbuseType
  shop_product?: ShopProduct;
  created_at?: string;
}

export interface ReportAbuseWithPagination extends Pagination {
  data?: ReportAbuse[];
}


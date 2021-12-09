import { Pagination  } from "../../../../../lib/interfaces";

export interface PointCoupon {
  id?: number;
  shop_id?: number;
  code?: string;
  description?: string;
  no_use?:number;
  point?:number;
  start_date?: string;
  end_date?: string;
  status?: number;
  per_shop_use?: number;
  fresh_use?: number;
  created_at?: string;
}

export interface PointCouponsWithPagination extends Pagination {
  data?: PointCoupon[];
}

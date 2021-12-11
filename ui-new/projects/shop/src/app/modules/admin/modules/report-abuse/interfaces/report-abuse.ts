import { Pagination } from "../../../../../lib/interfaces";

export interface ReportAbuseType {
  id?: number;
  name?: string;
  description?: string;
  status?: number;
}

export interface ReportAbuse {
  id?: number;
  shop_id?: number;
  url?: string;
  name?: string;
  report_abuse_type_id?: number;
  content?: string;
}

export interface ReportAbuseWithPagination extends Pagination {
  data?: ReportAbuse[];
}


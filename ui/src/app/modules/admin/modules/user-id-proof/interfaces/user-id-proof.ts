import { Pagination, Shop, ShopProduct } from "src/app/lib/interfaces";

export interface UserIdProofType {
  name?: string,
}

export interface UserIdProof {
  id?: number,
  name?: string,
  user_id?: number,
  file_name?: string,
  status?: number,
  from_date?: string,
  to_date?: string
}

export interface UserIdProofWithPagination extends Pagination {
  data?: UserIdProof[]
}


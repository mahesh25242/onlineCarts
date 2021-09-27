import { Pagination, Shop, ShopProduct } from "src/app/lib/interfaces";

export interface PrefillMessage {
  id?: number,
  name?: string,
  subject?: string,
  message?: string,
  is_default?:number,
  created_at?: string
}

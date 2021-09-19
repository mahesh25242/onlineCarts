import { User } from "./user";
import { City } from "./city";
import { Country } from "./country";
import { ShopCategory } from './shop-category';
import { State } from "./state";
import { UserRole } from "./user-role";
import { ShopDelivery } from './shop-delivery';
import { ShopDeliverySlot } from "./shop-delivery-slot";

export interface Shop {
  id?: number,
  name?: string,
  email?: string,
  phone?: string,
  address?: string,
  country_id?: number,
  country?: Country,
  state_id?: number,
  state?: State,
  city_id?: number,
  city?: City,
  pin?: string,
  local?: string,
  map?: Object,
  shop_key?: string,
  created_by?: number,
  user?: User,
  status?:number,
  status_text?: string,
  shop_category_id?: number,
  shop_category?: ShopCategory,
  created_at?: string,
  user_role?: UserRole,
  shop_url?: string,
  shop_delivery?: ShopDelivery[],
  shop_delivery_filtered? : { free?: ShopDelivery[], paid?: ShopDelivery[] }
  is_generated?: boolean,
  base_path?: string,
  favicon?: string,
  theme_color?: string,
  bg_color?: string,
  short_name?: string,
  logo?: string,
  icons?: any,
  shop_theme?: ShopTheme,
  is_mobile_verified?: number,
  max_banner?: number,
  shop_delivery_slot?: ShopDeliverySlot[],
  business_hours?: string,
  shop_current_renewal?: ShopRenewal
  shop_renewal?: ShopRenewal[]
}


export interface ShopTheme {
  id?: number,
  shop_id?: number,
  theme_id?: number,
  theme?: Theme
}


export interface Theme {
  id?: number,
  is_default?: number,
  name?: string,
  class?: string,
  theme_color?: string,
  background_color?: string
}

export interface ShopRenewal {
  id?: number,
  shop_id?: number,
  amount?: number,
  from_date?: string,
  to_date?: string,
  status?: number,
  shop?: Shop,
  remaining_days?: number,
  show_message?: boolean,
  show_message_days?: number,
}

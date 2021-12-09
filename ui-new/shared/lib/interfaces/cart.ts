import { ShopDelivery } from './shop-delivery';
import { ShopProduct } from './shop-product';

export interface Cart {
  product?: ShopProduct;
  qty?: number;
  price?: number;
  message?: string;
}

export interface CartDetail {
  detail?: {
    address?: string;
    delivery_date?: string;
    email?: string;
    is_delivery_date?: boolean;
    name?: string;
    note?: string;
    phone?: string;
    pin?: string;
    selectedLocation?: ShopDelivery;
    delivery_slot?: string;
  };
  total?: number;
  grandTotal?: number;
  carts?: Cart[];
}

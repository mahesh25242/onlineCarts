import { ShopDeliveryPageComponent } from './shop-delivery-page.component';
import { ShopDeliveryAndSlotResolver  } from './shop-delivery-and-slot-resolver';
import { ShopDeliveryComponent } from './shop-delivery/shop-delivery.component';
import { CreateShopDeliveryComponent } from './shop-delivery/create-shop-delivery/create-shop-delivery.component';
import { ShopDeliverySlotComponent } from './shop-delivery-slot/shop-delivery-slot.component';
import { CreateShopDeliverySlotComponent } from './shop-delivery-slot/create-shop-delivery-slot/create-shop-delivery-slot.component';

const DeliveryComponents = [
    ShopDeliveryPageComponent,
    ShopDeliveryComponent,
    CreateShopDeliveryComponent,
    ShopDeliverySlotComponent,
    CreateShopDeliverySlotComponent    
];

export {
    ShopDeliveryAndSlotResolver,
    ShopDeliveryPageComponent
}

export default DeliveryComponents;
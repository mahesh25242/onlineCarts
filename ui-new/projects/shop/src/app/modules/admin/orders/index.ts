import { OrdersComponent } from './orders.component';
import { OrdersResolver } from './orders-resolver';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrderSearchComponent } from './order-search/order-search.component';

const OrderComponents = [
    OrdersComponent,
    OrderDetailsComponent,
    OrderSearchComponent    
];


export {
    OrdersComponent,
    OrdersResolver
}

export default OrderComponents;
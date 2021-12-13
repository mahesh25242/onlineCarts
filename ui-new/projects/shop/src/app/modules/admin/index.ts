import { Routes } from '@angular/router';
import { AdminAuthGuard, NegateAuthGuard } from '../../lib/guard';
import { AccountComponent } from './account/account.component';
import CategoryComponents, { CategoriesComponent, CategoriesResolver } from './categories';
import AdminComponents from './components';
import DeliveryComponents, { ShopDeliveryAndSlotResolver, ShopDeliveryPageComponent } from './delivery';
import EditProfileComponents, { EditProfileComponent } from './edit-profile';
import { HomeComponent } from './home/home.component';

import { MyPaymentsComponent } from './my-payments/my-payments.component';
import OrderComponents, { OrdersComponent, OrdersResolver } from './orders';
import ProductsComponents, { CreateProductComponent, CreateProductResolver, ListProductsComponent, ProductsComponent, ProductsResolver } from './products';
import RenewPackageComponents, { RenewPackageComponent} from './renew-package';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { SignInComponent } from './sign-in/sign-in.component';


const AdminDeclarations =[
    AccountComponent,
    ...CategoryComponents,
    ...AdminComponents,
    ...DeliveryComponents,
    ...EditProfileComponents,
     HomeComponent,
    MyPaymentsComponent,
    ...OrderComponents,
    ...ProductsComponents,
    ...RenewPackageComponents,
    ShopDetailsComponent,        
    SignInComponent
];

export const AdminRouts: Routes=[
    {
      path: '',
      component: SignInComponent,
      canActivate: [NegateAuthGuard],
    },
    {
      path: 'home',
      component: HomeComponent,
      canActivate: [AdminAuthGuard],
    },
    {
      path: 'categories',
      component: CategoriesComponent,
      canActivate: [AdminAuthGuard],
      resolve:{
        cats: CategoriesResolver
      }
    },
    {
      path: 'products/:page',
      component: ProductsComponent,
      canActivate: [AdminAuthGuard],
      children:[
        {
          path: '',
          component: ListProductsComponent,
          resolve:{
            products: ProductsResolver
          },
        },
        {
          path: 'add/:id',
          component: CreateProductComponent,
          resolve: {
            product: CreateProductResolver
          }
        },
      ],

      runGuardsAndResolvers: 'always',
    },

    {
      path: 'deliveries',
      component: ShopDeliveryPageComponent,
      canActivate: [AdminAuthGuard],
      resolve:{
        deliveries: ShopDeliveryAndSlotResolver
      }
    },
    {
      path: 'details',
      component: ShopDetailsComponent,
      canActivate: [AdminAuthGuard],
    },
    {
      path: 'orders',
      component: OrdersComponent,
      canActivate: [AdminAuthGuard],
      resolve:{
        orders: OrdersResolver
      }
    },
    {
      path: 'account',
      component: AccountComponent,
      canActivate: [AdminAuthGuard],
      children:[
        {
          path: '',
          component: EditProfileComponent,
        },
        {
          path: 'help-desk',
          loadChildren: () => import('./modules').then(m => m.TicketModule)          
        },
        {
          path: 'my-payments',
          component: MyPaymentsComponent,
        },
        {
          path: 'my-abuses',
          loadChildren: () => import('./modules').then(m => m.ReportAbuseModule)          
        },        
      ]
    },
    {
      path: 'renew',
      component: RenewPackageComponent,
      canActivate: [AdminAuthGuard],
    },
  ];

export default AdminDeclarations;
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { AdminAuthGuard, NegateAuthGuard } from '../lib/guard';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CategoriesResolver } from './categories/categories-resolver';
import { ProductsResolver } from './products/products-resolver';
import { ShopDeliveryAndSlotResolver } from './delivery/shop-delivery-and-slot-resolver';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersResolver } from './orders/orders-resolver';
import { AdminComponent } from './admin.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { ListProductsComponent } from './products/list-product/list-products.component';
import { ShopDeliveryPageComponent } from './delivery/shop-delivery-page.component';
import { CreateProductResolver } from './products/create-product/create-product-resolver';
import { AccountComponent } from './account/account.component';
import { RenewPackageComponent } from './renew-package/renew-package.component';
import { ManageTicketsComponent } from './modules/tickets/manage-tickets/manage-tickets.component';
import { MyPaymentsComponent } from './my-payments/my-payments.component';
import { MyReportedAbusesComponent } from './modules/report-abuse/my-reported-abuses/my-reported-abuses.component';



const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children:[
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
            component: ManageTicketsComponent,
          },
          {
            path: 'my-payments',
            component: MyPaymentsComponent,
          },
          {
            path: 'my-abuses',
            component: MyReportedAbusesComponent,
          },
        ]
      },
      {
        path: 'renew',
        component: RenewPackageComponent,
        canActivate: [AdminAuthGuard],
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

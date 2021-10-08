import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule } from '@tinymce/tinymce-angular';


import { SharedModuleModule } from '../lib/shared-module/shared-module.module';
import { TagModule, TicketModule, ReportAbuseModule, ShopPointsModule } from './modules';

import {  AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoriesResolver } from './categories/categories-resolver';
import { ProductsComponent } from './products/products.component';
import { ListProductsComponent } from './products/list-product/list-products.component';
import { ProductsResolver } from './products/products-resolver';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { CreateProductResolver } from './products/create-product/create-product-resolver';
import { ShopDeliveryComponent } from './delivery/shop-delivery/shop-delivery.component';
import { CreateShopDeliveryComponent } from './delivery/shop-delivery/create-shop-delivery/create-shop-delivery.component';
import { ShopDetailsComponent } from './shop-details/shop-details.component';
import { OrdersComponent } from './orders/orders.component';
import { OrdersResolver } from './orders/orders-resolver';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { OrderSearchComponent } from './orders/order-search/order-search.component';
import { SearchProductComponent } from './products/search-product/search-product.component';
import { ManageBannersComponent } from './components/manage-banners/manage-banners.component';
import { ThemeAndBrandingComponent } from './components/theme-and-branding/theme-and-branding.component';

import { ShopDeliveryPageComponent } from './delivery/shop-delivery-page.component';
import { ShopDeliverySlotComponent } from './delivery/shop-delivery-slot/shop-delivery-slot.component';
import { ShopDeliveryAndSlotResolver } from './delivery/shop-delivery-and-slot-resolver';
import { CreateShopDeliverySlotComponent } from './delivery/shop-delivery-slot/create-shop-delivery-slot/create-shop-delivery-slot.component';
import { ManageCmsComponent } from './components/manage-cms/manage-cms.component';
import { ManageCmsPageComponent } from './components/manage-cms/manage-cms-page/manage-cms-page.component';
import { AccountComponent } from './account/account.component';
import { RenewPackageComponent } from './renew-package/renew-package.component';
import { ChoosePackageComponent } from './renew-package/choose-package/choose-package.component';
import { MyPaymentsComponent } from './my-payments/my-payments.component';
import { UploadUserIdComponent } from './edit-profile/upload-user-id/upload-user-id.component';



@NgModule({
  declarations: [  AdminComponent, SignInComponent, HomeComponent, CategoriesComponent,
    ProductsComponent, ListProductsComponent, EditProfileComponent, CreateCategoryComponent,
    CreateProductComponent, ShopDeliveryComponent, CreateShopDeliveryComponent,
    ShopDetailsComponent, OrdersComponent, OrderDetailsComponent, OrderSearchComponent,
    SearchProductComponent, ManageBannersComponent, ThemeAndBrandingComponent,
    ShopDeliveryPageComponent, ShopDeliverySlotComponent,
    CreateShopDeliverySlotComponent, ManageCmsComponent, ManageCmsPageComponent, AccountComponent, RenewPackageComponent, ChoosePackageComponent, MyPaymentsComponent, UploadUserIdComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModuleModule,
    EditorModule,
    TagModule,
    TicketModule,
    ReportAbuseModule,
    ShopPointsModule
  ],
  providers:[
    CategoriesResolver,
    ProductsResolver,
    ShopDeliveryAndSlotResolver,
    OrdersResolver,
    CreateProductResolver

  ]
})
export class AdminModule { }

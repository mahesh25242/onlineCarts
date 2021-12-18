import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { ProductDetailsComponent } from './product-details.component';


import { ProductDetailsRoutingModule } from './product-details-routing.module';
import { PageComponentsModule } from '../components/page.components.module';
import { ShopSharedModule } from '@shop/app/modules/admin/modules/shared-shop/shared-shop.module';
import { ReportAbuseModule, TagModule } from '@shop/app/modules';

@NgModule({
  declarations: [
    ProductDetailsComponent,       
  ],
  imports: [
    CommonModule,
    ProductDetailsRoutingModule,
    SharedModuleModule,   
    PageComponentsModule ,
    ShopSharedModule,
    ReportAbuseModule,
    TagModule
  ]
})
export class ProductDetailsModule { }

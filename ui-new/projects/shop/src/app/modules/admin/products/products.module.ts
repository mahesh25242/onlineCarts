import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { UploadImageModule } from 'shared/shared-module/upload-imag.module';
import { TagModule } from '../modules/tag/tag.module';
import { QuillModule } from 'ngx-quill'

import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SearchProductComponent } from './search-product/search-product.component';
import { ListProductsComponent } from './list-product/list-products.component';

import { CreateProductComponent } from './create-product/create-product.component';
import { CreateProductStep1Component } from './create-product/create-product-setp-1/create-product-setp-1.component';
import { CreateProductStep2Component } from './create-product/create-product-setp-2/create-product-setp-2.component';

@NgModule({
  declarations: [
    ProductsComponent,
    SearchProductComponent,
    ListProductsComponent,
    CreateProductComponent,

    CreateProductStep1Component,
    CreateProductStep2Component
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModuleModule,
    UploadImageModule,
    TagModule,
    QuillModule.forRoot()
  ]
})
export class ProductsModule { }

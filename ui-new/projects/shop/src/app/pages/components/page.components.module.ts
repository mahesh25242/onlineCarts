import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';

import { SearchBarModule } from './search-bar/search-bar.module';
import { CaroselModule } from './carousel/carosel.module';

import { AddToCartComponent } from './add-to-cart/add-to-cart.component';

import { CategoriesComponent } from './categories/categories.component';
import { ProductComponent } from './products/products.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AddToCartComponent,      
    CategoriesComponent,
    ProductComponent,
    ProductItemComponent,  
  ],
  imports: [
    CommonModule,    
    SharedModuleModule,
    RouterModule,
    SearchBarModule,
    CaroselModule
  ],
  exports: [
    AddToCartComponent,      
    CategoriesComponent,
    ProductComponent,
    ProductItemComponent,  
    SearchBarModule,
    CaroselModule  
  ]
})
export class PageComponentsModule { }

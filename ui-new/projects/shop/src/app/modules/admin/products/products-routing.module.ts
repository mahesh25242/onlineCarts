import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductResolver } from './create-product/create-product-resolver';
import { CreateProductComponent } from './create-product/create-product.component';
import { ListProductsComponent } from './list-product/list-products.component';
import { ProductsResolver } from './products-resolver';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  { 
    path: '', component: ProductsComponent, resolve: { prducts: ProductsResolver},
    children: [
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
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    ProductsResolver,
    CreateProductResolver
  ]
})
export class ProductsRoutingModule { }

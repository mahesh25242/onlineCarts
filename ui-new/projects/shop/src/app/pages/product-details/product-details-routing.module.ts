import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { ProductDetailsComponent } from './product-details.component';
import { ProductDetailsResolver } from './product-details-resolver';


const routes: Routes = [{ path: '', component: ProductDetailsComponent, resolve: { product: ProductDetailsResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ ProductDetailsResolver ]
})
export class ProductDetailsRoutingModule { }

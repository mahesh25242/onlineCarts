import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeProductsResolver } from '../home/home-products-resolver';

import { SearchResultComponent } from './search-result.component';


const routes: Routes = [{ path: '', component: SearchResultComponent, resolve: { product: HomeProductsResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ HomeProductsResolver ]
})
export class SearchResultRoutingModule { }

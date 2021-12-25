import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SearchProductsResolver } from './search-products-resolver';

import { SearchResultComponent } from './search-result.component';


const routes: Routes = [{ path: '', component: SearchResultComponent,
 resolve: { product: SearchProductsResolver } 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ SearchProductsResolver ]
})
export class SearchResultRoutingModule { }

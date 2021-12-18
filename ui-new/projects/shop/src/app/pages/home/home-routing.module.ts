import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeProductsResolver } from './home-products-resolver';
import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent, resolve: { product: HomeProductsResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ HomeProductsResolver ]
})
export class HomeRoutingModule { }

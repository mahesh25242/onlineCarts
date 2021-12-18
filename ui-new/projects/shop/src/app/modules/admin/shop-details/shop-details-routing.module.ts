import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '@shop/app/lib/guard';
import { ShopDetailsComponent } from './shop-details.component';

const routes: Routes = [{ path: '', component: ShopDetailsComponent, canActivate: [AdminAuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopDetailsRoutingModule { }

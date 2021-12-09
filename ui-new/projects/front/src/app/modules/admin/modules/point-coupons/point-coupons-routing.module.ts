import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PointCouponsComponent } from './point-coupons/point-coupons.component';

const routes: Routes = [
  {
    path: '',
    component: PointCouponsComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PointCouponsRoutingModule { }

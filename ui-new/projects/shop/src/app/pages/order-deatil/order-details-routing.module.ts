import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderDeatilResolver } from './order-deatil-resolver';
import { OrderDeatilComponent } from './order-deatil.component';

const routes: Routes = [{ path: '', component: OrderDeatilComponent, resolve: { orders: OrderDeatilResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ OrderDeatilResolver ]
})
export class OrderDetailsRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthGuard, NegateAuthGuard } from '../../lib/guard';
import { RegisterComponent } from './register/register.component';
import { ShopAdminHomeComponent } from './shop-admin.component';




const routes: Routes = [
  {
    path: '',
    component: ShopAdminHomeComponent,
    //canActivate: [AdminAuthGuard],
    children:[
      {
        path:'register',
        component: RegisterComponent
      }
    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopAdminRoutingModule { }

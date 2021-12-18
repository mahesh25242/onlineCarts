import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPaymentsComponent } from './my-payments.component';

const routes: Routes = [{ path: '', component: MyPaymentsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPaymentsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RenewPackageComponent } from './renew-package.component';

const routes: Routes = [{ path: '', component: RenewPackageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenewPackageRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '@shop/app/lib/guard';
import { RenewPackageComponent } from './renew-package.component';

const routes: Routes = [{ path: '', component: RenewPackageComponent, canActivate: [AdminAuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenewPackageRoutingModule { }

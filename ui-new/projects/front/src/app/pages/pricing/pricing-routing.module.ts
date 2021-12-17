import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PackageResolver } from './package-resolver';
import { PricingComponent } from './pricing.component';

const routes: Routes = [{ path: '', component: PricingComponent, resolve: { packages: PackageResolver } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [PackageResolver]
})
export class PricingRoutingModule { }

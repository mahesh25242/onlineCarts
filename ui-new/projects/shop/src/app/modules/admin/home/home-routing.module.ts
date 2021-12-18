import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '@shop/app/lib/guard';
import { HomeComponent } from './home.component';

const routes: Routes = [{ path: '', component: HomeComponent, canActivate: [AdminAuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }

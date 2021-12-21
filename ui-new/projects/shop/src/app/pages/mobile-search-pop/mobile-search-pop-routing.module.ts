import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MobileSearchPopComponent } from './mobile-search-pop.component';

const routes: Routes = [{ path: '', component: MobileSearchPopComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TestRoutingModule { }

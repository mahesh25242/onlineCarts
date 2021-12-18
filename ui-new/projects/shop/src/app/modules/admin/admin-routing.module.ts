import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';

import { AdminRouts } from './';



const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: AdminRouts
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],  
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageTicketsComponent } from './manage-tickets/manage-tickets.component';

const routes: Routes = [
  {
    path: '',
    component: ManageTicketsComponent,    
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }

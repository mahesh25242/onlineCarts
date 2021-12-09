import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListTicketsResolver } from './list-tickets/list-tickets-resolver';
import { ListTicketsComponent } from './list-tickets/list-tickets.component';


import { TicketsComponent } from './tickets.component';


const routes: Routes = [
  {
    path: '',
    component: TicketsComponent,
    children:[
      {
        path:'',
        component: ListTicketsComponent,
        resolve:{
          tkt: ListTicketsResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }

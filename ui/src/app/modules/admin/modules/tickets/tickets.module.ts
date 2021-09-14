import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../../../shared-module/shared-module.module';
import {  TicketsRoutingModule } from './tickets-routing.module';

import { TicketsComponent } from './tickets.component';
import { ListTicketsComponent } from './list-tickets/list-tickets.component';
import { ListTicketsResolver } from './list-tickets/list-tickets-resolver';
import { ViewTicketComponent } from './view-ticket/view-ticket.component';
import { TicketRepliesComponent } from './view-ticket/ticket-replies/ticket-replies.component';

@NgModule({
  declarations: [ TicketsComponent, ListTicketsComponent, ViewTicketComponent, TicketRepliesComponent ],
  imports: [
    CommonModule,
    SharedModuleModule,
    TicketsRoutingModule,

  ],
  providers:[
    ListTicketsResolver
  ]
})
export class TicketsModule { }

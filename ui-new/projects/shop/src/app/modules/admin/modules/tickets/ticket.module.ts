import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';


import { ManageTicketsComponent } from './manage-tickets/manage-tickets.component';
import { TicketRepliesComponent } from './manage-tickets/ticket-replies/ticket-replies.component';
import { CreateTicketComponent } from './create-ticket/create-ticket.component';
import { TicketReplyComponent } from './ticket-reply/ticket-reply.component';

@NgModule({
  declarations: [ManageTicketsComponent, TicketRepliesComponent,
    CreateTicketComponent, TicketReplyComponent],
  imports: [
    CommonModule,
    SharedModuleModule
  ],
  exports:[
    ManageTicketsComponent
  ]
})
export class TicketModule { }

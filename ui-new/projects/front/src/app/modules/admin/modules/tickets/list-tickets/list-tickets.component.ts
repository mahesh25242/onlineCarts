import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';

import { Observable } from 'rxjs';
import { HelpTicket, HelpTicketWithPagination } from '../../../../../lib/interfaces';
import { TicketService } from '../services';
import { ViewTicketComponent } from '../view-ticket/view-ticket.component';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.scss']
})
export class ListTicketsComponent implements OnInit {
  helpTickets$!: Observable<HelpTicketWithPagination | null>;

  displayedColumns: string[] = ['no', 'shop', 'subject', 'dated', 'updated'];

  
  constructor(private ticketService: TicketService,
    private dialog: MatDialog) { }


  goto(page: PageEvent){
    this.ticketService.tickets(null, page.pageIndex).subscribe()

  }
  view(tkt: HelpTicket){
    const modalRef = this.dialog.open(ViewTicketComponent, {
      data: tkt
    });    

  }
  ngOnInit(): void {
    this.helpTickets$ = this.ticketService.allTickets;
  }

}

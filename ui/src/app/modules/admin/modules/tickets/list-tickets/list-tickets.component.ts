import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { HelpTicket, HelpTicketWithPagination } from 'src/app/lib/interfaces';
import { TicketService } from '../services';
import { ViewTicketComponent } from '../view-ticket/view-ticket.component';

@Component({
  selector: 'app-list-tickets',
  templateUrl: './list-tickets.component.html',
  styleUrls: ['./list-tickets.component.scss']
})
export class ListTicketsComponent implements OnInit {
  helpTickets$: Observable<HelpTicketWithPagination>;
  constructor(private ticketService: TicketService,
    private modalService: NgbModal) { }


  loadPage(page){
    this.ticketService.tickets(null, page).subscribe()

  }
  view(tkt: HelpTicket){
    const modalRef = this.modalService.open(ViewTicketComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.ticket = tkt;

  }
  ngOnInit(): void {
    this.helpTickets$ = this.ticketService.allTickets;
  }

}

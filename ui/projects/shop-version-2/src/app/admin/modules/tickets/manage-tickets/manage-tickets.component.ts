import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HelpTicket, HelpTicketType } from '../interfaces';
import { HelpTicketService } from '../services';
import { TicketReplyComponent } from '../ticket-reply/ticket-reply.component';


@Component({
  selector: 'mod-manage-tickets',
  templateUrl: './manage-tickets.component.html',
  styleUrls: ['./manage-tickets.component.scss']
})
export class ManageTicketsComponent implements OnInit {
  comment: string = null;

  tickets$: Observable<HelpTicket[]>
  constructor(private helpTicketService: HelpTicketService,
    public dialog: MatDialog) { }

  reply(tkt: HelpTicket = null){

    const dialogRef = this.dialog.open(TicketReplyComponent, {
      // minWidth: '450px',
      data: {tkt: tkt}
    });

  }
  ngOnInit(): void {
    this.tickets$ = this.helpTicketService.tickets.pipe(mergeMap(res=>{
      if(res) {
        return of(res);
      }else{
        return this.helpTicketService.ticket();
      }
    }));
  }

}

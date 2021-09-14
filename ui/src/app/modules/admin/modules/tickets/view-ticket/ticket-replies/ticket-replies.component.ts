import { Component, Input, OnInit } from '@angular/core';
import { find } from 'lodash';
import { Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HelpTicket } from 'src/app/lib/interfaces';
import { TicketService } from '../../services';
@Component({
  selector: 'app-ticket-replies',
  templateUrl: './ticket-replies.component.html',
  styleUrls: ['./ticket-replies.component.scss']
})
export class TicketRepliesComponent implements OnInit {
  @Input() id: number;

  replies$: Observable<HelpTicket[]>;

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.replies$ = this.ticketService.allTickets.pipe(mergeMap(res=>{

      const replyExists = find(res.data, { id: this.id})

      if(replyExists?.all_children_replies && replyExists.all_children_replies.length){
        return of(replyExists.all_children_replies)
      }else{
        return this.ticketService.replies(this.id)
      }
    }))

  }

}

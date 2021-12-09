import { Component, Input, OnInit } from '@angular/core';
import { find } from 'lodash';
import { Observable, of } from 'rxjs';
import { map, mergeMap, switchMap, take } from 'rxjs/operators';
import { HelpTicket, HelpTicketWithPagination } from '../../../../../../lib/interfaces';
import { TicketService } from '../../services';
@Component({
  selector: 'app-ticket-replies',
  templateUrl: './ticket-replies.component.html',
  styleUrls: ['./ticket-replies.component.scss']
})
export class TicketRepliesComponent implements OnInit {
  @Input() id!: number | undefined;
  isCalled: boolean = false;
  replies$!: Observable<HelpTicket[] | null>;

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.replies$ = this.ticketService.allTickets
    .pipe(switchMap(res=>{

      const replyExists:HelpTicket | undefined = find(res?.data, { id: this.id})

      if(this.isCalled || (replyExists?.all_children_replies && replyExists.all_children_replies.length)){
        return of(replyExists?.all_children_replies)
      }else if(!this.isCalled){
        this.isCalled = true;
        return this.ticketService.replies(this.id);
      }
      return of(null);
    }))

  }

}

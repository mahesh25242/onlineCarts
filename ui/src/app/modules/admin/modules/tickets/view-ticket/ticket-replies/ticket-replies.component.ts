import { Component, Input, OnInit } from '@angular/core';
import { find } from 'lodash';
import { Observable, of } from 'rxjs';
import { map, mergeMap, take } from 'rxjs/operators';
import { HelpTicket } from 'src/app/lib/interfaces';
import { TicketService } from '../../services';
@Component({
  selector: 'app-ticket-replies',
  templateUrl: './ticket-replies.component.html',
  styleUrls: ['./ticket-replies.component.scss']
})
export class TicketRepliesComponent implements OnInit {
  @Input() id: number;
  isCalled: boolean = false;
  replies$: Observable<HelpTicket[]>;

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.replies$ = this.ticketService.allTickets.pipe(mergeMap(res=>{

      const replyExists = find(res.data, { id: this.id})

      if(this.isCalled || (replyExists?.all_children_replies && replyExists.all_children_replies.length)){
        return of(replyExists.all_children_replies)
      }else if(!this.isCalled){
        this.isCalled = true;
        return this.ticketService.replies(this.id);
      }
    }))

  }

}

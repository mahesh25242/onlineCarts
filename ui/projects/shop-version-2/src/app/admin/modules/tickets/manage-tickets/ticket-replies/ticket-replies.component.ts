import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HelpTicket } from '../../interfaces';
import { HelpTicketService } from '../../services';

@Component({
  selector: 'mod-ticket-replies',
  templateUrl: './ticket-replies.component.html',
  styleUrls: ['./ticket-replies.component.scss']
})
export class TicketRepliesComponent implements OnInit {
  @Input() replies: HelpTicket[];
  constructor() { }



  ngOnInit(): void {


  }

}

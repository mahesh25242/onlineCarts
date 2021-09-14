import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { mergeMap } from 'rxjs/operators';
import { HelpTicket } from 'src/app/lib/interfaces';
import { TicketService } from '../services';
import Notiflix from "notiflix";

@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent implements OnInit {
  @Input() ticket: HelpTicket;
  comment: string = '';
  constructor(public activeModal: NgbActiveModal,
    private ticketService: TicketService) { }

  sendReply(){
    Notiflix.Loading.Arrows();
    const postData  = {
      id: this.ticket.id,
      comment: this.comment,
    }
    this.ticketService.sendReply(postData).pipe(mergeMap(res=>{
      return this.ticketService.replies(postData.id);
    })).subscribe(res=>{
      this.comment = '';
      Notiflix.Notify.Success(`Successfully replied to ${this.ticket.subject}  `);
      // this.activeModal.close();
    }, err=>{
      Notiflix.Notify.Failure(`unexpected error`);
    }).add(() =>{
      Notiflix.Loading.Remove();
    });
  }
  ngOnInit(): void {
  }

}

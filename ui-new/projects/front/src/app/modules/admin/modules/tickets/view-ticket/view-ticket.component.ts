import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mergeMap } from 'rxjs/operators';
import { HelpTicket } from '../../../../../lib/interfaces';
import { TicketService } from '../services';


@Component({
  selector: 'app-view-ticket',
  templateUrl: './view-ticket.component.html',
  styleUrls: ['./view-ticket.component.scss']
})
export class ViewTicketComponent implements OnInit {
  
  comment!: FormControl ;
  constructor(
    private ticketService: TicketService, 
    public dialogRef: MatDialogRef<ViewTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public ticket: HelpTicket) { }

  sendReply(){
    
    const postData  = {
      id: this.ticket.id,
      comment: this.comment.value,
    }
    this.ticketService.sendReply(postData).pipe(mergeMap(res=>{
      return this.ticketService.replies(postData.id);
    })).subscribe({
      next: (res)=>{
        this.comment.setValue('');
      }
    });
  }
  ngOnInit(): void {
    this.comment = new FormControl('');
  }

}

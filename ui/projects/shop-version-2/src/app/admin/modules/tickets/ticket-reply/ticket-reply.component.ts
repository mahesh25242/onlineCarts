import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Notiflix from "notiflix";
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HelpTicket, HelpTicketType } from '../interfaces';
import { HelpTicketService } from '../services';

@Component({
  selector: 'mod-ticket-reply',
  templateUrl: './ticket-reply.component.html',
  styleUrls: ['./ticket-reply.component.scss']
})
export class TicketReplyComponent implements OnInit {
  ticketFrm: FormGroup;
  types$: Observable<HelpTicketType[]>
  constructor(private helpTicketService: HelpTicketService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TicketReplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {tkt?: HelpTicket}) { }

  get f(){ return this.ticketFrm.controls; }

  save(){
    Notiflix.Loading.Arrows();
    const postData = {
      id: this.f.id.value,
      reason: this.f.reason.value,
    }
    this.helpTicketService.saveTicket(postData).pipe(mergeMap(res=>{
      return this,this.helpTicketService.ticket();
    })).subscribe(res=>{
      Notiflix.Notify.Success(`Successfully submited your ticket. `);
      this.ticketFrm.reset();
      this.dialogRef.close();
    }, error=>{
      if(error.status == 422){
        for(let result in this.ticketFrm.controls){
          if(error.error.errors[result]){
            this.ticketFrm.controls[result].setErrors({ error: error.error.errors[result] });
          }else{
            this.ticketFrm.controls[result].setErrors(null);
          }
        }
      }else{
      Notiflix.Notify.Failure(`sorry some unexpected error occur please try again later`);
      }
    }).add(() =>{
      Notiflix.Loading.Remove();
    });
  }

  ngOnInit(): void {
    this.ticketFrm = this.formBuilder.group({
      id: [this.data.tkt.id, []],
      reason: [null, []],
    });


  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  ticketFrm!: FormGroup;
  types$!: Observable<HelpTicketType[]>
  constructor(private helpTicketService: HelpTicketService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TicketReplyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {tkt?: HelpTicket},
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any) { }

  get f(){ return this.ticketFrm.controls; }

  save(){
    this.notiflix.loading.standard();    
    const postData = {
      id: this.f?.['id'].value,
      reason: this.f?.['reason'].value,
    }
    this.helpTicketService.saveTicket(postData).pipe(mergeMap(res=>{
      return this,this.helpTicketService.ticket();
    })).subscribe({
      complete: () =>{
        this._snackBar.open(`Successfully submited your ticket `, 'Close');
        this.ticketFrm.reset();
        this.dialogRef.close();
      },
      error: (err) =>{
        if(err.status == 422){
          for(let result in this.ticketFrm.controls){
            if(err.error.errors[result]){
              this.ticketFrm.controls[result].setErrors({ error: err.error.errors[result] });
            }else{
              this.ticketFrm.controls[result].setErrors(null);
            }
          }
        }
      }
    }).add(()=>{
      this.notiflix.loading.remove();    
    });
   
  }

  ngOnInit(): void {
    this.ticketFrm = this.formBuilder.group({
      id: [this.data?.tkt?.id, []],
      reason: [null, []],
    });


  }

}

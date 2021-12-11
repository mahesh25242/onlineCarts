import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HelpTicketType } from '../interfaces';
import { HelpTicketService } from '../services';

@Component({
  selector: 'mod-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {
  ticketFrm!: FormGroup;
  types$!: Observable<HelpTicketType[]>
  constructor(private helpTicketService: HelpTicketService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any) { }

  get f(){ return this.ticketFrm.controls; }

  save(){
    this.notiflix.loading.standard();    
    
    const postData = {
      type: this.f?.['type']?.value,
      subject: this.f?.['subject']?.value,
      reason: this.f?.['reason']?.value,
    }
    this.helpTicketService.saveTicket(postData).pipe(mergeMap(res=>{
      return this,this.helpTicketService.ticket();
    })).subscribe({
      complete: () =>{
        this._snackBar.open(`Successfully deleted `, 'Close');
        this.ticketFrm.reset();
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
      type: [null, []],
      subject: [null, []],
      reason: [null, []],
    });

    this.types$ = this.helpTicketService.types();

  }

}

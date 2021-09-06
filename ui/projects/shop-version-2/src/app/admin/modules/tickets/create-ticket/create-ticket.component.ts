import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import Notiflix from "notiflix";
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
  ticketFrm: FormGroup;
  types$: Observable<HelpTicketType[]>
  constructor(private helpTicketService: HelpTicketService,
    private formBuilder: FormBuilder) { }

  get f(){ return this.ticketFrm.controls; }

  save(){
    Notiflix.Loading.Arrows();
    const postData = {
      type: this.f.type.value,
      subject: this.f.subject.value,
      reason: this.f.reason.value,
    }
    this.helpTicketService.saveTicket(postData).pipe(mergeMap(res=>{
      return this,this.helpTicketService.ticket();
    })).subscribe(res=>{
      Notiflix.Notify.Success(`Successfully submited your ticket. `);
      this.ticketFrm.reset();
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
      type: [null, []],
      subject: [null, []],
      reason: [null, []],
    });

    this.types$ = this.helpTicketService.types();

  }

}

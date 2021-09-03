import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HelpTicket, HelpTicketType } from 'src/app/lib/interfaces';
import { HelpTicketService } from 'src/app/lib/services';
import Notiflix from "notiflix";

@Component({
  selector: 'app-help-desk',
  templateUrl: './help-desk.component.html',
  styleUrls: ['./help-desk.component.scss']
})
export class HelpDeskComponent implements OnInit {
  ticketFrm: FormGroup;
  types$: Observable<HelpTicketType[]>
  tickets$: Observable<HelpTicket[]>
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
    }, err=>{
      Notiflix.Notify.Failure(`sorry some unexpected error occur please try again later`);
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
    this.types$ = this.helpTicketService.ticket().pipe(mergeMap(res=>{
      return this.helpTicketService.types();
    }));
    this.tickets$ = this.helpTicketService.tickets;
  }

}

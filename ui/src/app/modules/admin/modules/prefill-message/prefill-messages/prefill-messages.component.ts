import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PrefillMessage } from '../interfaces';
import { PrefillMessageService } from '../services';
import { CreateNewComponent } from './create-new/create-new.component';
import { SentOnWhatsappComponent } from './sent-on-whatsapp/sent-on-whatsapp.component';

@Component({
  selector: 'app-prefill-messages',
  templateUrl: './prefill-messages.component.html',
  styleUrls: ['./prefill-messages.component.scss']
})
export class PrefillMessagesComponent implements OnInit {
  messages$: Observable<PrefillMessage[]>;
  private recall$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(private prefillMessageService: PrefillMessageService,
    private modalService: NgbModal) { }

  createOrEdit(ra: PrefillMessage = null){
    const modalRef = this.modalService.open(CreateNewComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.ra = ra;

    modalRef.result.then((result) => {
      if(result){
        this.recall$.next(true);
      }
    }, (reason) => {

    })
  }


  sentOnWhatsapp(pm: PrefillMessage = null){
    const modalRef = this.modalService.open(SentOnWhatsappComponent, {
      size: 'lg'
    });
    modalRef.componentInstance.pm = pm;

    modalRef.result.then((result) => {
      if(result){
        this.recall$.next(true);
      }
    }, (reason) => {

    })
  }

  ngOnInit(): void {
    this.messages$ = this.recall$.pipe(mergeMap(res=> this.prefillMessageService.messages() ));
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
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
  messages$!: Observable<PrefillMessage[]>;
  private recall$: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null);

  displayedColumns: string[] = ['id', 'name', 'subject', 'default_text',  'options'];


  constructor(private prefillMessageService: PrefillMessageService,
    public dialog: MatDialog) { }

  createOrEdit(ra: PrefillMessage | null = null){
    const dialogRef = this.dialog.open(CreateNewComponent,{
      data: ra
    });

    dialogRef.afterClosed().subscribe(result => {
      this.recall$.next(true);
    });


    
  }


  sentOnWhatsapp(pm: PrefillMessage | null = null){

    const dialogRef = this.dialog.open(SentOnWhatsappComponent,{
      data: pm
    });
        

    dialogRef.afterClosed().subscribe(result => {
      this.recall$.next(true);
    });

  }

  ngOnInit(): void {
    this.messages$ = this.recall$.pipe(mergeMap(res=> this.prefillMessageService.messages() ));
  }

}

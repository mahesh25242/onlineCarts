import { Component, OnDestroy, OnInit } from '@angular/core';
import { GeneralService } from '../../lib/services';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {

  constructor(    private generalService: GeneralService ) {
    generalService.isAdmin$.next(true);
   }

  ngOnInit(): void {    
    
  }



  ngOnDestroy(){
    this.generalService.isAdmin$.next(null);
  }
}

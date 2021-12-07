import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, Observable, interval, timer } from 'rxjs';
import * as _ from 'lodash';
import { map, mergeMap, takeUntil, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/lib/services';
import { sample } from 'lodash';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit, OnDestroy {
  

  constructor() { }

  ngOnInit(): void {
   
    

  }

  ngOnDestroy(){

  }
}

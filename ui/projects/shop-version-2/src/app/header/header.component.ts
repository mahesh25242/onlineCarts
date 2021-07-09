import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Observable, Subscription } from 'rxjs';
import { BC, Shop } from 'src/app/lib/interfaces';
import {  ShopService } from 'src/app/lib/services';
import { mergeMap, map, delay } from 'rxjs/operators';
import { GeneralService as LocalGeneralService } from '../lib/services/index';
import { GeneralService } from 'src/app/lib/services';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  bc$: Observable<BC>;
  title : string = environment.siteName;
  @Output() public sidenavToggle = new EventEmitter();
  isSearch: boolean = false;

  isDemoSite: boolean = false;
  shop$: Observable<Shop>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private shopService: ShopService,
    public generalService: GeneralService,
    public localGeneralService: LocalGeneralService,
    ) {

    }

    showSearch(){
      this.isSearch = !this.isSearch
    }

  ngOnInit(): void {
    this.isDemoSite = (environment.shopKey == environment.demoShopKey);

    this.shop$ = this.shopService.aShop;

    this.bc$ = this.generalService.bc;


  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }


  ngOnDestroy(){

  }
}

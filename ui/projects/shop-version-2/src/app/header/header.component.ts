import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { BC, Shop } from 'src/app/lib/interfaces';
import {  ShopService, CmsService } from 'src/app/lib/services';
import { GeneralService as LocalGeneralService } from '../lib/services/index';
import { GeneralService } from 'src/app/lib/services';

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

  pages$: Observable<any>= null;
  isDemoSite: boolean = false;
  shop$: Observable<Shop>;

  constructor(
    private shopService: ShopService,
    public generalService: GeneralService,
    public localGeneralService: LocalGeneralService,
    private cmsService: CmsService
    ) {

    }

    showSearch(){
      this.isSearch = !this.isSearch
    }

  ngOnInit(): void {
    this.isDemoSite = (environment.shopKey == environment.demoShopKey);

    this.shop$ = this.shopService.aShop;

    this.pages$ = this.cmsService.getPages;
    this.bc$ = this.generalService.bc;


  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }


  ngOnDestroy(){

  }
}

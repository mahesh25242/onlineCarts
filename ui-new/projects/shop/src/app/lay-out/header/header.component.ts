import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable, tap } from 'rxjs';
import { BC, Shop } from '../../lib/interfaces';
import {  ShopService, CmsService } from '../../lib/services';
import { GeneralService  } from '../../lib/services/index';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  bc$!: Observable<BC | null>;
  title : string | null | undefined= environment.siteName;
  @Output() public sidenavToggle = new EventEmitter();
  isSearch: boolean = false;

  pages$: Observable<any> | null= null;
  isDemoSite: boolean = false;
  shop$!: Observable<Shop | null>;

  constructor(
    private shopService: ShopService,
    public generalService: GeneralService,    
    private cmsService: CmsService
    ) {

    }

    showSearch(){
      this.isSearch = !this.isSearch
    }

  ngOnInit(): void {
    this.isDemoSite = (environment.shopKey == environment.demoShopKey);

    this.shop$ = this.shopService.aShop;

    this.pages$ = this.cmsService.mainMenus();
    this.bc$ = this.generalService.bc;


  }

  onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }


  ngOnDestroy(){

  }
}

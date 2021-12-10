import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Shop, ShopDelivery } from '../../lib/interfaces';
import { GeneralService, ShopService } from '../../lib/services';
import { environment } from '../../../environments/environment';
import { MobileContactComponent } from './mobile-contact/mobile-contact.component';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  shop$!: Observable<Shop & {branches?: ShopDelivery[], isDemoSite?: boolean}>;

  constructor(private generalService: GeneralService,
    private shopService: ShopService,
    private _bottomSheet: MatBottomSheet) { }

    openBottomSheet(){
      this._bottomSheet.open(MobileContactComponent);

    }
  ngOnInit(): void {
    this.generalService.bc$.next({
      siteName: (environment?.siteName) ? environment?.siteName : '',
      title: 'Contact Us',
      url:'',
      backUrl: undefined
    });

    this.shop$ = this.shopService.aShop.pipe(map(res=>{

      const isDemoSite = (environment.shopKey == environment.demoShopKey);
      const shop_delivery =  res?.shop_delivery?.filter(sd=> sd.need_cust_loc == 0)
      res = {...res, ...{branches: shop_delivery, isDemoSite: isDemoSite}}
      return res;

    }))
  }

}

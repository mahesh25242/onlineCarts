import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Shop, ShopDelivery } from 'src/app/lib/interfaces';
import { GeneralService, ShopService } from 'src/app/lib/services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  shop$: Observable<Shop & {branches?: ShopDelivery[]}>;

  constructor(private generalService: GeneralService,
    private shopService: ShopService) { }

  ngOnInit(): void {
    this.generalService.bc$.next({
      siteName: environment.siteName,
      title: 'Contact Us',
      url:'',
      backUrl: null
    });

    this.shop$ = this.shopService.aShop.pipe(map(res=>{


      const shop_delivery =  res?.shop_delivery.filter(sd=> sd.need_cust_loc == 0)
      res = {...res, ...{branches: shop_delivery}}
      return res;

    }))
  }

}

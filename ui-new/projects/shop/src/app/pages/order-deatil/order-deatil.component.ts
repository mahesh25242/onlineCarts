import { PlatformLocation } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Shop, ShopOrder } from '../../lib/interfaces';
import { GeneralService, ShopService } from '../../lib/services';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-order-deatil',
  templateUrl: './order-deatil.component.html',
  styleUrls: ['./order-deatil.component.scss']
})
export class OrderDeatilComponent implements OnInit {
  order!:ShopOrder;
  shop$!: Observable<Shop | null>;
  mapUrl: string | null = null;
  qrUrl: string = '';

  displayedColumns = ["no", "name", "qty", "message", "price"];

  constructor(private route: ActivatedRoute,
    private shopService: ShopService,
    private generalService: GeneralService,
    private platformLocation: PlatformLocation) {

     }

  ngOnInit(): void {


    this.shop$ = this.shopService.aShop;
    this.order = this.route.snapshot.data["order"];

    this.mapUrl = `${environment.gMapUrl}/maps?z=12&t=m&q=loc:${this.order?.loc?.lat}+${this.order?.loc?.lon}`;
    this.qrUrl = (this.platformLocation as any).location.href;

    this.generalService.bc$.next({
      siteName: environment.siteName ?? '',
      title: 'Order Details',
      url:'',
      backUrl: ''
    });

  }

}

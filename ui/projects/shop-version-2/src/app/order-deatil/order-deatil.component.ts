import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Shop, ShopOrder } from 'src/app/lib/interfaces';
import { GeneralService, ShopService } from 'src/app/lib/services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-order-deatil',
  templateUrl: './order-deatil.component.html',
  styleUrls: ['./order-deatil.component.scss']
})
export class OrderDeatilComponent implements OnInit {
  order:ShopOrder;
  shop$: Observable<Shop>;
  mapUrl: string = null;
  displayedColumns = ["no", "name", "qty", "message", "price"];
  constructor(private route: ActivatedRoute,
    private shopService: ShopService,
    private generalService: GeneralService,) { }

  ngOnInit(): void {

    this.shop$ = this.shopService.aShop;
    this.order = this.route.snapshot.data["order"];

    this.mapUrl = `${environment.gMapUrl}/maps?z=12&t=m&q=loc:${this.order?.loc?.lat}+${this.order?.loc?.lon}`;

    this.generalService.bc$.next({
      siteName: environment.siteName,
      title: 'Order Details',
      url:'',
      backUrl: null
    });

  }

}

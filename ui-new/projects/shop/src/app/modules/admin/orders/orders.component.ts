import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopOrder, ShopOrderWithPagination } from '../../../lib/interfaces';
import { CartService, GeneralService } from '../../../lib/services';
import {MatDialog} from '@angular/material/dialog';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { environment } from '../../../../environments/environment';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  pageEvent!: PageEvent

  orders$!: Observable<ShopOrderWithPagination | null>;
  displayedColumns = ["no", "name", "phone", "total", "delivery_location", "delivery_date" ,'created_at', "status"]
  constructor(private cartService: CartService,
    public dialog: MatDialog,
    private generalService: GeneralService,
    @Inject('NotiflixService') public notiflix: any) { }

  viewOrder(shopOrder: ShopOrder | null = null){
    let dialogRef = this.dialog.open(OrderDetailsComponent, {
      data: shopOrder
    });


  }

  goto(pageEvent: PageEvent){
    this.pageEvent = pageEvent;
    this.notiflix.loading.standard();
    const postData = {
      pageSize : this.pageEvent.pageSize
    }
    this.cartService.getAllOrders((this.pageEvent.pageIndex + 1), postData).subscribe().add(()=>this.notiflix.loading.remove());

  }
  ngOnInit(): void {
    this.generalService.bc$.next({
      siteName: environment.siteName ?? '',
      title: 'Orders',
      url:'',
      backUrl: ''
    });


    this.orders$ = this.cartService.orders;
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopDelivery } from '../../../../lib/interfaces';
import { GeneralService, ShopService } from '../../../../lib/services';
import {MatDialog} from '@angular/material/dialog';
import { map, mergeMap } from 'rxjs/operators';
import { CreateShopDeliveryComponent } from './create-shop-delivery/create-shop-delivery.component';
import { environment } from '../../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shop-delivery',
  templateUrl: './shop-delivery.component.html',
  styleUrls: ['./shop-delivery.component.scss']
})
export class ShopDeliveryComponent implements OnInit {
  deliveries$!: Observable<ShopDelivery[] | undefined>;
  displayedColumns: string[] = ['no', 'name', 'charge', 'need_cust_loc', 'min_amount', 'options'];

  constructor(private shopService: ShopService,
    public dialog: MatDialog,
    private generalService: GeneralService,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any) { }

    editDeliveryLoc(delivery: ShopDelivery | null = null){

    let dialogRef = this.dialog.open(CreateShopDeliveryComponent, {
      data: delivery,
    });


  }

  deleteDeliveryLoc(delivery: ShopDelivery | null = null){
    this.notiflix.confirm( 'delete?', `Do you want to delete ${delivery?.name}`, 'Yes', 'No', ()=>{
      this.notiflix.loading.standard(); 
      this.shopService.deleteShopDelivery(delivery).pipe(mergeMap(res=>{
        return this.shopService.shopDeliveries().pipe(map(cats=>{
          return res;
        }));
      })).subscribe({
        complete: () =>{
          this._snackBar.open(`Successfully uploaded `, 'Close'); 
        }
      }).add(() => this.notiflix.loading.remove());
    });
  }

  ngOnInit(): void {
    this.generalService.bc$.next({
      siteName: environment.siteName ?? '',
      title: 'Shop Deliveries',
      url:'',
      backUrl: ''
    });

    this.deliveries$ = this.shopService.deliveriesSlot.pipe(map(res=> res?.deliveries));
  }

}

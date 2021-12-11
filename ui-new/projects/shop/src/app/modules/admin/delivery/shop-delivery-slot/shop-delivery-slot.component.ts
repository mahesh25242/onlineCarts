import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopDelivery, ShopDeliverySlot } from '../../../../lib/interfaces';
import { GeneralService, ShopService } from '../../../../lib/services';
import {MatDialog} from '@angular/material/dialog';
import { map, mergeMap } from 'rxjs/operators';
import { CreateShopDeliverySlotComponent } from './create-shop-delivery-slot/create-shop-delivery-slot.component';
import { environment } from '../../../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shop-delivery-slot',
  templateUrl: './shop-delivery-slot.component.html',
  styleUrls: ['./shop-delivery-slot.component.scss']
})
export class ShopDeliverySlotComponent implements OnInit {
  deliverySlot$!: Observable<ShopDeliverySlot[] | undefined>;
  displayedColumns: string[] = ['no', 'name', 'is_default',  'options'];

  constructor(private shopService: ShopService,
    public dialog: MatDialog,
    private generalService: GeneralService,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any) { }

    editDeliveryLoc(delivery: ShopDelivery | null = null){

    let dialogRef = this.dialog.open(CreateShopDeliverySlotComponent, {
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
        complete: () => this._snackBar.open(`Successfully deleted `, 'Close')
      }).add(() => {
        this.notiflix.loading.remove();
      });
    } );
  }

  ngOnInit(): void {
    this.generalService.bc$.next({
      siteName: environment.siteName ?? '',
      title: 'Shop Delivery Slots',
      url:'',
      backUrl: ''
    });

    this.deliverySlot$ = this.shopService.deliveriesSlot.pipe(map(res=> res?.slots));
  }

}

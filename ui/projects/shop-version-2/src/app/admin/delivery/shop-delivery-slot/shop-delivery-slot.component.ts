import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShopDelivery, ShopDeliverySlot } from 'src/app/lib/interfaces';
import { GeneralService, ShopService } from 'src/app/lib/services';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Notiflix from "notiflix";
import { map, mergeMap } from 'rxjs/operators';
import { CreateShopDeliverySlotComponent } from './create-shop-delivery-slot/create-shop-delivery-slot.component';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-shop-delivery-slot',
  templateUrl: './shop-delivery-slot.component.html',
  styleUrls: ['./shop-delivery-slot.component.scss']
})
export class ShopDeliverySlotComponent implements OnInit {
  deliverySlot$: Observable<ShopDeliverySlot[]>;
  displayedColumns: string[] = ['no', 'name', 'is_default',  'options'];

  constructor(private shopService: ShopService,
    public dialog: MatDialog,
    private generalService: GeneralService) { }

    editDeliveryLoc(delivery: ShopDelivery = null){

    let dialogRef = this.dialog.open(CreateShopDeliverySlotComponent, {
      data: delivery,
    });


  }

  deleteDeliveryLoc(delivery: ShopDelivery = null){
    Notiflix.Confirm.Show( 'delete?', `Do you want to delete ${delivery.name}`, 'Yes', 'No', ()=>{
      Notiflix.Loading.Arrows();
      this.shopService.deleteShopDelivery(delivery).pipe(mergeMap(res=>{
        return this.shopService.shopDeliveries().pipe(map(cats=>{
          return res;
        }));
      })).subscribe(res=>{
        Notiflix.Loading.Remove();
        Notiflix.Notify.Success(`${delivery.name} Successfully deleted `);
      }, error=>{
        Notiflix.Loading.Remove();
        Notiflix.Notify.Failure(`unexpected error`);
      });
    }, ()=>{
      // No button callback alert('If you say so...');
    } );
  }

  ngOnInit(): void {
    this.generalService.bc$.next({
      siteName: environment.siteName,
      title: 'Shop Delivery Slots',
      url:'',
      backUrl: null
    });

    this.deliverySlot$ = this.shopService.deliveriesSlot.pipe(map(res=> res?.slots));
  }

}

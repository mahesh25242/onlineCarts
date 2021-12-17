import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Shop } from '../../../lib/interfaces';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { CartService, ShopService } from '../../../lib/services';
import { tap } from 'rxjs/operators';
import find from 'lodash/find';

@Component({
  selector: 'app-delivery-loaction',
  templateUrl: './delivery-loaction.component.html',
  styleUrls: ['./delivery-loaction.component.scss']
})
export class DeliveryLocationComponent implements OnInit, OnDestroy {
  cartSubScr!: Subscription;
  shop$!:Observable<Shop | null>;
  customerFrm!: FormGroup;
  selected:number = 0;

  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private cartService: CartService,
    private shopService: ShopService,) { }

  get f(){ return this.customerFrm.controls}

  onSwipeLeft(evt: any){
    if(this.selected == 0){
      this.selected = 1;
    }
  }


  onSwipeRight(evt: any){
    if(this.selected == 1){
      this.selected = 0;
    }
  }

  onTabChanged(evt: any){
    this.customerFrm.patchValue({
      selectedLocation: null
    });
  }
  ngOnInit(): void {


    this.customerFrm = this.formBuilder.group({
      name: [null, []],
      note: [null, []],
      email: [null, []],
      phone: [null, []],
      address: [null, []],
      pin: [null, []],
      delivery_date: [new Date(), []],
      is_delivery_date:[ true, []],
      selectedLocation: [null, []],
      delivery_slot: [null, []],
    });
    this.shop$ = this.shopService.aShop.pipe(tap(res=>{
      if(res?.shop_delivery_slot){
        const shopDeliverySlot:any = find(res?.shop_delivery_slot, (dslot) => ( dslot.is_default));

        this.customerFrm.patchValue({
          delivery_slot: shopDeliverySlot?.name
        });
      }
    }));

    this.customerFrm.valueChanges.subscribe(res=>{
      let cartDetails= this.cartService.cartDetails$.getValue();
      cartDetails = {...cartDetails, ...{detail: res}}
      this.cartService.cartDetails$.next(cartDetails);


      if(this.f?.['selectedLocation']?.value &&  cartDetails.grandTotal! < this.f?.['selectedLocation'].value.min_amount){
        this.customerFrm.controls?.['selectedLocation'].setErrors({error: `${this.f?.['selectedLocation'].value.name} has atleast ${this.f?.['selectedLocation'].value.min_amount} amount order`});
      }

    })
    //this.cartService.cartDetails$.next();
  }

  ngOnDestroy(){
    if(this.cartSubScr){
      this.cartSubScr.unsubscribe();
    }
  }
}

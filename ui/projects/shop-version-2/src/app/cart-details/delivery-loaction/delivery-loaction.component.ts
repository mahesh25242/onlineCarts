import { Component, EventEmitter, Inject, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cart, Shop } from 'src/app/lib/interfaces';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { CartService, ShopService } from 'src/app/lib/services';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-delivery-loaction',
  templateUrl: './delivery-loaction.component.html',
  styleUrls: ['./delivery-loaction.component.scss']
})
export class DeliveryLocationComponent implements OnInit, OnDestroy {
  cartSubScr: Subscription;
  shop$:Observable<Shop>;
  customerFrm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private matSnackBar: MatSnackBar,
    private cartService: CartService,
    private shopService: ShopService,) { }

  get f(){ return this.customerFrm.controls}

  ngOnInit(): void {
    this.shop$ = this.shopService.aShop.pipe(tap(res=>{
      console.log(res)
    }));

    this.customerFrm = this.formBuilder.group({
      name: [null, []],
      note: [null, []],
      email: [null, []],
      phone: [null, []],
      address: [null, []],
      pin: [null, []],
      delivery_date: [null, []],
      is_delivery_date:[ false, []],
      selectedLocation: [null, []]
    });
  }

  ngOnDestroy(){
    if(this.cartSubScr){
      this.cartSubScr.unsubscribe();
    }
  }
}

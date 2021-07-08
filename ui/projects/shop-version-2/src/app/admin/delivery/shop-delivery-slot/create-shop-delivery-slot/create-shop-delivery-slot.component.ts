import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import Notiflix from "notiflix";
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ShopDelivery, ShopDeliverySlot } from 'src/app/lib/interfaces';
import { ShopService } from 'src/app/lib/services';

@Component({
  selector: 'app-create-shop-delivery-slot',
  templateUrl: './create-shop-delivery-slot.component.html',
  styleUrls: ['./create-shop-delivery-slot.component.scss']
})
export class CreateShopDeliverySlotComponent implements OnInit, OnDestroy {
  createDeliveryFrm: FormGroup;
  saveCatSubScr: Subscription;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ShopDeliverySlot,
  private formBuilder: FormBuilder,
    private shopService: ShopService,
    public dialogRef: MatDialogRef<CreateShopDeliverySlotComponent>) { }

  get f(){ return this.createDeliveryFrm.controls;}

  saveDelivery(){
    Notiflix.Loading.Arrows();
    const postData = {
      id: this.f.id.value,
      name: this.f.name.value,
      sortorder: this.f.sortorder.value,
      is_default: this.f.is_default.value,
    }
    this.saveCatSubScr = this.shopService.saveShopDeliverySlot(postData).pipe(mergeMap(res=>{
      return this.shopService.shopDeliveries();
    })).subscribe(res=>{
      Notiflix.Loading.Remove();
      Notiflix.Notify.Success(`Successfully saved delivery location `);
      this.dialogRef.close();
    }, error=>{
      Notiflix.Loading.Remove();
      if(error.status == 422){
        for(let result in this.createDeliveryFrm.controls){
          if(error.error.errors[result]){
            this.createDeliveryFrm.controls[result].setErrors({ error: error.error.errors[result] });
          }else{
            this.createDeliveryFrm.controls[result].setErrors(null);
          }
        }
      }
    });

  }

  ngOnInit(): void {
    this.createDeliveryFrm= this.formBuilder.group({
      id: [null, []],
      name: [null, []],
      sortorder: [1, []],
      is_default: [false, []],
    });

    this.createDeliveryFrm.patchValue({
      id: this.data?.id,
      name: this.data?.name,
      sortorder: (this.data?.sortorder) ? this.data?.sortorder : 1,
      is_default: (this.data?.is_default) ? this.data?.is_default : 0,
    });

  }

  ngOnDestroy(){
    if(this.saveCatSubScr){
      this.saveCatSubScr.unsubscribe();
    }
  }
}

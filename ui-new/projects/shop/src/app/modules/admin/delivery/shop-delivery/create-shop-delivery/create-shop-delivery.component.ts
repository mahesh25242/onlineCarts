import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { ShopDelivery } from '../../../../../lib/interfaces';
import { ShopService } from '../../../../../lib/services';

@Component({
  selector: 'app-create-shop-delivery',
  templateUrl: './create-shop-delivery.component.html',
  styleUrls: ['./create-shop-delivery.component.scss']
})
export class CreateShopDeliveryComponent implements OnInit, OnDestroy {
  createDeliveryFrm!: FormGroup;
  saveCatSubScr!: Subscription;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ShopDelivery,
  private formBuilder: FormBuilder,
    private shopService: ShopService,
    public dialogRef: MatDialogRef<CreateShopDeliveryComponent>,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any) { }

  get f(){ return this.createDeliveryFrm.controls;}

  saveDelivery(){
    this.notiflix.loading.standard(); 
    const postData = {
      id: this.f?.['id'].value,
      name: this.f?.['name'].value,
      description: this.f?.['description'].value,
      charge: this.f?.['charge'].value,
      sortorder: this.f?.['sortorder'].value,
      min_amount: this.f?.['min_amount'].value,
      need_cust_loc: this.f?.['need_cust_loc'].value,
      address: this.f?.['address'].value,
      map_url: this.f?.['map_url'].value,
    }
    this.shopService.saveShopDelivery(postData).pipe(mergeMap(res=>{
      return this.shopService.shopDeliveries();
    })).subscribe({
      complete: () => {
        this._snackBar.open(`Successfully saved `, 'Close');
        this.dialogRef.close();
      },
      error: (error) =>{
        if(error.status == 422){
          for(let result in this.createDeliveryFrm.controls){
            if(error.error.errors[result]){
              this.createDeliveryFrm.controls[result].setErrors({ error: error.error.errors[result] });
            }else{
              this.createDeliveryFrm.controls[result].setErrors(null);
            }
          }
        }
      }
    }).add(() => this.notiflix.loading.remove())
      

  }

  ngOnInit(): void {
    this.createDeliveryFrm= this.formBuilder.group({
      id: [null, []],
      name: [null, []],
      description: [null, []],
      charge: [null, []],
      sortorder: [1, []],
      min_amount: [0, []],
      need_cust_loc: [1, []],
      address: [null, []],
      map_url: [null, []],
    });

    this.createDeliveryFrm.patchValue({
      id: this.data?.id,
      name: this.data?.name,
      description: this.data?.description,
      sortorder: (this.data?.sortorder) ? this.data?.sortorder : 1,
      min_amount: (this.data?.min_amount) ? this.data?.min_amount : 0,
      charge: (this.data?.charge) ? this.data?.charge : 0,
      need_cust_loc: (this.data?.need_cust_loc) ? this.data?.need_cust_loc : 0,
      address: (this.data?.address) ? this.data?.address : '',
      map_url: (this.data?.map_url) ? this.data?.map_url : '',
    });

  }

  ngOnDestroy(){
    if(this.saveCatSubScr){
      this.saveCatSubScr.unsubscribe();
    }
  }
}

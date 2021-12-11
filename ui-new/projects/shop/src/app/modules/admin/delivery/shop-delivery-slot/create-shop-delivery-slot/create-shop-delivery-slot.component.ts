import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mergeMap } from 'rxjs/operators';
import { ShopDeliverySlot } from '../../../../../lib/interfaces';
import { ShopService } from '../../../../../lib/services';

@Component({
  selector: 'app-create-shop-delivery-slot',
  templateUrl: './create-shop-delivery-slot.component.html',
  styleUrls: ['./create-shop-delivery-slot.component.scss']
})
export class CreateShopDeliverySlotComponent implements OnInit {
  createDeliveryFrm!: FormGroup;  
  constructor(@Inject(MAT_DIALOG_DATA) public data: ShopDeliverySlot,
  private formBuilder: FormBuilder,
    private shopService: ShopService,
    public dialogRef: MatDialogRef<CreateShopDeliverySlotComponent>,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any) { }

  get f(){ return this.createDeliveryFrm.controls;}

  saveDelivery(){
    this.notiflix.loading.standard(); 
    const postData = {
      id: this.f?.['id'].value,
      name: this.f?.['name'].value,
      sortorder: this.f?.['sortorder'].value,
      is_default: this.f?.['is_default'].value,
    }

    
    this.shopService.saveShopDeliverySlot(postData).pipe(mergeMap(res=>{
      return this.shopService.shopDeliveries();
    })).subscribe({
      complete: () =>{        
        this._snackBar.open(`Successfully saved delivery location `, 'Close')
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
    }).add(() =>{
      this.notiflix.loading.remove();
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
 
}

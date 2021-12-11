import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShopPointsService } from '../services';


@Component({
  selector: 'app-redeem-point-coupon',
  templateUrl: './redeem-point-coupon.component.html',
  styleUrls: ['./redeem-point-coupon.component.scss']
})
export class RedeemPointCouponComponent implements OnInit {
  @Output() redeemed = new EventEmitter();
  redeemFrm!: FormGroup;

  
  constructor(private formBuilder: FormBuilder,
    private shopPointsService: ShopPointsService,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any) { }

  get f(){
    return this.redeemFrm.controls;
  }
  redeem(){
    if(this.redeemFrm.valid){
      this.notiflix.loading.standard();
      const postDate = {
        code: this.f?.['code'].value
      }
      this.shopPointsService.redeemPoints(postDate).subscribe({
        complete: () =>{
          this._snackBar.open(`Successfully redeemed `, 'Close');
        },
        error: (error) =>{
          if(error.status == 422){
            for(let result in this.redeemFrm.controls){
              if(error.error.errors[result]){
                this.redeemFrm.controls[result].setErrors({ error: error.error.errors[result] });
              }else{
                this.redeemFrm.controls[result].setErrors(null);
              }
            }
          }
        }
      }).add(() =>{
        this.notiflix.loading.remove();
      });
      
    }
  }
  ngOnInit(): void {
    this.redeemFrm = this.formBuilder.group({
      code: [null, [Validators.required]]
    });
  }
  

}

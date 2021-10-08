import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShopPointsService } from '../services';
import Notiflix from "notiflix";
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-redeem-point-coupon',
  templateUrl: './redeem-point-coupon.component.html',
  styleUrls: ['./redeem-point-coupon.component.scss']
})
export class RedeemPointCouponComponent implements OnInit, OnDestroy {
  @Output() redeemed = new EventEmitter();
  redeemFrm: FormGroup;

  redeemSubScr: Subscription;
  constructor(private formBuilder: FormBuilder,
    private shopPointsService: ShopPointsService) { }

  get f(){
    return this.redeemFrm.controls;
  }
  redeem(){
    if(this.redeemFrm.valid){
      Notiflix.Loading.Arrows();
      const postDate = {
        code: this.f.code.value
      }
      this.redeemSubScr = this.shopPointsService.redeemPoints(postDate).subscribe(res=>{
        this.redeemed.emit();
        Notiflix.Notify.Success(`Successfully redeem code. `);
      }, error=>{
        if(error.status == 422){
          for(let result in this.redeemFrm.controls){
            if(error.error.errors[result]){
              this.redeemFrm.controls[result].setErrors({ error: error.error.errors[result] });
            }else{
              this.redeemFrm.controls[result].setErrors(null);
            }
          }
        }else{
          Notiflix.Notify.Failure(`sorry some unexpected error occur please try again later`);
        }


      }).add(() =>{
        Notiflix.Loading.Remove();
      });
    }
  }
  ngOnInit(): void {
    this.redeemFrm = this.formBuilder.group({
      code: [null, [Validators.required]]
    });
  }

  ngOnDestroy(){
    this.redeemSubScr && this.redeemSubScr.unsubscribe();
  }

}

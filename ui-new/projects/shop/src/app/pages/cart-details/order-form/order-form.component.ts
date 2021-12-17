import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Shop, ShopDelivery } from '../../../lib/interfaces';
import { GeneralService, ShopService } from '../../../lib/services';


@Component({
  selector: '[formGroup] app-order-form,[formGroupName] app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  customerFrm!: FormGroup;
  shop$!: Observable<Shop | null>;
  @Input() lp!: string;
  todayDate:Date = new Date();
  isSlideChecked: boolean = false;
  breakPointObsr$!: Observable<any>;

  constructor(
    private formBuilder: FormBuilder,
    private controlContainer: ControlContainer,
    private shopService: ShopService,
    private breakpointObserver: BreakpointObserver,
    private generalService: GeneralService,
    ) { }

  get f() {
    return this.customerFrm.controls;
  }

  triggerPicker(picker: any){
    if(this.f?.['is_delivery_date']?.value){
      picker.open();
    }else{
      this.f?.['delivery_date']?.setValue(null);
    }
  }

  checkBreakPoint(){

    return this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet
    ]).pipe(mergeMap(brakPoints=>{

      if (brakPoints.matches && navigator.geolocation) {
        return this.generalService.getLocation().pipe(mergeMap(coords=>{
          if(coords){
            const loc = {
              lat: coords?.coords?.latitude,
              lon: coords?.coords?.longitude
            }

            return this.generalService.reverseLatLngAddress(loc).pipe(map(mAddress=>{
              console.log(mAddress)
              if(this.f?.['pin'] && !this.f?.['pin'].value && mAddress?.address?.postcode){
                this.f?.['pin'].setValue(mAddress?.address?.postcode)
              }

              if(this.f?.['address'] && !this.f?.['address'].value && mAddress?.display_name){
                this.f?.['address'].setValue(mAddress?.display_name)
              }
              return brakPoints
            }));
          }else{
            return of(brakPoints);
          }

        }))
      }else{
        return of(brakPoints)
      }

    }),  catchError(err =>{

      return of(true);
    }));
  }

  ngOnInit(): void {

    this.customerFrm = <FormGroup>this.controlContainer.control;
    this.f?.['selectedLocation'].setValue(null);
    this.shop$ = this.shopService.aShop.pipe(mergeMap(res=>{
      return this.generalService.orderFormError$.asObservable().pipe(map(ferr => {
        if(ferr){
          for(let result in this.customerFrm.controls){
            if(ferr[result]){
              this.customerFrm.controls[result].markAsTouched();
              this.customerFrm.controls[result].setErrors({ error: ferr[result] });
            }else{
              this.customerFrm.controls[result].setErrors(null);

            }
          }
        }else{

        }
        return res;
      }))
    }));
    this.breakPointObsr$ = this.checkBreakPoint();

  }



}

import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Observable } from 'rxjs';
import { Shop, ShopDelivery } from 'src/app/lib/interfaces';
import { ShopService } from 'src/app/lib/services';


@Component({
  selector: '[formGroup] app-order-form,[formGroupName] app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  customerFrm: FormGroup;
  shop$: Observable<Shop>;
  @Input() lp: string;
  todayDate:Date = new Date();
  isSlideChecked: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private controlContainer: ControlContainer,
    private shopService: ShopService
    ) { }

  get f() {
    return this.customerFrm.controls;
  }

  triggerPicker(picker: any){
    if(this.f.is_delivery_date.value){
      picker.open();
    }else{
      this.f.delivery_date.setValue(null);
    }
  }
  ngOnInit(): void {

    this.customerFrm = <FormGroup>this.controlContainer.control;
    this.f.selectedLocation.setValue(null);
    this.shop$ = this.shopService.aShop;


  }



}

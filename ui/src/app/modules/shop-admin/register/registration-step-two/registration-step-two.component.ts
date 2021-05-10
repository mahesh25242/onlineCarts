import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { City, Country, ShopCategory, State } from 'src/app/lib/interfaces';
import { CityService, CountryService, ShopCategoryService, ShopService, StateService } from 'src/app/lib/services';

@Component({
  selector: 'app-registration-step-two',
  templateUrl: './registration-step-two.component.html',
  styleUrls: ['./registration-step-two.component.scss']
})
export class RegistrationStepTwoComponent implements OnInit {
  registerForm: FormGroup;
  shopCategories$: Observable<ShopCategory[]>;
  countries$: Observable<Country[]>;
  states$: Observable<State[]>;
  cities$: Observable<City[]>;

  countrySubscription: Subscription;
  stateSubscription: Subscription;
  constructor(private formBuilder: FormBuilder,
    private shopCategoryService: ShopCategoryService,
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private shopService: ShopService,) { }

    get f(){ return this.registerForm.controls; }

    save(){
      const postData = {
        name: this.f.name.value,
        country_id: this.f.country.value,
        shop_category_id: this.f.category.value,
        short_name: this.f.short_name.value,
        phone: this.f.phone.value,
        address: this.f.address.value,
        state_id: this.f.state.value,
        city_id: this.f.city.value,
        pin: this.f.pin.value,
        local: this.f.local.value,
        terms: this.f.terms.value
      };

      this.shopService.registerShop(postData).subscribe(res=>{

      }, error=>{
        for(let result in this.f){
          if(error.error.errors[result]){
            this.f[result].setErrors({ error: error.error.errors[result] });
          }else{
            this.f[result].setErrors(null);
          }
        }
      });

    }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      country: [null, []],
      category: [null, []],
      name: [null, []],
      short_name:[null, []],
      //email: [null, []],
      phone: [null, []],
      address: [null, []],
      state: [null, []],
      city: [null, []],
      pin: [null, []],
      local: [null, []],
      terms: [null, []]
    });

    this.shopCategories$ = this.shopCategoryService.categories();

    this.countries$ = this.countryService.countries();
    this.countrySubscription = this.f.country.valueChanges.subscribe(res=>{
      if(res)
        this.states$ = this.stateService.states(res.id);
    });

    this.stateSubscription = this.f.state.valueChanges.subscribe(res=>{
      if(res)
        this.cities$ = this.cityService.cities(res.id);
    });

  }

}

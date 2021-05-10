import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { City, Country, ShopCategory, State } from 'src/app/lib/interfaces';
import { CityService, CountryService, ShopCategoryService, StateService } from 'src/app/lib/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
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
    private cityService: CityService) {}

  get f(){ return this.registerForm.controls; }
  save(){

  }

  ngOnInit(): void {


    this.registerForm = this.formBuilder.group({
      country: [null, []],
      category: [null, []],
      name: [null, []],
      short_name:[null, []],
      email: [null, []],
      phone: [null, []],
      address: [null, []],
      state: [null, []],
      city: [null, []],
      pin: [null, []],
      local: [null, []]
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

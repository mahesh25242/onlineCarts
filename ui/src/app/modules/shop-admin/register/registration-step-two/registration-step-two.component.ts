import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription, throwError } from 'rxjs';
import { City, Country, ShopCategory, State } from 'src/app/lib/interfaces';
import { CityService, CountryService, ShopCategoryService, ShopService, StateService } from 'src/app/lib/services';
import { ReCaptchaV3Service } from 'ngx-captcha';
import Notiflix from "notiflix";
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from "@angular/fire/auth";
import { mergeMap } from 'rxjs/operators';


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
  registerShopSubScr: Subscription;
  constructor(private formBuilder: FormBuilder,
    private shopCategoryService: ShopCategoryService,
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private shopService: ShopService,
    private reCaptchaV3Service: ReCaptchaV3Service,
    public afAuth: AngularFireAuth) { }

    get f(){ return this.registerForm.controls; }

    save(){
      Notiflix.Block.Pulse(`#registerForm`);
      const postData = {
        email: '',
        displayName: '',
        name: this.f.name.value,
        country_id: this.f.country_id.value,
        shop_category_id: this.f.shop_category_id.value,
        short_name: this.f.short_name.value,
        phone: this.f.phone.value,
        address: this.f.address.value,
        state_id: this.f.state_id.value,
        city_id: this.f.city_id.value,
        pin: this.f.pin.value,
        local: this.f.local.value,
        terms: this.f.terms.value,
        recaptcha: ''
      };

      this.reCaptchaV3Service.execute(environment.recaptchaKey, 'SignUp', (token) => {
        postData.recaptcha = token;

        this.afAuth.authState.pipe(mergeMap(res=>{
          if(res){
            postData.email = res.email;
            postData.displayName = res.displayName;
            return this.shopService.registerShop(postData)
          } else{
            return throwError(null);
          }
        })).subscribe(res=>{
          Notiflix.Block.Remove(`#registerForm`);
          this.registerForm.reset();

          Notiflix.Notify.Success(`successfully created`);

        }, error=>{
          Notiflix.Block.Remove(`#registerForm`);
          for(let result in this.f){
            if(error.error.errors[result]){
              this.f[result].setErrors({ error: error.error.errors[result] });
            }else{
              this.f[result].setErrors(null);
            }
          }
        });

      }, {
          useGlobalDomain: false
      });



    }


  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      country_id: [null, []],
      shop_category_id: [null, []],
      name: [null, []],
      short_name:[null, []],
      //email: [null, []],
      phone: [null, []],
      address: [null, []],
      state_id: [null, []],
      city_id: [null, []],
      pin: [null, []],
      local: [null, []],
      terms: [null, []]
    });

    this.shopCategories$ = this.shopCategoryService.categories();

    this.countries$ = this.countryService.countries();
    this.countrySubscription = this.f.country_id.valueChanges.subscribe(res=>{
      if(res)
        this.states$ = this.stateService.states(res.id);
    });

    this.stateSubscription = this.f.state_id.valueChanges.subscribe(res=>{
      if(res)
        this.cities$ = this.cityService.cities(res.id);
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from, Observable, of, Subscription, throwError } from 'rxjs';
import { City, Country, ShopCategory, State } from '../../../lib/interfaces';
import { CityService, CountryService, ShopCategoryService, ShopService, StateService } from '../../../lib/services';
import { environment } from '../../../../environments/environment';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { uniqueId } from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';
import {
  Auth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  user,
  User,
  getAuth
} from '@angular/fire/auth';
import { ReCaptchaV3Service } from 'ng-recaptcha';

// import { getToken, AppCheck } from '@angular/fire/app-check';
// import { getApp } from '@angular/fire/app';
// import { RegisterTermsComponent } from '../../register-terms/register-terms.component';


@Component({
  selector: 'app-registration-step-two',
  templateUrl: './registration-step-two.component.html',
  styleUrls: ['./registration-step-two.component.scss']
})
export class RegistrationStepTwoComponent implements OnInit {
  registerForm!: FormGroup;
  shopCategories$!: Observable<ShopCategory[]>;
  countries$!: Observable<Country[]>;
  states$!: Observable<State[]>;
  cities$!: Observable<City[]>;
  user$!: Observable<User | null>;
  
  registerShopSubScr: Subscription | undefined;
  constructor(private formBuilder: FormBuilder,
    private shopCategoryService: ShopCategoryService,
    private countryService: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private shopService: ShopService,    
    private auth: Auth,
    private recaptchaV3Service: ReCaptchaV3Service
    // private appCheck: AppCheck
    ) { 
      this.user$ = user(this.auth);   
    }

    get f(){ return this.registerForm.controls; }

    save(){
      
      
      let phone = '';
      if(this.f?.['phone'].value){
        phone = `+${this.f['country_id'].value?.phonecode}${this.f['phone'].value}`;
      }
      const postData = {
        name: this.f['name'].value,
        country_id: this.f['country_id'].value,
        shop_category_id: this.f['shop_category_id'].value,
        short_name: this.f['short_name'].value,
        phone: phone,
        address: this.f['address'].value,
        state_id: this.f['state_id'].value,
        city_id: this.f['city_id'].value,
        pin: this.f['pin'].value,
        local: this.f['local'].value,
        terms: this.f['terms'].value,
        base_path: this.f['base_path'].value,
        recaptcha: '',
        idToken: '',
        uid: ''
      };

      const auth = getAuth().currentUser;
      if(!auth) return;

      this.recaptchaV3Service.execute('SignUp').pipe(switchMap(token => {
        postData.recaptcha = token;

        return from(auth.getIdToken()).pipe(switchMap(token =>{          
          postData.idToken = token;            
          return this.shopService.registerShop(postData);
        }))
        
      }))   
      .subscribe({
        next: (res)=>{
          console.log('next')
          this.registerForm.reset();
        },
        error:(error: HttpErrorResponse) =>{
          
          if(error?.status === 422){
            for(let result in this.f){
              if(error?.error?.errors[result]){
                this.f[result].setErrors({ error: error.error.errors[result] });
              }else{
                this.f[result].setErrors(null);
              }
            }
          }
         
        },
        complete:()=>{
          console.log('complete' )
        }
      }); 

      



    }


    terms(){
      // this.modalService.open(RegisterTermsComponent, {ariaLabelledBy: 'modal-basic-title', size:'lg'}).result.then((result) => {
      //   if(result === 'Accept'){
      //     this.f.terms.setValue(true);
      //   }
      // }, (reason) => {
      //   //console.log(reason)
      // });

    }
  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      country_id: [null, []],
      shop_category_id: [null, []],
      name: [null, []],
      short_name:[null, []],
      base_path: [null, []],
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
    this.states$ = this.f['country_id'].valueChanges.pipe(mergeMap((country:Country)=> this.stateService.states(country.id)));
    this.cities$ = this.f['state_id'].valueChanges.pipe(mergeMap((state_id:number)=>  this.cityService.cities(state_id)));
  }

}

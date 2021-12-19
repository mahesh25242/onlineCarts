import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { City, Country, Shop, State } from '../../../lib/interfaces';
import { CityService, CountryService, GeneralService, ShopService, StateService } from '../../../lib/services';
import { environment } from '../../../../environments/environment';

// import { AngularFireAuth } from '@angular/fire/auth';
// import { auth } from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit, OnDestroy {
  shop$!: Observable<Shop | null>;
  shopDetailsFrm!: FormGroup;
  countries$!: Observable<Country[]>;
  states$!: Observable<State[]>;
  cities$!: Observable<City[]>;
  pages$!: Observable<any>;


  isDemoSite:boolean = false;

  countrySubscription!: Subscription;
  stateSubscription!: Subscription;
  saveThemeSubscription!: Subscription;
  validatePhone!: Subscription;
  constructor(private shopService: ShopService,
    private formBuilder: FormBuilder,
    private countryServive: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private generalService: GeneralService,    
    // public afAuth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    @Inject('NotiflixService') public notiflix: any) { }



    verifyMobile(shop: Shop){
      // if(!shop.phone){
      //   throw 'No phone found with shop';
      // }
      // var applicationVerifier = new auth.RecaptchaVerifier(
      //   'recaptcha-container', { 'size': 'invisible'});

      // this.afAuth.signInWithPhoneNumber(`+${shop.phone}`, applicationVerifier).then((verificationId:any)=>{
      //   console.log(verificationId)
      //   var verificationCode = window.prompt('Please enter the verification ' +
      //       'code that was sent to your mobile device.');
      //   return auth.PhoneAuthProvider.credential(verificationId.verificationId,
      //       verificationCode);
      // }).then((phoneCredential) => {
      //   return auth().signInWithCredential(phoneCredential);
      // }).then(res=>{
      //   this.validatePhone = this.afAuth.idToken.pipe(mergeMap(res=>{
      //     return this.shopService.validatedPhone(res).pipe(mergeMap(succ=>{
      //       return this.shopService.shopDetail();
      //     }));
      //   })).subscribe(res=> {
      //     Notiflix.Notify.Success(`Successfully varified your mobile `);
      //   }, error=>{
      //     Notiflix.Notify.Failure(`Sorry we can't verify your mobile please contact us. `);
      //   })

      // });
    }
  updateShop(){

    const postData = {
      name: this.f?.['name'].value,
      short_name: this.f?.['short_name'].value,
      email: this.f?.['email'].value,
      phone: this.f?.['phone'].value,
      address: this.f?.['address'].value,
      country_id: this.f?.['country_id'].value,
      state_id: this.f?.['state_id'].value,
      city_id: this.f?.['city_id'].value,
      pin: this.f?.['pin'].value ,
      local: this.f?.['local'].value,
      theme_color: this.f?.['theme_color'].value,
      bg_color: this.f?.['bg_color'].value,
      map: this.f?.['map'].value,
      business_hours: this.f?.['business_hours'].value,
    }

    const formData = new FormData();
    formData.append(`name`, postData.name);
    formData.append(`short_name`, postData.short_name);
    formData.append(`email`, postData.email);
    formData.append(`phone`, postData.phone);
    formData.append(`address`, postData.address);
    formData.append(`country_id`, (postData.country_id) ? JSON.stringify(postData.country_id) : '');
    formData.append(`state_id`, (postData.state_id) ? JSON.stringify(postData.state_id) : '');
    formData.append(`city_id`, (postData.city_id) ? JSON.stringify(postData.city_id) : '');
    formData.append(`pin`, postData.pin);
    formData.append(`local`, postData.local);
    formData.append(`theme_color`, postData.theme_color);
    formData.append(`bg_color`, postData.bg_color);
    formData.append(`bg_color`, postData.bg_color);
    formData.append(`map`, postData.map);
    postData.business_hours && formData.append(`business_hours`, postData.business_hours);
    this.f?.['up_logo'].value && formData.append(`logo`, this.f?.['up_logo'].value);


    this.shopService.saveShopDetail(formData).pipe(mergeMap(res=>{
      return this.shopService.shopDetail();
    })).subscribe({
      complete: () => this._snackBar.open(`Successfully deleted `, 'Close'),
      error: (err) =>{
        if(err.status == 422){
          for(let result in this.shopDetailsFrm.controls){
            if(err.error.errors[result]){
              this.shopDetailsFrm.controls[result].setErrors({ error: err.error.errors[result] });
            }else{
              this.shopDetailsFrm.controls[result].setErrors(null);
            }
          }
        }
      }
    });  
  }
  get f(){ return this.shopDetailsFrm.controls;}
  ngOnInit(): void {

    this.generalService.bc$.next({
      siteName: environment.siteName ?? '',
      title: 'Shop Details',
      url:'',
      backUrl: ''
    });


    this.isDemoSite = (environment.shopKey == environment.demoShopKey);


    this.shop$ = this.shopService.aShop.pipe(tap(res=>{
      let phone;
      if(res?.phone && res?.phone.length > 10){
        if(res?.phone.charAt(0) == '+'){
          phone = (res?.phone) ? res?.phone.slice(3): '';
        }else{
          phone = (res?.phone) ? res?.phone.slice(2): '';
        }
      }else{
        phone = res?.phone;
      }



      this.shopDetailsFrm.patchValue({
        name: res?.name,
        short_name: res?.short_name,
        email: res?.email,
        phone: phone,
        address: res?.address,
        country_id: res?.country,
        state_id: res?.state,
        city_id: res?.city,
        pin: res?.pin ,
        local: res?.local,
        theme_color: res?.theme_color,
        bg_color: res?.bg_color,
        map: res?.map,
        logo: `./${res?.logo}`,
        business_hours: res?.business_hours,
      });
    }));

    this.shopDetailsFrm = this.formBuilder.group({
      name: [null, []],
      short_name: [null, []],
      email: [null, []],
      phone: [null, []],
      address: [null, []],
      country_id: [null, []],
      state_id: [null, []],
      city_id: [null, []],
      pin: [null, []] ,
      local: [null, []] ,
      theme_color: [null, []] ,
      bg_color: [null, []] ,
      map: [null, []] ,
      up_logo: [null, []] ,
      logo: [null, []] ,
      business_hours: [null, []] ,
    });


    this.countries$ = this.countryServive.countries();
    this.states$ = this.f?.['country_id'].valueChanges.pipe(mergeMap(res=> this.stateService.states(res.id)));

    this.cities$ = this.f?.['state_id'].valueChanges.pipe(mergeMap(res=> this.cityService.cities(res.id)))
    



  }

  ngOnDestroy(){
    this.saveThemeSubscription && this.saveThemeSubscription.unsubscribe();
    this.countrySubscription && this.countrySubscription.unsubscribe();
    this.stateSubscription && this.stateSubscription.unsubscribe();
    this.validatePhone && this.validatePhone.unsubscribe();
  }

}

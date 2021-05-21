import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { mergeMap, tap } from 'rxjs/operators';
import { City, Country, Shop, State, Theme } from 'src/app/lib/interfaces';
import { CityService, CountryService, GeneralService, ShopService, StateService, ThemeService } from 'src/app/lib/services';
import Notiflix from "notiflix";
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-shop-details',
  templateUrl: './shop-details.component.html',
  styleUrls: ['./shop-details.component.scss']
})
export class ShopDetailsComponent implements OnInit, OnDestroy {
  shop$: Observable<Shop>;
  shopDetailsFrm: FormGroup;
  countries$: Observable<Country[]>;
  states$: Observable<State[]>;
  cities$: Observable<City[]>;
  thems$: Observable<Theme[]>;
  theme_id: number;
  isDemoSite:boolean = false;

  countrySubscription: Subscription;
  stateSubscription: Subscription;
  saveThemeSubscription: Subscription;
  constructor(private shopService: ShopService,
    private formBuilder: FormBuilder,
    private countryServive: CountryService,
    private stateService: StateService,
    private cityService: CityService,
    private generalService: GeneralService,
    private themeService: ThemeService) { }

    chooseTheme(){
      Notiflix.Block.Merge({svgSize:'20px',});
      Notiflix.Block.Dots(`mat-form-field`);
      this.saveThemeSubscription =  this.themeService.saveTheme(this.theme_id).pipe(mergeMap(res=>{
        return this.shopService.shopDetail();
      })).subscribe(res=>{
        Notiflix.Notify.Success(`Successfully saved the theme `);
        Notiflix.Block.Remove(`mat-form-field`);
      }, err=>{
        Notiflix.Notify.Failure(`Sorry unexpected error occur `);
        Notiflix.Block.Remove(`mat-form-field`);
      })
    }

  updateShop(){
    if(this.isDemoSite){
      Notiflix.Notify.Failure('sorry its a demo site you can\'t change any info in demo site');
      throw 'sorry its a demo site you can\'t change any info in demo site';
    }
    const postData = {
      name: this.f.name.value,
      short_name: this.f.short_name.value,
      email: this.f.email.value,
      phone: this.f.phone.value,
      address: this.f.address.value,
      country_id: this.f.country_id.value,
      state_id: this.f.state_id.value,
      city_id: this.f.city_id.value,
      pin: this.f.pin.value ,
      local: this.f.local.value,
      theme_color: this.f.theme_color.value,
      bg_color: this.f.bg_color.value,
      map: this.f.map.value,
    }
    this.shopService.saveShopDetail(postData).pipe(mergeMap(res=>{
      return this.shopService.shopDetail();
    })).subscribe(res=>{
      Notiflix.Notify.Success(`Successfully saved `);
    }, error=>{
      if(error.status == 422){
        for(let result in this.shopDetailsFrm.controls){
          if(error.error.errors[result]){
            this.shopDetailsFrm.controls[result].setErrors({ error: error.error.errors[result] });
          }else{
            this.shopDetailsFrm.controls[result].setErrors(null);
          }
        }
      }
    });
  }
  get f(){ return this.shopDetailsFrm.controls;}
  ngOnInit(): void {

    this.generalService.bc$.next({
      siteName: environment.siteName,
      title: 'Shop Details',
      url:'',
      backUrl: null
    });

    this.thems$ = this.themeService.themes();
    this.isDemoSite = (environment.shopKey == environment.demoShopKey);


    this.shop$ = this.shopService.aShop.pipe(tap(res=>{
      const phone = (res?.phone) ? res?.phone.slice(2): '';



      this.theme_id = res.shop_theme.theme_id;

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
    });


    this.countries$ = this.countryServive.countries();

    this.countrySubscription = this.f.country_id.valueChanges.subscribe(res=>{
      if(res)
        this.states$ = this.stateService.states(res.id);
    });

    this.stateSubscription = this.f.state_id.valueChanges.subscribe(res=>{
      if(res)
        this.cities$ = this.cityService.cities(res.id);
    });

  }

  ngOnDestroy(){
    this.saveThemeSubscription && this.saveThemeSubscription.unsubscribe();
    this.countrySubscription && this.countrySubscription.unsubscribe();
    this.stateSubscription && this.stateSubscription.unsubscribe();

  }

}

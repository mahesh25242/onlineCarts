import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {Title} from "@angular/platform-browser";
import { catchError, delay, tap } from 'rxjs/operators';
import { BC } from '../interfaces';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  bc$: BehaviorSubject<BC | null> = new BehaviorSubject<BC | null>(null);
  showbanner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  orderFormError$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  customerLoc$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  shopDisabled$: BehaviorSubject<{subject?: string, message?: string} | null> = new BehaviorSubject<{subject?: string, message?: string} | null>(null);
  isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  banners$: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(private http: HttpClient,
    private titleService:Title,    
    ) {       
    }

  get bc(){
    return this.bc$.asObservable().pipe( tap(res=>{
      this.titleService.setTitle(`${(res?.siteName) ? res?.siteName : ''} ${ (res?.siteName && res?.title) ? ':': '' } ${(res?.title) ? res?.title : ''}`);
    }));
  }

  get shopDisabled(){
    return this.shopDisabled$.asObservable();
  }

  
  sentContact(postData: any = null){
    return this.http.post("/sentContact", postData);
  }

  reverseLatLngAddress(pos: {lon: number, lat: number, force?: boolean} | null= null){
    if(!pos?.force && this.customerLoc$.getValue()){
      return this.customerLoc$.asObservable()
    }else{
      return this.http.get<any>(`${environment.openstreetmap}/reverse?format=json&lon=${pos?.lon}&lat=${pos?.lat}`).pipe(tap(res=>{
        this.customerLoc$.next(res);
      }));
    }
  }

  searchAddress(pos: {lon: number, lat: number} | null = null){
    return this.http.get<any>(`${environment.openstreetmap}/search?format=json&lon=${pos?.lon}&lat=${pos?.lat}`);
  }

  getLocation(): Observable<any> {
    return new Observable(obs => {
      navigator.geolocation.getCurrentPosition(
        success => {
          obs.next(success);
          obs.complete();
        },
        error => {
          obs.error(error);
        }
      );
    });
  }

  adminHomeStat(){
    return this.http.get<any>("/shop/adminHomeStat");
  }


  getAllBanners(): Observable<[{image: string}]>{
    if(this.banners$.getValue()){
      return this.banners$.asObservable();
    }else{
      return this.http.get<[{image: string}]>(`/shop/banner`).pipe(tap(res=>{
        this.banners$.next(res);
      }), catchError(err=>{
        this.banners$.next(null);
        return throwError(() => err);
      }));
    }

  }

  saveBanner(postData: any = null){
    return this.http.post("/shop/banner/save", postData);
  }


}

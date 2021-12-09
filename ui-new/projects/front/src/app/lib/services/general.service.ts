import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {Title} from "@angular/platform-browser";
import { delay, tap } from 'rxjs/operators';
import { BC } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  bc$: BehaviorSubject<BC | null> = new BehaviorSubject<BC | null>(null);
  showbanner$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  orderFormError$: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  customerLoc$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient,
    private titleService:Title) { }

  get bc(){
    return this.bc$.asObservable().pipe(delay(1000), tap(res=>{
      this.titleService.setTitle(`${(res?.siteName) ? res?.siteName : ''} ${ (res?.siteName && res?.title) ? ':': '' } ${(res?.title) ? res?.title : ''}`);
    }));
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

}

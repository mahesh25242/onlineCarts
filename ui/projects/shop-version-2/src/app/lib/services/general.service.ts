import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { catchError, tap } from 'rxjs/operators';
import {PlatformLocation } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {
  shopDisabled$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  isAdmin$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  banners$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private httpClient: HttpClient;

  constructor(private http: HttpClient,
    private handler: HttpBackend,
    private platformLocation: PlatformLocation
    ) {
      this.httpClient = new HttpClient(handler);

    }

    get shopDisabled(){
      return this.shopDisabled$.asObservable();
    }


  sentContact(postData: any = null){
    return this.http.post("/sentContact", postData);
  }

  getAllBanners(): Observable<[{image: string}]>{
    if(this.banners$.getValue()){
      return this.banners$.asObservable();
    }else{
      return this.http.get<[{image: string}]>(`/shop/banner`).pipe(tap(res=>{
        this.banners$.next(res);
      }));
    }

  }

  saveBanner(postData: any = null){
    return this.http.post("/shop/banner/save", postData);
  }



}

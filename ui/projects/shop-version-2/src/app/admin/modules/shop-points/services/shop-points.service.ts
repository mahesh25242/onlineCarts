import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShopPoint } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShopPointsService {

  constructor(private http: HttpClient) { }


  points(){
    return this.http.get<ShopPoint>("/shop/points");
  }

  redeemPoints(postData: any | null = null){
    return this.http.post<ShopPoint>("/shop/points/redeemPoints", postData);
  }
}

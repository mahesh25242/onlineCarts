import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay, map, share, tap } from 'rxjs/operators';
import { Shop, ShopDelivery } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private shops$: BehaviorSubject<Shop[]> = new BehaviorSubject<Shop[]>(null);
  private shop$: BehaviorSubject<Shop> = new BehaviorSubject<Shop>(null);
  private deliveries$: BehaviorSubject<ShopDelivery[]> = new BehaviorSubject<ShopDelivery[]>(null);
  constructor(private http: HttpClient) { }

  get shops(){
    return this.shops$.asObservable();
  }
  get aShop(){
    return this.shop$.asObservable().pipe(map(res=>{
        const delivery = res?.shop_delivery;
        if(delivery){
          res.shop_delivery_filtered = delivery.reduce(function (r, a) {
            let idx = (a.charge) ? 'paid': 'free';
            r[idx] = r[idx] || [];
            r[idx].push(a);
            return r;
          }, Object.create(null))
        }
          return res;
    }));
  }
  get deliveries(){
    return this.deliveries$.asObservable();
  }
  getAllShops(postData: any = null){
    return this.http.post<Shop[]>("/admin/shops", postData).pipe(map(res=>{
      this.shops$.next(res);
      return res;
    }));
  }

  getAllTrashShops(postData: any = null){
    return this.http.post<Shop[]>("/admin/shops/trash", postData).pipe(map(res=>{
      this.shops$.next(res);
      return res;
    }));
  }

  saveShop(postData: any = null){
    return this.http.post<any>("/admin/shops/store", postData);
  }

  registerShop(postData: any = null){
    return this.http.post<any>("/register", postData);
  }

  saveShopDetail(postData: any = null){
    return this.http.post<any>("/shop/store", postData);
  }

  deleteShop(shopId:number = 0, postData: any = null){
    return this.http.post<any>(`/admin/shops/delete/${shopId}`, postData);
  }

  generateSite(postData: any = null){
    return this.http.post<any>(`/admin/shops/generateSite`, postData);
  }

  downloadSite(postData: any = null){
    return this.http.post(`/admin/shops/downloadSite`, postData
    , { responseType: 'arraybuffer' }
    );
  }

  shop(shopId:number = 0){
    return this.http.get<Shop>(`/admin/shops/shop/${shopId}`).pipe(map(res=>{
      this.shop$.next(res);
      return res;
    }));
  }

  shopDeliveries(postData: any= null): Observable<ShopDelivery[]>{
    return this.http.post<ShopDelivery[]>(`/shop/deliveries`, postData).pipe(map(res=>{
      this.deliveries$.next(res);
      return res;
    }));
  }

  deleteShopDelivery(postData: any= null){
    return this.http.post<any>(`/shop/deliveries/delete`, postData);
  }

  saveShopDelivery(postData: any = null){
    return this.http.post<any>("/shop/deliveries/store", postData);
  }

  shopDetail(){
    return this.http.get<Shop>(`/shop`).pipe(share(), tap(res=>{
      this.shop$.next(res);
    }));
  }
}

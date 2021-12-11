import { HttpClient } from '@angular/common/http';
import { NullTemplateVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { Shop, ShopDelivery, ShopDeliverySlot, ShopWithPagination } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private shops$: BehaviorSubject<ShopWithPagination | null> = new BehaviorSubject<ShopWithPagination | null>(null);
  private shop$: BehaviorSubject<Shop | null> = new BehaviorSubject<Shop | null>(null);
  private deliveriesSlot$: BehaviorSubject<{deliveries?: ShopDelivery[], slots?: ShopDeliverySlot[] } | null> = new BehaviorSubject<{deliveries?: ShopDelivery[], slots?: ShopDeliverySlot[] } | null>(null);
  constructor(private http: HttpClient) { }

  get shops(){
    return this.shops$.asObservable();
  }
  get aShop(){
    return this.shop$.asObservable().pipe(map(res=>{
        const delivery = res?.shop_delivery;
        if(delivery){
          res.shop_delivery_filtered = delivery.reduce(function (r, a) {
            let idx = (a.need_cust_loc) ? 'paid': 'free';
            r[idx] = r[idx] || [];
            r[idx].push(a);
            return r;
          }, Object.create(null))
        }
          return res;
    }));
  }
  get deliveriesSlot(){
    return this.deliveriesSlot$.asObservable();
  }
  getAllShops(postData: any = null, page: number = 1){
    return this.http.post<ShopWithPagination>(`/admin/shops?page=${page}`, postData).pipe(map(res=>{
      this.shops$.next(res);
      return res;
    }));
  }

  getAllTrashShops(postData: any = NullTemplateVisitor, page: number = 1){
    return this.http.post<ShopWithPagination>(`/admin/shops/trash?page=${page}`, postData).pipe(map(res=>{
      this.shops$.next(res);
      return res;
    }));
  }

  saveShop(postData: any = null){
    return this.http.post<any>("/admin/shops/store", postData);
  }

  registerShop(postData: any = null){
    const ref_by = localStorage.getItem("ref_by");
    if(ref_by)
      postData = {...postData, ...{ref_by : ref_by}}
    return this.http.post<any>("/register", postData);
  }

  saveShopDetail(postData: any = null){
    return this.http.post<any>("/shop/store", postData);
  }

  changeLogoFavicon(postData: any = null){
    return this.http.post<any>("/shop/changelogoFav", postData);
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

  shopDeliveries(postData: any= null): Observable<{deliveries?: ShopDelivery[], slots?: ShopDeliverySlot[] }>{
    return this.http.post<{deliveries?: ShopDelivery[], slots?: ShopDeliverySlot[] }>(`/shop/deliveries/slotToo`, postData).pipe(map(res=>{
      this.deliveriesSlot$.next(res);
      return res;
    }));
  }

  deleteShopDelivery(postData: any= null){
    return this.http.post<any>(`/shop/deliveries/delete`, postData);
  }

  saveShopDelivery(postData: any = null){
    return this.http.post<any>("/shop/deliveries/store", postData);
  }

  saveShopDeliverySlot(postData: any = null){
    return this.http.post<any>("/shop/deliveries/slot/store", postData);
  }


  shopDetail(){
    return this.http.get<Shop>(`/shop`).pipe(share(), tap(res=>{
      this.shop$.next(res);
    }));
  }




  validatedPhone(idToken: string | null = null){
    return this.http.post<any>("/shop/mobile_verified", {idToken})
  }

  ourClients(){
    return this.http.get<any>("/ourClients");
  }

  changeStatus(postData: any = null){
    return this.http.post<any>("/admin/shops/changeStatus", postData);
  }

  shopMessages(){
    return this.http.get<any>("/shop/messages/latest");
  }
}

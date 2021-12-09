import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PointCouponsWithPagination } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PointCouponService {

  constructor(private http: HttpClient) { }



  coupons(page:number = 1){
    return this.http.get<PointCouponsWithPagination>(`/admin/pointCoupons?page=${page}`);
  }

  save(postData: any = null){
    return this.http.post<any>(`/admin/pointCoupons/${postData.id}/save`, postData);
  }

  delete(postData: any = null){
    return this.http.post<any>(`/admin/pointCoupons/${postData.id}/delete`, postData);
  }



}

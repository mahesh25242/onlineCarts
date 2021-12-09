import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ReportAbuseWithPagination, ReportAbuseType } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReportAbuseService {

  constructor(private http: HttpClient) { }



  abuseTypes(){
    return this.http.get<ReportAbuseType[]>('/shop/abuses/types');
  }

  reportedAbuses(page: number = 1){
    return this.http.get<ReportAbuseWithPagination>(`/admin/abuses?page=${page}`);
  }

  shopAbuses(parms: any = null){
    return this.http.get<ReportAbuseWithPagination>(`/shop/abuses?page=${parms.pageIndex+1}&pageSize=${parms.pageSize}&shop_id=${parms.shop_id}`);
  }


}

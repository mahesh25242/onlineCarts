import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Package, ShopRenewalWithPagination } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  packages$: BehaviorSubject<Package[]> = new BehaviorSubject<Package[]>(null);
  constructor(private http: HttpClient) { }

  get packages(){
    return this.packages$.asObservable();
  }
  listAllPackages(activeOnly: number | null = null, shopKey: string | null = null): Observable<Package[]> {

    let parm = '';
    if(activeOnly !== null){
      parm = `status=${activeOnly}`;
    }
    if(shopKey){
      parm += `${(parm) ? `&`: ``}shop_key=${shopKey}`;
    }
    return this.http.get<Package[]>(`/packages${(parm) ? `?${parm}` : ''}`).pipe(tap(packages=>{
      this.packages$.next(packages);
    }));
  }

  save(postParm: any | null = null){
    return this.http.post<Package[]>(`/packages/${postParm.id}/save`, postParm);
  }

  assignPackageToShop(postParm: any = null){
    return this.http.post<Package[]>(`/packages/${postParm.package_id}/assignToShop`, postParm);
  }

  getMyPayments(parms: any = null){
    return this.http.get<ShopRenewalWithPagination>(`/shop/getMyPayments?page=${parms.pageIndex + 1}&pageSize=${parms.pageSize}`);
  }
}

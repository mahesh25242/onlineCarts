import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, share, tap } from 'rxjs/operators';
import { CacheService } from '../cache/core';
import { HttpRequestCache } from '../cache/utils';
import { ShopOrder, ShopProduct, ShopProductWithPagination } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShopProductService {
  allProduct: ShopProduct[] = [];
  filters: any;
  private products$: BehaviorSubject<ShopProductWithPagination | null> = new BehaviorSubject<ShopProductWithPagination | null>(null);
  private readonly refreshProductsSubject = new Subject();
  
  constructor(private http: HttpClient,
    private readonly cache: CacheService,) { }

  get products(){
    return this.products$.asObservable();
  }

  listproducts(page:number= 1, postData: any = null): Observable<ShopProductWithPagination>{
    return this.http.post<ShopProductWithPagination>(`/shop/products${(page) ? `?page=${page}` : ''}`, postData).pipe(map(res=>{
      this.products$.next(res);
      return res;
    }));
  }

  createProduct(postData: any = null): Observable<ShopProduct>{
    return this.http.post<ShopProduct>("/shop/products/store", postData);
  }

  deleteProduct(postData: any = null): Observable<ShopProduct>{
    return this.http.post<ShopProduct>(`/shop/products/delete`, postData);
  }

  changeStatus(postData: any = null): Observable<any>{
    return this.http.post<any>(`/shop/products/changeStatus`, postData);
  }

  @HttpRequestCache<ShopProductService>(function() {
    return {
      storage: this.cache,
      refreshSubject: this.refreshProductsSubject
    };
  })
  showProducts(page:number= 1,postData: any = null): Observable<ShopProductWithPagination>{     
    return this.http.post<ShopProductWithPagination>(`/shop/product/showProducts${(page) ? `?page=${page}` : ''}`, postData).pipe(map(res=>{
      this.products$.next(res);
      return res;
    }));
  }

  resetShowProducts(){
    this.refreshProductsSubject.next(null);
  }

  showProductDetails(postData: any = null): Observable<ShopProduct>{
    return this.http.post<ShopProduct>("/shop/product/showProductDetails", postData);
  }

  showProduct(id: any = null): Observable<ShopProduct>{
    return this.http.get<ShopProduct>(`/shop/product/showProduct/${id}`);
  }

  showOrderDetail(postData: any = null): Observable<ShopOrder>{
    return this.http.post<ShopOrder>("/shop/showOrderDetail", postData);
  }

  showProductsFilters(){
    if(this.filters){
      return of(this.filters);
    }else{
      return this.http.get<any>(`/shop/product/showProductsFilters`).pipe(share(), tap(res=>{
        this.filters = res;
      }));
    }

  }
}

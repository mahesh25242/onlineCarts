import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ShopProductCategory } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShopProductCategoryService {
  public hideTopCat$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private categories$: BehaviorSubject<ShopProductCategory[] | null> = new BehaviorSubject<ShopProductCategory[] | null>(null);

  selectedCategory$: BehaviorSubject<ShopProductCategory | null | undefined> = new BehaviorSubject<ShopProductCategory | null | undefined>(null);
  constructor(private http: HttpClient) { }

  get categories(){
    return this.categories$.asObservable().pipe(mergeMap(res=>{
      if(res){
        return of(res);
      }else{
        return this.showCategories();
      }
    }));
  }

  get hideTopCat(){
    return this.hideTopCat$.asObservable();
  }


  get selectedCategory(){
    return this.selectedCategory$.asObservable();
  }

  listCategories(postData: any = null): Observable<ShopProductCategory[]>{
    return this.http.post<ShopProductCategory[]>("/shop/products/categories", postData).pipe(map(res=>{
      this.categories$.next(res);
      return res;
    }));
  }

  createCategory(postData: any = null): Observable<{data? : ShopProductCategory}>{
    return this.http.post<{data? :ShopProductCategory}>("/shop/products/categories/store", postData);
  }

  deleteCategory(postData: any = null): Observable<ShopProductCategory>{
    return this.http.post<ShopProductCategory>(`/shop/products/categories/delete`, postData);
  }

  changeStatus(postData: any = null): Observable<any>{
    return this.http.post<any>("/shop/products/categories/changeStatus", postData);
  }

  showCategories(): Observable<any>{
    if(this.categories$.getValue()){
      return this.categories$.asObservable();
    }else{
      return this.http.get<ShopProductCategory[]>("/shop/product/showCategories").pipe(tap(res=>{
        this.categories$.next(res);
      }),
      catchError(err=>{
        return of(null);
      }));
    }

  }
}

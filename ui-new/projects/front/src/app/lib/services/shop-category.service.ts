import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ShopCategory } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ShopCategoryService {
  private categories$: BehaviorSubject<ShopCategory[] | null> = new BehaviorSubject<ShopCategory[] | null>(null);
  constructor(private http: HttpClient) { }

  get shopCategories(){
    return this.categories$.asObservable();
  }
  getCategories(postData: any = null){
    return this.http.post<ShopCategory[]>("/admin/shops/categories", postData).pipe(tap(res=>{
      this.categories$.next(res);
    }));
  }

  categories(){
    return this.http.get<ShopCategory[]>("/categories");
  }

  saveCategory(postData: any = null){
    return this.http.post<any>("/admin/shops/categories/store", postData);
  }

  deleteCategory(catid:number = 0, postData: any = null){
    return this.http.post<any>(`/admin/shops/categories/delete/${catid}`, postData);
  }
}

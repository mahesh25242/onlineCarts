import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductTag } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductTagService {
  private productTags$: BehaviorSubject<ProductTag[] | null> = new BehaviorSubject<ProductTag[] | null>(null);

  constructor(private http: HttpClient) { }

  get productTag(){
    return this.productTags$.asObservable();
  }
  tags(){
    return this.http.get<ProductTag[]>('/shop/product/tags').pipe(tap(res=>this.productTags$.next(res)));
  }

  save(postData: any = null){
    return this.http.post<any>('/shop/product/tags/save', postData);
  }
}

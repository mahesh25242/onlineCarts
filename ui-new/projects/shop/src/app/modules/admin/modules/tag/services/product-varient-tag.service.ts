import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductVarientTag } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductVarientTagService {

  private productVarientTags$: BehaviorSubject<ProductVarientTag[] | null> = new BehaviorSubject<ProductVarientTag[] | null>(null);

  constructor(private http: HttpClient) { }

  get productVarientTags(){
    return this.productVarientTags$.asObservable();
  }

  tags(){
    return this.http.get<ProductVarientTag[]>('/shop/product/tags/varient').pipe(tap(res=>this.productVarientTags$.next(res)));
  }

  save(postData: any = null){
    return this.http.post<any>('/shop/product/tags/varient/save', postData);
  }
}

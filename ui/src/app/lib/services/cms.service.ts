import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private pages$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  get getPages(){
    return this.pages$.asObservable();
  }

  pages(){
    return this.http.get<any>(`/shop/cms`).pipe(tap( res=> this.pages$.next(res) ));
  }

  save(postVal:any = null){
    return this.http.post<any>(`/shop/cms/store`, postVal);
  }
}

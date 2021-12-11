import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private pages$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) { }

  get getPages(){
    return this.pages$.asObservable();
  }

  mainMenus(){
    return this.getPages.pipe(map(res=>{
      let allPages = null;
      if(res){
        allPages = [...[{ name: 'Home', url : '/'}], ... res, ...[{ name: 'Contact Us', url : '/contact-us'}]];
        if(environment.shopKey == environment.demoShopKey){
          allPages = [ ...allPages, ...[{ name: 'Admin', url : '/admin', }]];
        }
      }
      
      return allPages;
    }))
  }
  pages(){
    return this.http.get<any>(`/shop/cms`).pipe(tap( res=> this.pages$.next(res)));
  }

  save(postVal:any = null){
    return this.http.post<any>(`/shop/cms/store`, postVal);
  }
}

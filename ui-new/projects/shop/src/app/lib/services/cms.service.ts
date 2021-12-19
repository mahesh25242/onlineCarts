import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, of } from 'rxjs';
import { map, mergeMap, share, shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { GeneralService } from '../../lib/services';


@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private pages$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private generalService: GeneralService) { }

  get getPages(){
    return this.pages$.asObservable();
  }

  mainMenus(){       
    return this.getPages.pipe(mergeMap(res=>{
      return this.generalService.isAdmin$.pipe(map(isAdmin=>{
        if(isAdmin){        
          return  [
                    { name: 'Categories', url : '/admin/categories'},
                    { name: 'Products', url : '/admin/products/0'},
                    { name: 'Delivery', url : '/admin/deliveries'},
                    { name: 'Orders', url : '/admin/orders'},
                    { name: 'Shop Settings', url : '/admin/details'},
                    { name: 'My Account', url : '/admin/account'},
                    { name: 'Re-new', url : '/admin/renew'},
                    { name: 'Back To Site', url : '../'},
                    { name: 'Sign Out', url : 'admin/sign-out'},
                ];
        }   
        let allPages = null;
        if(res){        
          allPages = [...[{ name: 'Home', url : '/'}], ... res, ...[{ name: 'Contact Us', url : '/contact-us'}]];
          if(environment.shopKey == environment.demoShopKey){
            allPages = [ ...allPages, ...[{ name: 'Admin', url : '/admin', }]];
          }
        }
        return allPages;
      }));
    }));
    
  }
  pages(){
    return this.http.get<any>(`/shop/cms`).pipe(tap( res=> this.pages$.next(res)));
  }

  save(postVal:any = null){
    return this.http.post<any>(`/shop/cms/store`, postVal);
  }
}

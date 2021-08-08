import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router  } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ShopProductCategoryService, ShopProductService } from '../../../../../src/app/lib/services';

@Injectable()
export class OrderDeatilResolver implements Resolve<any> {

  constructor(
    private shopProductService: ShopProductService,
    private shopProductCategoryService: ShopProductCategoryService,
    private router: Router) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.shopProductService.showOrderDetail({
      id: route.params?.id
    }).pipe(tap(res=>{
      if(!res){
       // this.router.navigate([`/404`]);
      }
    }));

  }
}

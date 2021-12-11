import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopProductService } from '../../../../app/lib/services';

@Injectable()
export class ProductsResolver implements Resolve<any> {

  constructor(
    private shopProductService: ShopProductService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const page = parseInt(route?.params?.['page'] ,0);
    return this.shopProductService.listproducts((page+1), {
      pageSize : ((route.params?.['pageSize']) ? route.params?.['pageSize'] : 20)
    });
  }
}

import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopProductCategoryService } from '../../../../../../src/app/lib/services';

@Injectable()
export class CategoriesResolver implements Resolve<any> {

  constructor(
    private shopProductCategoryService: ShopProductCategoryService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.shopProductCategoryService.listCategories();
  }
}

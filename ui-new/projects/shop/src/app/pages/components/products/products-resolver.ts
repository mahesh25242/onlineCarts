import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import first from 'lodash/first';
import { Observable, of } from 'rxjs';
import { mergeMap, take, tap } from 'rxjs/operators';
import { ShopProductCategory } from '../../../lib/interfaces';
import { ShopProductCategoryService, ShopProductService } from '../../../lib/services';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ProductsResolver implements Resolve<any> {

  constructor(
    private shopProductService: ShopProductService,
    private shopProductCategoryService: ShopProductCategoryService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {

    if(route.params?.['catUrl']){
      this.shopProductService.allProduct = [];
      return  this.shopProductCategoryService.showCategories().pipe(mergeMap(res=>{
        return this.shopProductService.showProducts(1, {
          cat_url: route.params?.['catUrl'],
          pageSize : 50
        });
      }),take(1))
    }else{

      this.shopProductService.allProduct = [];
      return this.shopProductCategoryService.showCategories().pipe(mergeMap(res=>{
        const cat:ShopProductCategory | undefined = first(res);

        if(cat){

          return this.shopProductService.showProducts(1, {
            shop_product_category_id: cat.id,
            pageSize : 50
          });
        }else{
          return of(true);
        }
      }), take(1));

    }

  }
}

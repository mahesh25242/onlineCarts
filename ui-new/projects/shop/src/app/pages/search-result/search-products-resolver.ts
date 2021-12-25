import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { environment } from '@shop/environments/environment';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { GeneralService, ShopProductService } from '../../lib/services';

@Injectable()
export class SearchProductsResolver implements Resolve<any> {

  constructor(
    private shopProductService: ShopProductService,
    private generalService: GeneralService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {        


    const cats = (route.params?.['categories']) ? route.params?.['categories']?.split(',').filter((x:string) => x != '0').map((x: string) => +x) : [];    
    const productTags = (route.params?.['productTags']) ? route.params?.['productTags']?.split(',').filter((x:string) => x != '0').map((x: string) => +x) : [];
    const varients = (route.params?.['varients']) ? route.params?.['varients']?.split(',').filter((x:string) => x != '0').map((x: string) => +x) : [];

    const parms = {
      categories: cats,
      priceFrom: route.params?.['priceFrom'] ?? '',
      priceTo: route.params?.['priceTo'] ?? '',
      productTags: productTags,
      sort: { name: route.params?.['sort'] ?? 'name', type: route.params?.['sortField'] ?? 'ASC'},
      varients: varients,
    };

    const postData = {
      q: route.params?.['q'],
      pageSize : 50,
      selectedItems: parms      
    }
    // return this.shopProductService.resetShowProducts()

    this.generalService.bc$.next({
            siteName: environment.siteName ?? '',
            title: postData.q,
            url:'',
            backUrl: `/`,
            other: {...parms, ...{q : postData.q}}
          })
    return this.shopProductService.showProducts(1, postData).pipe(take(1));

  }
}

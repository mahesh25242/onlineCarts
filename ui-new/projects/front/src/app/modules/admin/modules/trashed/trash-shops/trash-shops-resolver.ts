import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';
import { ShopService } from '../../../../../lib/services';

@Injectable()
export class TrashShopsResolver implements Resolve<any> {

  constructor(
    private shopService: ShopService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.shopService.getAllTrashShops();
  }
}

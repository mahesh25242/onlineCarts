import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';
import { PackageService } from '../../../lib/services';

@Injectable()
export class PackageResolver implements Resolve<any> {

  constructor(
    private packageService: PackageService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.packageService.listAllPackages();
  }
}

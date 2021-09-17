import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { empty, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PackageService } from '..//lib/services';

@Injectable()
export class PackageResolver implements Resolve<any> {

  constructor(
    private packageService: PackageService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.packageService.listAllPackages(1);
  }
}

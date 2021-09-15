import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { empty, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SettingService } from '../../../lib/services';

@Injectable()
export class SettingResolver implements Resolve<any> {

  constructor(
    private settingService: SettingService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.settingService.getAllSettings();
  }
}

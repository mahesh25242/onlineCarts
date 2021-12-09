import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot  } from '@angular/router';
import { Observable } from 'rxjs';
import { SettingService } from '../../../lib/services';

@Injectable()
export class SettingResolver implements Resolve<any> {

  constructor(
    private settingService: SettingService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return this.settingService.getAllSettings();
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { PrefillMessage } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class PrefillMessageService {

  constructor(private http: HttpClient) { }



  messages(is_default:number | null = null){
    return this.http.get<PrefillMessage[]>(`/admin/preefillMessage${ (is_default) ? `?is_default=${is_default}` : `` }`);
  }

  save(postData: any = null){
    return this.http.post<any>(`/admin/preefillMessage/${postData.id}/save`, postData);
  }


}

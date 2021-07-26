import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor(private http: HttpClient) { }

  pages(){
    return this.http.get<any>(`/shop/cms`);
  }

  save(postVal:any = null){
    return this.http.post<any>(`/shop/cms/store`, postVal);
  }
}

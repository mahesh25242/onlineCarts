import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RazorpayService {
  
  constructor(private http: HttpClient) { }

  createPackageOrder(postData: any =null){
    return this.http.post<any>("/createPackageOrder", postData)
  }
  
  paymentSuccess(postData: any =null){
    return this.http.post<any>(`/paymentSuccess`, postData)
  }
}

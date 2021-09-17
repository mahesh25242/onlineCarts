import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Package } from '../interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  packages$: BehaviorSubject<Package[]> = new BehaviorSubject<Package[]>(null);
  constructor(private http: HttpClient) { }

  get packages(){
    return this.packages$.asObservable();
  }
  listAllPackages(activeOnly: number = null): Observable<Package[]> {
    return this.http.get<Package[]>(`/packages${(activeOnly !== null) ? `?status=${activeOnly}` : ''}`).pipe(tap(packages=>{
      this.packages$.next(packages);
    }));
  }

  save(postParm: any | null = null){
    return this.http.post<Package[]>(`/packages/${postParm.id}/save`, postParm);
  }
}

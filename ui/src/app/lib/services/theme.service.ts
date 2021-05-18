import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { State } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient) { }

  themes(){
    return this.http.get<any>(`/shop/themes`);
  }

  saveTheme(themeId: number = 0){
    return this.http.post<any>(`/shop/themes/save`, {theme_id: themeId});
  }
}

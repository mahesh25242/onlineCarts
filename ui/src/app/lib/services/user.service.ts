import { Injectable } from '@angular/core';
import { map, shareReplay, catchError } from 'rxjs/operators';
import { of, BehaviorSubject, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pagination, User, UserWithPagination } from '../interfaces';
import { environment } from '../../../environments/environment';
import * as _ from 'lodash';

import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private loggedUser: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private user$: BehaviorSubject<User> = new BehaviorSubject<User>(null);
    private users$: BehaviorSubject<UserWithPagination> = new BehaviorSubject<UserWithPagination>(null);

  constructor(private http: HttpClient,
    public afAuth: AngularFireAuth) { }


  get getloggedUser() {
    return this.loggedUser.asObservable();
  }
  get user() {
    return this.user$.asObservable();
  }
  get users() {
    return this.users$.asObservable();
  }


  createAdmin(user: any= null){
    return this.http.post<any>('/admin/createAdmin',user);
  }

  signIn(user: any=null){
    return this.http.post<any>('/oauth/token',user).pipe(map(res=>{
      this.setLogin(res);
      return res;
    }));
  }

  demoSignIn(){
    return this.http.post<string>('/demoSignIn', null).pipe(map(res=>{
      this.setLogin(res);
      return res;
    }));
  }

  signInWith(user: any=null){
    return this.http.post<any>('/socialLogin',user).pipe(map(res=>{
      this.setLogin(res);
      return res;
    }));
  }


  refreshToken(){

    let token:any = localStorage.getItem('token');
    if(token){
      token = JSON.parse(token);
      const postData = {
        'grant_type' : 'refresh_token',
        'refresh_token' : `${token.refresh_token}`,
        'client_id' : environment.client_id,
        'client_secret' : environment.lumenSecret,
        'scope' : '',
      }
      return this.http.post<any>('/oauth/token',postData).pipe(map(res=>{
        this.setLogin(res);
        return res;
      }))
    }else{
     // return of(false);
      return of({})
    }
  }

  setLogin(loginResponse){
    localStorage.setItem('token', JSON.stringify(loginResponse));
  }

  setUserLogin(postData:any= null){
    return this.http.post('/setUserLogin', postData);
  }

  signOut(){
    return this.http.get<User>('/signOut');
  }


  authUser():Observable<User>{

    return this.http.get<User>('/authUser').pipe(map((x:User)=>{


      this.loggedUser.next(x);
      return x;
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
    catchError((err)=>{
     // console.log(x.status)
     if(err?.status == 401){
      localStorage.removeItem('token');
      this.loggedUser.next(null);
     }

      return throwError(err);
    })
    )
  }

  updateProfile(postData:any= null){
    return this.http.post('/updateProfile', postData);
  }

  updateAvatar(postData:any= null){
    return this.http.post('/updateAvatar', postData);
  }


  getUser(teacherUrl:string='', baseUrl: string = null){
    return this.http.get<User>(`/${baseUrl}/fetch/${teacherUrl}`).pipe(map(res=>{
      this.user$.next(res);
      return res;
    }));
  }

  getAllUser(urlPart:string='', page:number= 1,parm: string = ''){
    let qryStr = '';
    if(page){
      qryStr += `?page=${page}`;
    }
    if(parm){

      qryStr = (qryStr && `&${parm}`) || (!qryStr && `?${parm}`);
    }

    return this.http.get<UserWithPagination>(`/${urlPart}/fetchAll${qryStr}`).pipe(map(res=>{
      this.users$.next(res);
      return res;
    }));
  }

  toggleStatus(urlPart:string='', user: User= null){
    return this.http.post<any>(`/${urlPart}/toggleStatus`, user);
  }

  deleteUser(urlPart:string='', user: User= null){
    return this.http.post<any>(`/${urlPart}/delete`, user);
  }



}

import { Injectable } from '@angular/core';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';



@Injectable()

export class NotiflixService {

  constructor() { }

  get confirm(){
    return Confirm.show
  }

  get loading(){
    return Loading;
  }
  

}
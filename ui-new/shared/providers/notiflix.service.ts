import { Injectable } from '@angular/core';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';



@Injectable()

export class NotiflixService {

  constructor() { }

  get confirm(){
    return Confirm.show
  }

  get loading(){
    return Loading;
  }

  get report(){
    return Report;
  }
  

}
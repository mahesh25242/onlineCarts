import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

import { UserService } from '../../../lib/services';
import { Subscription } from 'rxjs';
import Notiflix from "notiflix";
import { mergeMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  signInFrm: FormGroup;

  invalidlogin:boolean = false;
  signInSubscription: Subscription;
  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,) { }

  get f() { return this.signInFrm.controls; }

  ngOnInit(): void {
    this.signInFrm = this.formBuilder.group({
      mobile: ['', [Validators.required]],
      password:['', [Validators.required]]
    });



  }


  signIn(){
    Notiflix.Loading.Pulse(`please wait`);
    this.invalidlogin = false;
    const postData = {
      "grant_type": "password",
      "client_id": environment.client_id,
      "client_secret": environment.lumenSecret,
      "password": this.f.password.value,
      "username": this.f.mobile.value,
      "scope": "",
      "recaptcha": null
    };

    this.signInSubscription = this.userService.signIn(postData).pipe(mergeMap(()=>{

      return this.userService.authUser().pipe(mergeMap(user=>{
        return this.userService.setUserLogin({action:'SignIn'}).pipe(map(()=>{
          return user
        }))
      }));
    })).subscribe(()=>{

      Notiflix.Loading.Remove();
      this.router.navigate([`/admin/shops`]);
    }, ()=>{
      Notiflix.Loading.Remove();
        this.invalidlogin = true;
        this.f.password.setValue(null);



    });

  }



  ngOnDestroy(){
    if(this.signInSubscription){
      this.signInSubscription.unsubscribe();
    }
  }

}

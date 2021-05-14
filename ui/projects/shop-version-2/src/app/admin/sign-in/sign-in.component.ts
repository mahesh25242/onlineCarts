import { Component, OnInit } from '@angular/core';

import { FormBuilder  } from '@angular/forms';
import { empty, Observable, Subscription } from 'rxjs';
import { GeneralService, UserService } from 'src/app/lib/services';
import { environment } from '../../../environments/environment';
import { mergeMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  invalidlogin:boolean = false;
  signInSubscription: Subscription;
  iDToken$:Observable<string>;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private generalService: GeneralService,
    public afAuth: AngularFireAuth ) { }

  signInWithGoogle(): void {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(res=>{
      //console.log(res.credential.toJSON())
    })
  }

  ngOnInit(): void {
    this.generalService.bc$.next({
      siteName: environment.siteName,
      title: 'Admin Login',
      url:'',
      backUrl: null
    });




    this.iDToken$ = this.afAuth.authState.pipe(mergeMap(as=>{
      return this.afAuth.idToken.pipe(mergeMap(idToken=>{
          if(!idToken)
            return empty();
          return this.userService.signInWith({idToken: idToken});
      }))
    })).pipe(tap(res=>{
      if(res && res?.access_token){
        this.router.navigate(['/admin/home']);
      }
    }))

  }

}

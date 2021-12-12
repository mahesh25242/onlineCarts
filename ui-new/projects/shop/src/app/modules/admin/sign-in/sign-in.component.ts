import { Component, OnInit } from '@angular/core';

import { FormBuilder  } from '@angular/forms';
import { empty, from, Observable, Subscription } from 'rxjs';
import { GeneralService, UserService } from '../../../lib/services';
import { environment } from '../../../../environments/environment';
import { map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {
  Auth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  user,
  User,
  getAuth
} from '@angular/fire/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  invalidlogin:boolean = false;
  signInSubscription!: Subscription;
  iDToken$!:Observable<string>;
  isDemoSite: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private generalService: GeneralService,
    private auth: Auth ) { }

  signInWithGoogle(): void {
    signInWithPopup(this.auth, new GoogleAuthProvider).then(res => {
      console.log(res)
    });  

  }

  ngOnInit(): void {

    
    this.generalService.bc$.next({
      siteName: environment.siteName ?? '',
      title: 'Admin Login',
      url:'',
      backUrl: ''
    });


    if(environment.shopKey == environment.demoShopKey){

      this.isDemoSite = true;

      this.iDToken$ = this.userService.demoSignIn().pipe(mergeMap(()=>{

        return this.userService.authUser().pipe(mergeMap(user=>{
          return this.userService.setUserLogin({action:'SignIn'}).pipe(map(res=> 'success'));
        }));
      })).pipe(tap(res=>{
        if(res){
          this.router.navigate(['/admin/home']);
        }
      }));

    }else{
      const auth = getAuth().currentUser;
      if(auth) {
        this.iDToken$ =  from(auth.getIdToken()).pipe(mergeMap(token => this.userService.signInWith({idToken: token})), tap(res=>{
          if(res){
            this.router.navigate(['/admin/home']);
          }
        }));
      }


      // this.iDToken$ = this.getAuth.authState.pipe(mergeMap(as=>{
      //   return this.afAuth.idToken.pipe(mergeMap(idToken=>{
      //       if(!idToken)
      //         return empty();
      //       return this.userService.signInWith({idToken: idToken});
      //   }))
      // })).pipe(tap(res=>{
      //   if(res && res?.access_token){
      //     this.router.navigate(['/admin/home']);
      //   }
      // }))
    }



  }

}

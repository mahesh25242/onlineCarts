import { Component, OnInit } from '@angular/core';

import { FormBuilder  } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { GeneralService, UserService } from '../../../lib/services';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import {
  Auth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  getAuth
} from '@angular/fire/auth';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {

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
      title: 'Sign Out',
      url:'',
      backUrl: ''
    });


    if(environment.shopKey == environment.demoShopKey){

      this.isDemoSite = true;

      this.router.navigate(['/']);

    }else{
      signOut(getAuth());
      const auth = getAuth().currentUser;
      this.router.navigate(['/']);
      


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

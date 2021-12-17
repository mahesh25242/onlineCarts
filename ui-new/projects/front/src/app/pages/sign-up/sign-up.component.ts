import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { UserService } from '../..//lib/services';
import _First from 'lodash/first';
import {
  Auth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  user,
  User,
  getAuth
} from '@angular/fire/auth';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {  
  steps$!: Observable<string | null | undefined>;
  selectedIndex: number = 0;
  FullName: string | undefined;

  step1Frm!: FormGroup;
  constructor(
    private userService: UserService,
    private auth: Auth,
    private fromBuilder: FormBuilder
    ) {
      
      this.steps$ = user(this.auth).pipe(map(res =>{
        if(res){
          this.selectedIndex = 1;
          this.step1Frm.controls['isLogged'].setValue(true);         
        }
          
        return (res?.displayName) ? `Hi ,${res?.displayName}` : 'Sign up with Google';       
      })); 
      
      
    }




  ngOnInit(): void {
  this.step1Frm = this.fromBuilder.group({
    isLogged: [null, Validators.required],
  });
    // const auth = getAuth();

    // console.log(auth.currentUser)
    // this.user$ = this.afAuth.authState.pipe(tap((res: any)=>{
    //   this.FullName = res?.displayName;
    // }));


    
  }

}

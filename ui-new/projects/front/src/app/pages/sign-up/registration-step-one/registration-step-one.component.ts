import { Component, OnInit } from '@angular/core';
import {
  Auth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  user,
  User
} from '@angular/fire/auth';

@Component({
  selector: 'app-registration-step-one',
  templateUrl: './registration-step-one.component.html',
  styleUrls: ['./registration-step-one.component.scss']
})
export class RegistrationStepOneComponent implements OnInit {

  constructor(private auth: Auth) { }

  signInWithGoogle(): void {
    signInWithPopup(this.auth, new GoogleAuthProvider).then(res => {
      console.log(res)
    });  
  }
  

  ngOnInit(): void {
  }

}

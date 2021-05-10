import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';

@Component({
  selector: 'app-registration-step-one',
  templateUrl: './registration-step-one.component.html',
  styleUrls: ['./registration-step-one.component.scss']
})
export class RegistrationStepOneComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  signInWithGoogle(): void {
    this.afAuth.signInWithPopup(new auth.GoogleAuthProvider()).then(res=>{
      console.log(res.credential.toJSON())
    })
  }
  signInWithFB(): void{
    this.afAuth.signInWithPopup(new auth.FacebookAuthProvider()).then(res=>{
      console.log(res.credential.toJSON())
    })

  }

  ngOnInit(): void {
  }

}

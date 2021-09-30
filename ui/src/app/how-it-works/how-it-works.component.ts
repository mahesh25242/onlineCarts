import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss']
})
export class HowItWorksComponent implements OnInit {
  data:{ img?: string, title?: string, subTitle?: string, content?: string }[] =[
    {
      img: './assets/signupwithgoogle.png',
      title: 'Sign up with Google',
      subTitle: 'Autentication is done with google. So no need to remember any username or password',
      content:`Easy way to sign up and also secure way. So we are not keep any of your authetication details like username password etc.
              `
    },
    {
      img: './assets/reg_2_page.png',
      title: 'Filling all fields in register page',
      subTitle: 'Registartion form will ask the details about shops',
      content:`<p>Here you will enter the shop name, and its web address ( its a unique name so if any name was already choosen you want to change that), Shop category, Country , Mobile ( this mobile is used for shops order),state , city, Pin, and local place.</p>
              <p>Once you fill all these detail you will get an email (the email using for sign up with google) about the registerd shop</p>`
    },
    {
      img: './assets/Shop-Register-Notification-Gmail.png',
      title: 'Sent an email about registered shop',
      subTitle: 'Email will give the details about the shop that you registered',
      content:`You will get an email ( used for sign up with google ) about the shop that you registered. In that email it will show the admin url , shop url , shop name, address etc that you given in registration page   `
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}

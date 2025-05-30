import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { environment } from '../../environments/environment';
import { Observable, Subscription } from 'rxjs';
import {GeneralService, SettingService} from '../lib/services';
import Notiflix from "notiflix";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit, OnDestroy {
  contactUsFrm: FormGroup;
  contactUsSubscription: Subscription;
  footerData$: Observable<any>;
  
  constructor(private formBuilder: FormBuilder,
    private reCaptchaV3Service: ReCaptchaV3Service,
    private generalService : GeneralService,
    private settingService: SettingService) { }

  get f() { return this.contactUsFrm.controls; }

  ngOnInit(): void {
    this.contactUsFrm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      phone:['', [Validators.required]],
      comment: ['', [Validators.required]]
    });

    this.footerData$ = this.settingService.footerData();
  }
  sentContact(){
    Notiflix.Loading.Pulse(`${this.f.name.value} your query was sendng.`);
    const postData = {
      recaptcha: '',
      name: this.f.name.value,
      email: this.f.email.value,
      phone: this.f.phone.value,
      comment: this.f.comment.value,
    }
    this.reCaptchaV3Service.execute(environment.recaptchaKey, 'SignUp', (token) => {
      postData.recaptcha = token;
      this.contactUsSubscription = this.generalService.sentContact(postData).subscribe((res:any)=>{
        Notiflix.Loading.Remove();
        this.contactUsFrm.reset();

        Notiflix.Notify.Success(`successfully sent your query`);

      }, error=>{
        Notiflix.Loading.Remove();
      });
    }, {
        useGlobalDomain: false
    });

  }

  ngOnDestroy(){
    if(this.contactUsSubscription){
      this.contactUsSubscription.unsubscribe();
    }

  }
}

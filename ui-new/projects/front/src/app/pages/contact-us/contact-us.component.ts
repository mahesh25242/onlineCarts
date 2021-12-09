import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {GeneralService, SettingService} from '../../lib/services';


@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit, OnDestroy {
  contactUsFrm!: FormGroup;
  contactUsSubscription: Subscription | undefined;
  footerData$: Observable<any> | undefined;
  
  constructor(private formBuilder: FormBuilder,    
    private generalService : GeneralService,
    private settingService: SettingService) { }

  get f() { return this.contactUsFrm?.controls; }

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
    const postData = {
      recaptcha: '',
      name: this.f?.['name'].value,
      email: this.f?.['email'].value,
      phone: this.f?.['phone'].value,
      comment: this.f?.['comment'].value,
    }
      
    this.contactUsSubscription = this.generalService.sentContact(postData).subscribe((res:any)=>{      
      this.contactUsFrm?.reset();      
    }, error=>{      
    });
    

  }

  ngOnDestroy(){
    if(this.contactUsSubscription){
      this.contactUsSubscription.unsubscribe();
    }

  }
}

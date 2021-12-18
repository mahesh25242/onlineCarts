import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsRoutingModule } from './contact-us-routing.module';
import { MobileContactComponent } from './mobile-contact/mobile-contact.component';

@NgModule({
  declarations: [
    ContactUsComponent,
    MobileContactComponent
  ],
  imports: [
    CommonModule,
    ContactUsRoutingModule,
    SharedModuleModule
  ]
})
export class ContactUsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from '../../../lib/shared-module/shared-module.module';
import { ReportAbuseComponent } from './report-abuse/report-abuse.component';
import { AbuseFormComponent } from './report-abuse/abuse-form/abuse-form.component';

@NgModule({
  declarations: [ReportAbuseComponent, AbuseFormComponent],
  imports: [
    CommonModule,
    SharedModuleModule
  ],
  exports:[
    ReportAbuseComponent
  ]
})
export class ReportAbuseModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { ReportAbuseComponent } from './report-abuse/report-abuse.component';
import { AbuseFormComponent } from './report-abuse/abuse-form/abuse-form.component';
import { MyReportedAbusesComponent } from './my-reported-abuses/my-reported-abuses.component';
import { ReportAbuseRoutingModule } from './report-abuse-routing.module';

@NgModule({
  declarations: [ReportAbuseComponent, AbuseFormComponent, MyReportedAbusesComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    ReportAbuseRoutingModule
  ],
  exports:[
    ReportAbuseComponent    
  ]
})
export class ReportAbuseModule { }

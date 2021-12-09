import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { ReportedAbusesComponent } from './reported-abuses/reported-abuses.component';
import { ReportedAbuseRoutingModule } from './reported-abuse-routing.module';
import { ViewAbuseComponent } from './reported-abuses/view-abuse/view-abuse.component';




@NgModule({
  declarations: [ReportedAbusesComponent, ViewAbuseComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    ReportedAbuseRoutingModule

  ],
  providers:[

  ]
})
export class ReportedAbuseModule { }

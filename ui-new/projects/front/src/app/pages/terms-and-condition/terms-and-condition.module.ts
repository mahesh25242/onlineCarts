import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';

import { TermsAndConditionRoutingModule } from './terms-and-condition-routing.module';
import { TermsAndConditionComponent } from './terms-and-condition.component';
import { FrontComponentsModule } from '../../components/front-components.module';

@NgModule({
  declarations: [
    TermsAndConditionComponent
  ],
  imports: [
    CommonModule,
    TermsAndConditionRoutingModule,
    SharedModuleModule,
    FrontComponentsModule
  ]
})
export class TermsAndConditionModule { }

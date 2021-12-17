import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';


import { TermsAndCondtionBlockComponent } from './terms-and-condtion-block/terms-and-condtion-block.component';


@NgModule({
  declarations: [
    TermsAndCondtionBlockComponent
  ],
  imports: [
    CommonModule,
    SharedModuleModule
  ],
  exports:[
    TermsAndCondtionBlockComponent
  ]
})
export class FrontComponentsModule { }

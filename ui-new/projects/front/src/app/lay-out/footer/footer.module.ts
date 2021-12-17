import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FooterComponent } from './footer.component';
import { SharedInitialModule } from 'shared/shared-module/shared-initial.module';

@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    CommonModule,
    SharedInitialModule
  ],
  exports:[
    FooterComponent
  ]
})
export class FooterModule { }

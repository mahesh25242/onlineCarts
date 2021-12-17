import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { SharedInitialModule } from 'shared/shared-module/shared-initial.module';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,        
    SharedInitialModule,    
  ],
  exports:[
    HeaderComponent
  ]
})
export class HeaderModule { }

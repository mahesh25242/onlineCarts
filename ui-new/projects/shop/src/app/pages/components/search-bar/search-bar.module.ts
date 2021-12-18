import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedInitialModule } from 'shared/shared-module/shared-initial.module';

import { SearchBarComponent } from './search-bar.component';

@NgModule({
  declarations: [    
    SearchBarComponent,  
  ],
  imports: [
    CommonModule,    
    SharedInitialModule
  ],
  exports: [
    SearchBarComponent,
  ]
})
export class SearchBarModule { }

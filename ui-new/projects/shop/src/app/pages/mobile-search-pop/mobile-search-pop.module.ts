import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { MobileSearchPopComponent } from './mobile-search-pop.component';
import { TestRoutingModule } from './mobile-search-pop-routing.module';




@NgModule({
  declarations: [
    MobileSearchPopComponent,    
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    SharedModuleModule,      
  ]
})
export class MobileSearchPopModule { }

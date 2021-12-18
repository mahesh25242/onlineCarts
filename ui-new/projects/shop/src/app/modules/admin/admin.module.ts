import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




import { SharedModuleModule } from 'shared/shared-module/shared-module.module';



import {  AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';




@NgModule({
  declarations: [  AdminComponent,           
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModuleModule,        
    // TicketModule,
    // ReportAbuseModule,    
  ],
  providers:[
    
  ]
})
export class AdminModule { }

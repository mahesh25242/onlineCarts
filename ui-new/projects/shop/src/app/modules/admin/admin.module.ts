import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuillModule } from 'ngx-quill'



import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { 
  TagModule, 
  // TicketModule, 
  // ReportAbuseModule,
   ShopPointsModule 
  } from './modules';



import {  AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';


import AdminDeclarations from './';

@NgModule({
  declarations: [  AdminComponent,           
    ...AdminDeclarations     
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModuleModule,
    QuillModule.forRoot(),
    TagModule,
    // TicketModule,
    // ReportAbuseModule,
    ShopPointsModule,    
  ],
  providers:[
    
  ]
})
export class AdminModule { }

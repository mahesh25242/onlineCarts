import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';


@NgModule({
  declarations: [
    PageNotFoundComponent,    
  ],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule,
    SharedModuleModule,    
  ]
})
export class PageNotFoundModule { }

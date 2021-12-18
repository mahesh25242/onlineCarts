import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { PageComponentsModule } from '../components/page.components.module';

@NgModule({
  declarations: [
    HomeComponent,    
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModuleModule,
    PageComponentsModule
  ]
})
export class HomeModule { }

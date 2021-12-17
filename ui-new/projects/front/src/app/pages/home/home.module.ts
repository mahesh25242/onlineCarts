import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {IvyCarouselModule} from 'angular-responsive-carousel';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { HomeRoutingModule } from './home-routing.module';
import HomePageComponents from './';


@NgModule({
  declarations: [
    HomePageComponents
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModuleModule,
    IvyCarouselModule
  ]
})
export class HomeModule { }

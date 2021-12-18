import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';




import { IvyCarouselModule } from 'angular-responsive-carousel';
import { CarouselComponent } from './carousel.component';


@NgModule({
  declarations: [    
    CarouselComponent,       
  ],
  imports: [
    CommonModule,    
    SharedModuleModule,
    IvyCarouselModule
  ],
  exports: [
    CarouselComponent
  ]
})
export class CaroselModule { }

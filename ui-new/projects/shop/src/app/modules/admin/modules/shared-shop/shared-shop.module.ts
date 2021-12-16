import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@NgModule({
  declarations: [    
  ],
  imports: [
    CommonModule,    
    ShareButtonsModule.withConfig({
      debug: false
    }),
    ShareIconsModule,
    NgxSliderModule    
  ],
  exports: [    
    ShareButtonsModule,
    ShareIconsModule,
    NgxSliderModule
  ],
  providers:[   
  ]
})
export class ShopSharedModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';


@NgModule({
  declarations: [    
  ],
  imports: [
    CommonModule,    
    ShareButtonsModule.withConfig({
      debug: false
    }),
    ShareIconsModule    
  ],
  exports: [    
    ShareButtonsModule,
    ShareIconsModule
  ],
  providers:[   
  ]
})
export class ShopSharedModule { }

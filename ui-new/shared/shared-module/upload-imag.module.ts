import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadImageService } from 'shared/providers/upload-image-compress.service';

@NgModule({
  declarations: [    
  ],
  imports: [
    CommonModule,
    
    

  ],
  exports: [
    
    
  ],
  providers:[    
    {
      provide: 'UploadImageService',
      useClass: UploadImageService
    },
  ]
})
export class UploadImageModule { }

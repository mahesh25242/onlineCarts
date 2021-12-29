import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RazorGatewayComponent } from './razor-gateway/razor-gateway.component';

@NgModule({
  declarations: [  
    RazorGatewayComponent
  ],
  imports: [
    CommonModule,                     
  ],
  exports:[    
    RazorGatewayComponent
  ],
  providers:[    
  ]
})
export class FirebaseModule { }

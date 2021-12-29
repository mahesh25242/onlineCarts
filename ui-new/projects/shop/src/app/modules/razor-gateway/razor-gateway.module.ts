import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RazorGatewayComponent } from './razor-gateway/razor-gateway.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [  
    RazorGatewayComponent
  ],
  imports: [
    CommonModule,     
    MatButtonModule                
  ],
  exports:[    
    RazorGatewayComponent
  ],
  providers:[    
  ]
})
export class FirebaseModule { }

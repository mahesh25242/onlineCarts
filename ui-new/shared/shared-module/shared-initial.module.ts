import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [    
  ],
  imports: [
    CommonModule,
        
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,    
    MatToolbarModule,

    FlexLayoutModule,
    RouterModule,
    

  ],
  exports: [    
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatMenuModule,
    MatButtonModule,  
    MatInputModule,
    MatFormFieldModule,    
    MatToolbarModule,

    FlexLayoutModule,
    
    
    RouterModule
  
  ],
  providers:[    
  ]
})
export class SharedInitialModule { }

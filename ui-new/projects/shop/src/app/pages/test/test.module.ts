import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { TestComponent } from './test.component';
import { TestRoutingModule } from './test-routing.module';

import { environment } from '@shop/environments/environment';


@NgModule({
  declarations: [
    TestComponent,    
  ],
  imports: [
    CommonModule,
    TestRoutingModule,
    SharedModuleModule,    
    // provideFirebaseApp(() => {
    //     return initializeApp(  environment.firebaseConfig )
    //   })
  ]
})
export class TestModule { }

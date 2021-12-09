import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleModule } from 'shared/shared-module/shared-module.module';
import { UserIdProofComponent } from './user-id-proof/user-id-proof.component';
import { UserIdProofRoutingModule } from './user-id-proof-routing.module';

@NgModule({
  declarations: [UserIdProofComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    UserIdProofRoutingModule

  ],
  providers:[

  ]
})
export class UserIdProofModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserIdProofComponent } from './user-id-proof/user-id-proof.component';

const routes: Routes = [
  {
    path: '',
    component: UserIdProofComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserIdProofRoutingModule { }

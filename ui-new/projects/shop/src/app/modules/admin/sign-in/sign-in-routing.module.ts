import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NegateAuthGuard } from '@shop/app/lib/guard';
import { SignInComponent } from './sign-in.component';

const routes: Routes = [{ path: '', component: SignInComponent, canActivate: [NegateAuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignInRoutingModule { }

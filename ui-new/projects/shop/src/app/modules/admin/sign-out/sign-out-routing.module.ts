import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '@shop/app/lib/guard';
import { SignOutComponent } from './sign-out.component';

const routes: Routes = [{ path: '', component: SignOutComponent, canActivate: [AdminAuthGuard]  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignOutRoutingModule { }

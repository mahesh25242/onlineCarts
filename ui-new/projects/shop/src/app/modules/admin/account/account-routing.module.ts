import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from '@shop/app/lib/guard';
import { AccountComponent } from './account.component';

const routes: Routes = [
    { path: '', component: AccountComponent,
    canActivate: [AdminAuthGuard], 
    children:[
      {
        path: '',
        loadChildren: () => import('../edit-profile/edit-profile.module').then(m => m.EditProfileModule),
      },
      {
        path: 'help-desk',
        loadChildren: () => import('../modules/tickets/ticket.module').then(m => m.TicketModule)          
      },
      {
        path: 'my-payments',
        loadChildren: () => import('../my-payments/my-apyments.module').then(m => m.MyPaymentsModule)
      },
      {
        path: 'my-abuses',
        loadChildren: () => import('../modules/report-abuse/report-abuse.module').then(m => m.ReportAbuseModule)          
      },        
    ]
   },
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }

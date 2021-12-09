import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { AdminAuthGuard, NegateAuthGuard } from '../../lib/guard';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AdminHomeComponent } from './admin-home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingResolver } from './settings/setting-resolver';
import { PackageComponent } from './package/package.component';
import { PackageResolver } from './package/package-resolver';

const routes: Routes = [
  {
    path: 'login',
    component: SignInComponent,
  },
  {
    path: '',
    component: AdminHomeComponent,
    canActivate: [AdminAuthGuard],
    children:[
      {
        path: '',
        component: DashBoardComponent,
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
        resolve:{
          settings: SettingResolver
        }
      },
      {
        path: 'packages',
        component: PackageComponent,
        resolve:{
          settings: PackageResolver
        }
      },
      // {
      //   path: 'shops',
      //   loadChildren: () => import('./shops/shop.module').then(m => m.ShopModule),
      //   canActivate: [AdminAuthGuard],

      // },
      {
        path: 'tickets',
        loadChildren: () => import('./modules/tickets/tickets.module').then(m => m.TicketsModule),
        canActivate: [AdminAuthGuard],

      },
      {
        path: 'trash',
        loadChildren: () => import('./modules/trashed/trashed.module').then(m => m.TrashedModule),
        canActivate: [AdminAuthGuard],

      },
      {
        path: 'reported-abuses',
        loadChildren: () => import('./modules/reported-abuse/reported-abuse.module').then(m => m.ReportedAbuseModule),
        canActivate: [AdminAuthGuard],

      },
      {
        path: 'prefill-messages',
        loadChildren: () => import('./modules/prefill-message/prefill-message.module').then(m => m.PrefillMessageModule),
        canActivate: [AdminAuthGuard],

      },
      {
        path: 'user-id-proof',
        loadChildren: () => import('./modules/user-id-proof/user-id-proofmodule').then(m => m.UserIdProofModule),
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'point-coupons',
        loadChildren: () => import('./modules/point-coupons/point-coupons.module').then(m => m.PointCouponsModule),
        canActivate: [AdminAuthGuard],

      },
    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';



const routes: Routes = [ 
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },  
  { path: 'about-us', loadChildren: () => import('./pages/about-us/about-us.module').then(m => m.AboutUsModule) },
  { path: 'contact-us', loadChildren: () => import('./pages/contact-us/contact-us.module').then(m => m.ContactUsModule) },  
  { path: 'how-it-works', loadChildren: () => import('./pages/how-it-works/how-it-works.module').then(m => m.HowItWorkModule) },  
  { path: 'pricing', loadChildren: () => import('./pages/pricing/pricing.module').then(m => m.PricingModule) },    
  { path: 'privacy-policy', loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },    
  { path: 'refund-policy', loadChildren: () => import('./pages/refund-and-cancellation/refund-and-cancellation.module').then(m => m.RefundAndCancellationModule) },      
  { path: 'terms-and-condition', loadChildren: () => import('./pages/terms-and-condition/terms-and-condition.module').then(m => m.TermsAndConditionModule) },      
  { path: 'sign-up', loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule) },
  { path: 'admin',  loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)  },
  // {
  //   path: 'shop',
  //   loadChildren: () => import('./modules/shop-admin/shop-admin.module').then(m => m.ShopAdminModule)
  // },
  { path: '**', loadChildren: () => import('./pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule) },    
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

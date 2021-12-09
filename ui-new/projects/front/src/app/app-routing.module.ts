import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent, ContactUsComponent, HomeComponent, 
  HowItWorksComponent, PackageResolver, PageNotFoundComponent, 
  PricingComponent, PrivacyPolicyComponent, 
  RefundAndCancellationComponent, SignUpComponent, 
  TermsAndConditionComponent } from './pages';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'pricing',
    component: PricingComponent,
    resolve:{
      packages: PackageResolver
    }
  },
  {
    path: 'how-it-works',
    component: HowItWorksComponent
  },
  {
    path: 'contact-us',
    component: ContactUsComponent
  },
  {
    path: 'terms-and-condition',
    component: TermsAndConditionComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'refund-policy',
    component: RefundAndCancellationComponent    
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'admin',
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  // {
  //   path: 'shop',
  //   loadChildren: () => import('./modules/shop-admin/shop-admin.module').then(m => m.ShopAdminModule)
  // },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [PackageResolver]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment }  from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { httpInterceptorProviders } from './lib/interceptor'
import {  SharedModuleModule } from './shared-module/shared-module.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BannerComponent } from './header/banner/banner.component';
import { FeaturesComponent } from './home/features/features.component';
import { StepsToStartComponent } from './home/steps-to-start/steps-to-start.component';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { OurClientsComponent } from './home/our-clients/our-clients.component';
import { RefundAndCancellationComponent } from './refund-and-cancellation/refund-and-cancellation.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PricingComponent } from './pricing/pricing.component';
import { PackageResolver } from './pricing/package-resolver';
import { WhoNeedThisComponent } from './home/who-need-this/who-need-this.component';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutUsComponent,
    HowItWorksComponent,
    ContactUsComponent,
    PageNotFoundComponent,
    BannerComponent,
    FeaturesComponent,
    StepsToStartComponent,
    TermsAndConditionComponent,
    PrivacyPolicyComponent,
    OurClientsComponent,
    RefundAndCancellationComponent,
    PricingComponent,
    WhoNeedThisComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModuleModule,
    HttpClientModule,
    HttpClientXsrfModule.disable(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    PackageResolver,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

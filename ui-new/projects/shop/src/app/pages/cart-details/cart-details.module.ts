import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule } from 'shared/shared-module/shared-module.module';

import { CartDetailsRoutingModule } from './cart-details-routing.module';
import { CartDetailsComponent } from './cart-details.component';
import { DeleteConfirmationComponent } from './delete-confirmation/delete-confirmation.component';
import { DeliveryLocationComponent } from './delivery-loaction/delivery-loaction.component';
import { EditMessageComponent } from './edit-message/edit-message.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderTermsComponent } from './order-terms/order-terms.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '@app/environments/environment';
import { AngularFireAuthGuardModule } from '@angular/fire/compat/auth-guard';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {MatNativeDateModule} from '@angular/material/core';


@NgModule({
  declarations: [
    CartDetailsComponent,
    DeleteConfirmationComponent,
    DeliveryLocationComponent,
    EditMessageComponent,
    OrderFormComponent,
    OrderTermsComponent
  ],
  imports: [
    CommonModule,
    CartDetailsRoutingModule,
    SharedModuleModule,
    MatNativeDateModule,    
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireMessagingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
  ]
})
export class CartDetailsModule { }

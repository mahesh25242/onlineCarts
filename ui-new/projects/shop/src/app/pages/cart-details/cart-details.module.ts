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
    SharedModuleModule
  ]
})
export class CartDetailsModule { }

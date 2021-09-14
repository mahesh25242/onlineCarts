import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';


import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


import { SharedModuleModule } from '../../shared-module/shared-module.module';
import {  AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { SignInComponent } from './sign-in/sign-in.component';



@NgModule({
  declarations: [AdminHomeComponent, DashBoardComponent,
    EditProfileComponent, SignInComponent],
  imports: [
    CommonModule,
    SharedModuleModule,
    AdminRoutingModule,
    NgxQRCodeModule,
    SocketIoModule.forRoot(environment.socketConfig as SocketIoConfig)
  ],
  providers:[

  ]
})
export class AdminModule { }

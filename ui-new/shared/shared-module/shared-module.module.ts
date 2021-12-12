import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { SafeHtmlPipe, NumToWordPipe } from '../lib/pipes';

import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from "ng-recaptcha";



import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {LayoutModule} from '@angular/cdk/layout';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatRadioModule} from '@angular/material/radio';
import {MatRippleModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {OverlayModule} from '@angular/cdk/overlay';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatStepperModule} from '@angular/material/stepper';
import { FlexLayoutModule } from '@angular/flex-layout';



import { HttpClientModule } from '@angular/common/http';
import { environment } from 'shared/environments/environment';
import { NotiflixService } from 'shared/providers/notiflix.service';
import { UploadImageService } from 'shared/providers/upload-image-compress.service';

@NgModule({
  declarations: [
    SafeHtmlPipe,
    NumToWordPipe
  ],
  imports: [
    CommonModule,
    
    RecaptchaV3Module,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    

    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    ScrollingModule,
    MatRadioModule,
    MatRippleModule,
    MatTabsModule,
    MatExpansionModule,
    MatBadgeModule,
    DragDropModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatProgressBarModule,
    ClipboardModule,
    MatToolbarModule,
    MatStepperModule,

    FlexLayoutModule,
    
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,

 

  ],
  exports: [
    
    SafeHtmlPipe,
    NumToWordPipe,
    
    RecaptchaV3Module,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatSidenavModule,
    MatListModule,
    LayoutModule,
    MatMenuModule,
    MatTableModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    ScrollingModule,
    MatRadioModule,
    MatRippleModule,
    MatTabsModule,
    MatExpansionModule,
    MatBadgeModule,
    DragDropModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatBottomSheetModule,
    MatProgressSpinnerModule,
    OverlayModule,
    MatProgressBarModule,
    ClipboardModule,
    MatToolbarModule,
    MatStepperModule,

    FlexLayoutModule,
    
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,

  
  ],
  providers:[
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: RECAPTCHA_V3_SITE_KEY, useValue:environment.recaptchaKey },
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    {
      provide: 'NotiflixService',
      useClass: NotiflixService
    },
    {
      provide: 'UploadImageService',
      useClass: UploadImageService
    },
  ]
})
export class SharedModuleModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { NgxCaptchaModule } from 'ngx-captcha';
import Notiflix from "notiflix";
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { ScrollTrackerDirective } from './scroll-tracker.directive';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { FocusInvalidInputDirective } from '../../components/focus-invalid-input.directive';

import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxImageCompressService} from 'ngx-image-compress';
import { NgxNumToWordsModule } from 'ngx-num-to-words';

import { ShareButtonsModule, } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ShareModule } from 'ngx-sharebuttons';


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
import {MatNativeDateModule} from '@angular/material/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatRadioModule} from '@angular/material/radio';
import {MatRippleModule} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatBadgeModule} from '@angular/material/badge';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {OverlayModule} from '@angular/cdk/overlay';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {MatProgressBarModule} from '@angular/material/progress-bar';

Notiflix.Confirm.Init({
  className: 'oc-confirm'
})

Notiflix.Notify.Init({ width:"390px", success: {background:"#d4edda",textColor:"#155724",}, failure: {background:"#f8d7da",textColor:"#721c24",}, warning: {background:"#fff3cd",textColor:"#856404",}, info: {background:"#cce5ff",textColor:"#004085",}, });
// Notiflix.Report.Init({ svgSize:"80px",borderRadius:"5px",width:"390px", success: {svgColor:"#45c489",buttonBackground:"#204486",}, });
Notiflix.Loading.Init({ className: 'oc-loading'});
Notiflix.Block.Init({ className: 'oc-loading' });

@NgModule({
  declarations: [
    SafeHtmlPipe,
    ScrollTrackerDirective,
    FocusInvalidInputDirective
  ],
  imports: [
    CommonModule,
    // NgbModule,
    NgSelectModule,
    RouterModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    InfiniteScrollModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    FlexLayoutModule,
    NgxNumToWordsModule,
    ShareButtonsModule,
    ShareIconsModule,
    ShareModule,

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
    ClipboardModule
  ],
  exports:[
    NgSelectModule,
    // NgbModule,
    SafeHtmlPipe,
    FocusInvalidInputDirective,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    InfiniteScrollModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,

    ShareButtonsModule,
    ShareIconsModule,
    ShareModule,

    FlexLayoutModule,
    NgxNumToWordsModule,

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
    ScrollTrackerDirective,
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
    ClipboardModule
  ],
  providers:[
    DatePipe,
    CurrencyPipe,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    NgxImageCompressService
  ]
})
export class SharedModuleModule { }

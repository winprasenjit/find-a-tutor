import {AlertComponent} from './components/alert/components/alert.component';

import {AuthGuard} from './helper/auth.guard';
import {AlertService} from './services/alert.service';
import {ActionButtonsComponent} from './components/action-buttons/components/action-buttons.component';
import {SortPipe} from './pipes/order-by';
import {FilterArrayPipe} from './pipes/filter-array-pipe';
import {SharedService} from './services/shared.service';
import {GridComponent} from './components/grid/components/grid.component';
import {AppMaterialModule} from '../app-material.module';
import {EqualValidatorDirective} from './directives/password.match.directive';

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AuthenticationService} from './services/authentication.service';
import {CommunicationService} from 'app/shared/services/communication.service';
import {ImageUploaderComponent} from './components/image-uploader/image-uploader.component';
import {ScrollerDirective} from './directives/scroller.directive';
import {SetAutoHeightDirective} from "./directives/set-auto-height.directive";
import {SafeHtmlPipe} from "./pipes/safe-html";

@NgModule({
    declarations: [
        AlertComponent,
        GridComponent,
        ActionButtonsComponent,
        EqualValidatorDirective,
        SortPipe,
        FilterArrayPipe,
        SafeHtmlPipe,
        ImageUploaderComponent,
        ScrollerDirective,
        SetAutoHeightDirective
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        AlertComponent,
        GridComponent,
        ActionButtonsComponent,
        EqualValidatorDirective,
        SortPipe,
        FilterArrayPipe,
        SafeHtmlPipe,
        ImageUploaderComponent,
        ScrollerDirective,
        SetAutoHeightDirective
    ],
    providers: [],
    entryComponents: [ImageUploaderComponent]
})
export class SharedModule {
}

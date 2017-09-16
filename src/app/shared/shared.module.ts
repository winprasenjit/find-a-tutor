import { ActionButtonsComponent } from './components/action-buttons/components/action-buttons.component';
import { SortPipe } from './pipes/order-by';
import { SharedService } from './services/shared.service';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { GridComponent } from './components/grid/components/grid.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppMaterialModule } from '../app-material.module';
import { EqualValidatorDirective } from './directives/password.match.directive';

@NgModule({
    declarations: [
        GridComponent,
        ActionButtonsComponent,
        EqualValidatorDirective,
        SortPipe
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot()
    ],
    exports: [
        AppMaterialModule,
        GridComponent,
        ActionButtonsComponent,
        EqualValidatorDirective,
        SortPipe
    ],
    providers: [SharedService],
})
export class SharedModule { }
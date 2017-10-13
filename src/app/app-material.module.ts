import { NgModule } from '@angular/core';
import {
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatRadioModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatPaginatorModule
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
    exports: [
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatRadioModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        CdkTableModule
    ],
    providers: [
    ]
})
export class AppMaterialModule {}

import { NgModule } from '@angular/core';
import {
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatPaginatorModule
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
    exports: [
        MatCheckboxModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatRadioModule,
        MatSelectModule,
        MatSliderModule,
        MatSlideToggleModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        CdkTableModule
    ],
    providers: [
        MatNativeDateModule
    ]
})
export class AppMaterialModule {}

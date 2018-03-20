import { NgModule } from '@angular/core';
import {
    MatToolbarModule,
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
    MatListModule,
    MatPaginatorModule
} from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
    exports: [
        MatToolbarModule,
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
        MatListModule,
        CdkTableModule
    ],
    providers: [
        MatNativeDateModule
    ]
})
export class AppMaterialModule {}

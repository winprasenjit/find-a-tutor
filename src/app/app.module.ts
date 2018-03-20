import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NgRedux, NgReduxModule, DevToolsExtension } from "ng2-redux";

import { CategoryModule } from './modules/category/category.module';
import { ContactModule } from './modules/contact/contact.module';
import { SharedModule } from './shared/shared.module';
import { AppMaterialModule } from './app-material.module';

import { Routing } from './app.routing';

import { AppComponent } from './app.component';
import { RegistrationComponent } from './modules/registration/registration.component';
import { GridComponent } from './shared/components/grid/components/grid.component';
import { HeaderComponent } from './header/header.component';
import { TopLinkComponent } from './top-link/top-link.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard.component';
import { LoginComponent } from './modules/login/components/login.component';

import { SharedService } from './shared/services/shared.service';

import { AddTaskComponent } from './add-task/add-task.component';
import { ListTaskComponent } from './list-task/list-task.component';
import { IAppstate, rootReducer, INITIAL_STATE } from './shared/helper/store';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        TopLinkComponent,
        SidebarComponent,
        DashboardComponent,
        RegistrationComponent,
        AddTaskComponent,
        ListTaskComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        NgReduxModule,
        Routing,
        SharedModule,
        AppMaterialModule,
        CategoryModule,
        ContactModule
    ],
    providers: [
    ],
    bootstrap: [AppComponent],
    entryComponents: [AddTaskComponent, ListTaskComponent]
})
export class AppModule {
    constructor(
        ngRedux: NgRedux<IAppstate>,
        devTools: DevToolsExtension
    ) {
        let enhancer = (isDevMode) ? [devTools.enhancer()] : [];
        ngRedux.configureStore(rootReducer, INITIAL_STATE, [], enhancer);
    }
}

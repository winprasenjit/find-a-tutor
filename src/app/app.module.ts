import { RegistrationComponent } from './modules/registration/registration.component';
import { GridComponent } from './shared/components/grid/components/grid.component';
import { Routing } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { SharedService } from './shared/services/shared.service';
import { HeaderComponent } from './header/header.component';
import { TopLinkComponent } from './top-link/top-link.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard.component';
import { LoginComponent } from './modules/login/components/login.component';
import { AuthenticationService } from './shared/services/authentication.service';
import { CommunicationService } from './shared/services/communication.service';

import 'hammerjs';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        TopLinkComponent,
        SidebarComponent,
        DashboardComponent,
        RegistrationComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        Routing,
        SharedModule,
        AppMaterialModule
    ],
    providers : [
        AuthenticationService,
        CommunicationService
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }

import { GridComponent } from './shared/components/grid/components/grid.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';
import { Routing } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { SharedService } from './shared/services/shared.service';
import { HeaderComponent } from './header/header.component';
import { TopLinkComponent } from './top-link/top-link.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './modules/dashboard/components/dashboard.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        TopLinkComponent,
        SidebarComponent,
        DashboardComponent,
    ],
    imports: [
        BrowserModule,
        NoopAnimationsModule,
        FormsModule,
        HttpModule,
        Routing,
        SharedModule,
        AppMaterialModule
    ],
    bootstrap: [AppComponent],

})
export class AppModule { }

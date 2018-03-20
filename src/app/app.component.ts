import { AuthenticationService } from './shared/services/authentication.service';
import { CommunicationService } from './shared/services/communication.service';

import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit } from '@angular/core';

declare var jQuery: any; // JQuery

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    isLoggedIn = false;
    rowData = [];

    constructor(private authService: AuthenticationService,
        private communicationnService: CommunicationService) {

        this.communicationnService
            .getLoginType()
            .subscribe((loggedin: boolean) => {
                setTimeout(() => { this.isLoggedIn = loggedin });
            });
    }

    ngOnInit() {
        this.isLoggedIn = this.authService.isLoggedIn();
    }
}

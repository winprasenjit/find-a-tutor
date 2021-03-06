import { AlertService } from './../../../shared/services/alert.service';
import { AuthenticationService } from './../../../shared/services/authentication.service';
import { CommunicationService } from './../../../shared/services/communication.service';

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUsers } from '../../../shared/interfaces/iUser';
import { User } from '../../user/models/user.model';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    returnUrl: string;
    user: FormGroup;

    constructor(private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private sharedService: SharedService,
        private communicationService: CommunicationService) { }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
        this.communicationService.setLoginType(false);

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.user = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(4)]]
        });
    }

    onSubmit({ value, valid }: { value: IUsers, valid: boolean }) {
        this.authenticationService
            .login(value.username, value.password)
            .subscribe(
                (data : User) => {
                    this.router.navigate([this.returnUrl]);
                    this.communicationService.setLoginType(true);
                    this.sharedService.userInfo = data;
                },
                error => {
                    this.alertService.error(error._body);
                    // this.loading = false;
                });
    }
}

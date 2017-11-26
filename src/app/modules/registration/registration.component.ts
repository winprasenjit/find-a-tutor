import { IUsers } from './../user/models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidateConfirmPassword } from '../../shared/validators/confirm-password.validator';
import { MobileNumberValidation } from '../../shared/validators/mobile-number.validator';
import { UserService } from '../user/services/user.service';
import { User } from '../user/models/user.model';
import { AlertService } from '../../shared/services/alert.service';
import { CommunicationService } from 'app/shared/services/communication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    providers: [UserService]
})
export class RegistrationComponent implements OnInit {
    user: FormGroup;
    subjectList = ['Bengali', 'English', 'Science', 'Computer', 'History', 'Geography', 'Mathmetics', 'Other'];

    constructor(private router: Router, private fb: FormBuilder,
        private userService: UserService,
        private alertService: AlertService,
        private communicationService: CommunicationService) { }

    ngOnInit() {
        this.user = this.fb.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(4)]], // , ValidateConfirmPassword('confirmPassword')
            confirmPassword: ['', [Validators.required, Validators.minLength(4), ValidateConfirmPassword('password')]],
            sex: ['', [Validators.required]],
            email: ['', [Validators.required]],
            mobile: ['', [Validators.required, MobileNumberValidation]],
            dob: ['', [Validators.required]],
            aboutu: [''],
            subject: [''],
            isAgree: ['', [Validators.required]]
        });
    }

    onSubmit({ value, valid }: { value: IUsers, valid: boolean }) {
        if (valid) {
            this.userService
                .createUser(this.user.value)
                .subscribe((result: User) => {
                    localStorage.setItem('currentUser', JSON.stringify(result));
                    this.alertService.success('User added');
                    this.router.navigate(['/dashboard']);
                    this.communicationService.setLoginType(true);
                });
        }
    }
}

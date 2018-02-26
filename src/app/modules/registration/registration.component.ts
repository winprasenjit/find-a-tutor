import { Component, OnInit, ElementRef } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { ValidateConfirmPassword } from '../../shared/validators/confirm-password.validator';
import { MobileNumberValidation } from '../../shared/validators/mobile-number.validator';
import { UserService } from '../user/services/user.service';
import { User } from '../user/models/user.model';
import { AlertService } from '../../shared/services/alert.service';
import { CommunicationService } from 'app/shared/services/communication.service';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { ApiSettings } from '../../shared/constants/api.constant';
import { Category } from '../category/models/category';
import { CategoryService } from '../category/services/category.service';
import { IUsers } from '../../shared/interfaces/iUser';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css'],
    providers: [UserService]
})
export class RegistrationComponent implements OnInit {
    uploadUrl = ApiSettings.USER_IMAGE_UPLOAD_URL;
    uploadImg: string;
    user: FormGroup;
    category: Category[] = [];
    subjectList = [];

    constructor(private router: Router, private fb: FormBuilder,
        private http: Http,
        private el: ElementRef,
        private userService: UserService,
        private alertService: AlertService,
        private communicationService: CommunicationService,
        private categoryService: CategoryService) { }

    ngOnInit() {
        this.getCategoryData();
        this.user = this.fb.group({
            firstname: ['', [Validators.required]],
            lastname: ['', [Validators.required]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(4)]], // , ValidateConfirmPassword('confirmPassword')
            confirmPassword: ['', [Validators.required, Validators.minLength(4), ValidateConfirmPassword('password')]],
            sex: ['', [Validators.required]],
            dob: ['', [Validators.required]],
            contact: this.fb.array([]),
            subject: [''],
            isAgree: ['', [Validators.required]]
        });
        this.addContact();
    }

    initContact() {
        return this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required, MobileNumberValidation]],
            aboutu: []
        });
    }

    addContact() {
        const control = <FormArray>this.user.controls['contact'];
        const addrCtrl = this.initContact();

        control.push(addrCtrl);

        /* //subscribe to individual address value changes
        addrCtrl.valueChanges.subscribe(x => {
            console.log(x);
        })*/
    }

    getCategoryData(): void {
        this.categoryService
            .getAllCategory()
            .subscribe((result: Category[]) => {
                this.subjectList = result;
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

    // the function which handles the file upload without using a plugin.
    upload() {
        // locate the file element meant for the file upload.
        const inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
        // get the total amount of files attached to the file input.
        const fileCount: number = inputEl.files.length;
        // create a new fromdata instance
        const formData = new FormData();
        // check if the filecount is greater than zero, to be sure a file was selected.
        if (fileCount > 0) { // a file was selected
            // append the key name 'photo' with the first file in the element
            formData.append('photo', inputEl.files.item(0));
            // call the angular http method
            this.http
                // post the form data to the url defined above and map the response.
                // Then subscribe //to initiate the post. if you don't subscribe, angular wont post.
                .post(this.uploadUrl, formData)
                .map((res: Response) => res.json())
                .subscribe(
                    // map the success function and alert the response
                    (response) => {
                        this.uploadImg = ApiSettings.API_ENDPOINT + response.filePath;
                    },
                    (error) => console.log(error))
        }
    }
}

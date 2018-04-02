import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, FormControlName, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as _ from 'lodash';

import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { GlobalConstant } from '../../../../shared/constants/global.constant';
import { Category } from '../../../category/models/category';
import { CategoryService } from '../../../category/services/category.service';
import { MobileNumberValidation } from '../../../../shared/validators/mobile-number.validator';
import { AuthenticationService } from '../../../../shared/services/authentication.service';
import { UserService } from '../../../user/services/user.service';
import { SharedService } from '../../../../shared/services/shared.service';
import { User } from '../../../user/models/user.model';

@Component({
    selector: 'app-addpost',
    templateUrl: './addpost.component.html',
    providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} }
    ],
    styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {
    globalConst = GlobalConstant;
    isUpdate = false;
    addPostForm: FormGroup;
    submitted = false;
    subjectList: Category[] = [];

    constructor(@Inject(MAT_DIALOG_DATA) private data: any,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<AddpostComponent>,
        private categoryService: CategoryService,
        private authService: AuthenticationService,
        private sharedService : SharedService,
        private addPostService: PostService) {
    }

    ngOnInit(): void {
        this.getCategoryData();
        this.isUpdate = (_.isEmpty(this.data)) ? false : true;
        this.addPostForm = this.fb.group({
            title: [(this.data) ? this.data.title : '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            subject: ['', [Validators.required]],
            description: ['', [Validators.required]],
            contact: this.fb.array([]),
            price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        });
        this.addContact();
    }

    onSubmit({ value, valid }: { value: Post, valid: boolean }): void {
        if (valid) {
            if (!this.isUpdate) {
                this.saveUser(value);
            } else {
                this.updateUser(value);
            }
        }
    }

    saveUser(value: Post): void {
        this.addPostService
            .createPost(value)
            .subscribe((result: Post) => {
                this.dialogRef.close(result);
            });
    }

    updateUser(value: Post): void {
        Object.assign(this.data, value);
        this.addPostService
            .updatePost(this.data)
            .subscribe((result: Post) => {
                if (this.dialogRef) {
                    this.dialogRef.close(result);
                }
            });
    }

    initContact() {
        return this.fb.group({
            email: [this.sharedService.userInfo.email, [Validators.required, Validators.email]],
            mobile: [this.sharedService.userInfo.mobile, [Validators.required, MobileNumberValidation]],
            aboutu: []
        });
    }

    addContact() {
        const control = <FormArray>this.addPostForm.controls['contact'];
        const addrCtrl = this.initContact();

        control.push(addrCtrl);
    }

    getCategoryData(): void {
        this.categoryService
            .getAllCategory()
            .subscribe((result: Category[]) => {
                this.subjectList = result;
            });
    }
}
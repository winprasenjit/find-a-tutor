import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, FormControlName, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { GlobalConstant } from '../../../../shared/constants/global.constant';
import { Category } from '../../../category/models/category';
import { CategoryService } from '../../../category/services/category.service';
import { MobileNumberValidation } from '../../../../shared/validators/mobile-number.validator';

@Component({
    selector: 'app-addpost',
    templateUrl: './addpost.component.html',
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
        private addPostService: PostService) {
    }

    ngOnInit(): void {
        this.getCategoryData();
        this.isUpdate = (!this.data) ? false : true;
        this.addPostForm = this.fb.group({
            name: [(this.data) ? this.data.name : '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            subject: ['', [Validators.required]],
            description: ['', [Validators.required]],
            contact: this.fb.array([]),
            price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
        });
        this.addContact();
    }

    onSubmit({ value, valid }: { value: Post, valid: boolean }): void {
        console.dir(this.addPostForm);
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
                this.dialogRef.close(result);
            });
    }

    initContact() {
        return this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            mobile: ['', [Validators.required, MobileNumberValidation]],
            aboutu: []
        });
    }

    addContact() {
        const control = <FormArray>this.addPostForm.controls['contact'];
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
}


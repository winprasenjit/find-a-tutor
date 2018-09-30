import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { NgRedux } from '@angular-redux/store';
import * as _ from 'lodash';

import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { GlobalConstant } from '../../../../shared/constants/global.constant';
import { Category } from '../../../category/models/category';
import { CategoryService } from '../../../category/services/category.service';
import { MobileNumberValidation } from '../../../../shared/validators/mobile-number.validator';
import { SharedService } from '../../../../shared/services/shared.service';
import { ApiSettings } from '../../../../shared/constants/api.constant';
import { IImagestate } from '../../../../shared/components/image-uploader/helpers/image-store';
import { AlertService } from '../../../../shared/services/alert.service';
import { Observable } from 'rxjs';
import { IPoststate } from '../../helpers/post.store';
import { ADD_POST, UPDATE_POST } from '../../helpers/post.constant';

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
    post: Post;
    postId: string;
    addPostForm: FormGroup;
    globalConst = GlobalConstant;
    isUpdate = false;
    submitted = false;
    imageConfig = {
        url: ApiSettings.USER_IMAGE_UPLOAD_URL,
        folder: 'post'
    }
    observebaleSubjects: Observable<Category[]>;
    uploadedUrl: string;

    constructor(@Inject(MAT_DIALOG_DATA) private data: any,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute,
        private ngRedux: NgRedux<IImagestate>,
        private ngReduxPost: NgRedux<IPoststate>,
        private fb: FormBuilder,
        private categoryService: CategoryService,
        private sharedService: SharedService,
        private addPostService: PostService) {
    }

    ngOnInit(): void {
        this.getCategoryData();
        this.postId = this.route.snapshot.params.id;
        if (this.postId) {
            this.getPost(this.postId);
        }
        this.isUpdate = (_.isEmpty(this.data)) ? false : true;
        this.addPostForm = this.fb.group({
            title: [(this.data) ? this.data.title : '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            category: ['', [Validators.required]],
            description: ['', [Validators.required]],
            contact: this.fb.array([]),
            price: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
        });
        this.addContact();
        this.ngRedux
            .subscribe(() => {
                const imageList = this.ngRedux.getState()['imageing']['imageList'];
                this.uploadedUrl = (imageList.slice(-1).pop()) ? imageList.slice(-1).pop()['imageUrl'] : '';
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

    onSubmit({ value, valid }: { value: Post, valid: boolean }): void {
        if (valid) {
            if (this.uploadedUrl) {
                value.image = this.uploadedUrl;
            }
            if (!this.isUpdate) {
                this.createPost(value);
            } else {
                value._id = this.post._id;
                this.updateUser(value);
            }
        }
    }

    createPost(value: Post): void {
        this.addPostService
            .createPost(value)
            .subscribe((result: Post) => {
                this.addPostService.postLoaded = true;
                this.router.navigate(['timeline/lists']);
                this.ngReduxPost.dispatch(Object.assign({ type: ADD_POST }, result));
                this.addPostService.postCount++;
                this.alertService.success('Post has been successfully created');
            });
    }

    updateUser(value: Post): void {
        Object.assign(this.data, value);
        this.addPostService
            .updatePost(this.data)
            .subscribe((result: Post) => {
                this.router.navigate(['timeline/lists']);
                this.ngReduxPost.dispatch(Object.assign({ type: UPDATE_POST }, result));
                this.alertService.success('Post has been successfully updated');
            });
    }

    getPost(postId: string): void {
        this.addPostService
            .getPost(postId)
            .subscribe((result: Post) => {
                this.isUpdate = true;
                this.post = result;
                this.addPostForm.patchValue({
                    title: this.post.title,
                    category: this.post.category,
                    description: this.post.description,
                    image: this.post.image,
                    price: this.post.price,
                    contact: [{
                        email: this.post.contact[0].email,
                        //mobile : this.post.contact[0].mobile,
                        aboutu: this.post.contact[0].aboutu,
                    }]
                })
            });
    }

    getCategoryData(): void {
        this.observebaleSubjects = this.categoryService.getAllCategory();
    }
}
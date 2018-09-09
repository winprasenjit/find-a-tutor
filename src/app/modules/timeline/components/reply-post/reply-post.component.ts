import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material";
import {Post} from "../../models/post";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SharedService} from "../../../../shared/services/shared.service";
import {MobileNumberValidation} from "../../../../shared/validators/mobile-number.validator";
import {ReplyPost} from "../../models/ReplyPost";
import {ReplyPostService} from "../../services/reply-post.service";
import {NgRedux} from "ng2-redux";
import {IReplyPostState} from "../../helpers/reply-post.store";
import {ADD_REPLY} from "../../helpers/reply-post.constant";

@Component({
    selector: 'app-reply-post',
    templateUrl: './reply-post.component.html',
    styleUrls: ['./reply-post.component.css']
})
export class ReplyPostComponent implements OnInit {
    post: Post;
    replyForm: FormGroup;

    constructor(@Inject(MAT_DIALOG_DATA) private data: any,
                private ngRedux : NgRedux<IReplyPostState>,
                private fb: FormBuilder,
                private replyPostService: ReplyPostService,
                private sharedService: SharedService) {
        this.post = data;
    }

    ngOnInit(): void {
        this.replyForm = this.fb.group({
            post: this.post,
            user: this.sharedService.userInfo,
            contact: this.fb.array([]),
            revisedPrice: [this.post.price, [Validators.required, Validators.minLength(2)]],
            coverLetter: ['', [Validators.required, Validators.maxLength(500)]],
            createdBy: this.sharedService.userInfo.username,
            time: new Date().getTime()
        });
        this.addContact();
    }

    initContact() {
        return this.fb.group({
            email: [this.sharedService.userInfo.email, [Validators.required, Validators.email]],
            mobile: [this.sharedService.userInfo.mobile, [Validators.required, MobileNumberValidation]],
            aboutu: []
        });
    }

    addContact() {
        const control = <FormArray>this.replyForm.controls['contact'];
        const addCtrl = this.initContact();

        control.push(addCtrl);
    }

    submitBid({value, valid}: { value: ReplyPost, valid: boolean }): void {
        if (valid) {
            this.replyPostService
                .replyToPost(value)
                .subscribe((data: ReplyPost) => {
                    this.ngRedux.dispatch({type:ADD_REPLY, data});
                })
        }
    }
}


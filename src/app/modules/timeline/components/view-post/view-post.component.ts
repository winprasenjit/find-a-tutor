import {Component, OnInit} from '@angular/core';
import {NgRedux} from "@angular-redux/store";
import {DISPLAY_POST} from "../../helpers/post.constant";
import {Post} from "../../models/post";
import {ActivatedRoute} from "@angular/router";
import {IAppstate} from "../../../../shared/helper/store";
import {MatDialog} from "@angular/material";
import {PostService} from "../../services/post.service";
import {ReplyPostComponent} from "../reply-post/reply-post.component";
import {SharedService} from "../../../../shared/services/shared.service";
import {User} from "../../../user/models/user.model";

@Component({
    selector: 'view-post',
    templateUrl: './view-post.component.html',
    styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
    postLoaded = false;
    post: Post = <Post>{};
    userInfo: User;

    constructor(private ngRedux: NgRedux<IAppstate>,
                private sharedService: SharedService,
                private postService: PostService,
                private route: ActivatedRoute,
                public dialogRef: MatDialog) {
        this.userInfo = this.sharedService.userInfo;
        this.ngRedux
            .subscribe(() => {
                const postList: Post[] = this.ngRedux.getState().posting.postList;

                this.post = postList.filter((x: Post) => {
                        return x._id === this.route.snapshot.params.id
                    })[0] || <Post>{};

                if (!this.post._id) {
                    this.getSelectedPost();
                } else {
                    this.postLoaded = true;
                }
            });
    }

    ngOnInit(): void {
        this.ngRedux.dispatch({type: DISPLAY_POST});
    }

    submitProposal(): void {
        this.dialogRef.open(ReplyPostComponent, {
            width: '800px',
            height: '600px',
            data: this.post
        });
    }

    getSelectedPost(): void {
        this.postService
            .getPost(this.route.snapshot.params.id)
            .subscribe((data: Post) => {
                this.post = data;
                this.postLoaded = true;
            });
    }
}

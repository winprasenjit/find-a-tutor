import { Component, OnInit, OnDestroy } from '@angular/core';
import "rxjs/add/operator/takeWhile";

import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';

@Component({
    selector: 'app-list-post',
    templateUrl: './list-post.component.html',
    styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit, OnDestroy {
    private alive = true;
    posts: Post[] = [];

    constructor(private postService: PostService) { }

    ngOnInit() {
        this.postService
            .getAllPost()
            .takeWhile(() => this.alive)
            .subscribe((data: Post[]) => {
                this.posts = data;
            });
    }

    ngOnDestroy() {
        this.alive = false;
    }

}

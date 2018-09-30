import { Component, OnInit, OnDestroy, ViewChildren, ViewChild, QueryList, ElementRef } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post';
import { NgRedux, select } from '@angular-redux/store';
import { IPoststate } from '../../helpers/post.store';
import { ADD_POST } from '../../helpers/post.constant';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';

export function getAllPosts(state) {
    return state.posting.postList;
}

@Component({
    selector: 'app-list-post',
    templateUrl: './list-post.component.html',
    styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit, OnDestroy {
    private page = 0;
    private initPostCount = 3;
    private alive = true;

    @select(getAllPosts) posts: Post[];
    @ViewChildren('postList') postList: QueryList<ElementRef>;

    constructor(private postService: PostService,
        private route: ActivatedRoute,
        private ngRedux: NgRedux<IPoststate>) { }

    ngOnInit(): void {
        this.getPosts();
    }

    ngAfterViewInit(){
        this.postList.changes.subscribe(list => {
            this.postService.postCount = list.length;
        });
    }

    scrollReached(param): void {
        this.postService.postLoaded = false;
        this.ngAfterViewInit();
        this.getPosts();
    }

    getPosts() {
        if (!this.postService.postLoaded) {
            this.postService
                .getAllPost(this.postService.postCount, this.initPostCount)
                .pipe(takeWhile(() => this.alive))
                .subscribe((data: Post[]) => {
                    this.postService.postLoaded = true;
                    for (let i = 0; i < data.length; i++) {
                        const element = Object.assign({ type: ADD_POST }, data[i]);
                        this.ngRedux.dispatch(element);
                    }
                });
        }
    }

    ngOnDestroy(): void {
        this.alive = false;
    }
}

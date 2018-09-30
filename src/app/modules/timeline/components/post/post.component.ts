import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post';
import { ApiSettings } from '../../../../shared/constants/api.constant';
import { NgRedux } from '@angular-redux/store';
import { PostService } from '../../services/post.service';
import { IPoststate } from '../../helpers/post.store';
import { REMOVE_POST } from '../../helpers/post.constant';
import {Router} from "@angular/router";

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
    imageUrl : string;
    @Input('content') post: Post;

    constructor(private postService : PostService, 
                private ngReduxPost:NgRedux<IPoststate>,
                private router : Router) {
    }

    ngOnInit() : void{
        this.imageUrl = ApiSettings.API_ENDPOINT+this.post.image;
    }

    updatePost($event) : void{
        this.router.navigate(['/timeline/update', $event.selection._id])
    }

    deletePost($event){
        this.postService
            .deletePost($event.selection)
            .subscribe((data:Post)=> this.ngReduxPost.dispatch({type:REMOVE_POST,_id:data._id}))
    }
}

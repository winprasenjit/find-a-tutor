import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../models/post';

@Component({
    selector: 'post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

    @Input('content') post: Post;

    constructor() { 
    }

    ngOnInit() {
    }

}

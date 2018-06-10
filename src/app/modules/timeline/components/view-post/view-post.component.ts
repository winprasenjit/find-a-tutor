import {Component, OnInit} from '@angular/core';
import {NgRedux} from "ng2-redux";
import {DISPLAY_POST} from "../../helpers/post.constant";
import {Post} from "../../models/post";
import {ActivatedRoute} from "@angular/router";
import {IAppstate} from "../../../../shared/helper/store";

@Component({
    selector: 'view-post',
    templateUrl: './view-post.component.html',
    styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
    post: Post;

    constructor(private ngRedux: NgRedux<IAppstate>, private route: ActivatedRoute) {
        ngRedux
            .subscribe(() => {
                const postList: Post[] = ngRedux.getState().posting.postList;

                this.post = postList.filter((x: Post) => {
                    return x._id == route.snapshot.params.id
                })[0]; 
                
                console.dir(this.post);
            })
    }

    ngOnInit() {
        this.ngRedux.dispatch({type: DISPLAY_POST});
    }
}

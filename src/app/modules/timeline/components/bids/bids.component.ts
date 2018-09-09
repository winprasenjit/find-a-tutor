import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ReplyPost} from "../../models/ReplyPost";
import {ReplyPostService} from "../../services/reply-post.service";

@Component({
    selector: 'bids',
    templateUrl: './bids.component.html',
    styleUrls: ['./bids.component.css']
})
export class BidsComponent implements OnInit{
    private _postId : string;
    bids : ReplyPost[] = [];

    constructor(private replyPostService:ReplyPostService) {
    }

    @Input('post-id')
    set postId(value:string){
        this._postId = value;
        if(this._postId){
            this.getAllBids(value);
        }
    }

    ngOnInit() {
    }
    
    getAllBids(postId:string):void{
        this.replyPostService
            .getBids(postId)
            .subscribe((result:ReplyPost[])=>this.bids = result);
    }
}

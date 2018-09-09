import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {ReplyPost} from "../../models/ReplyPost";

@Component({
    selector: 'display-bids',
    templateUrl: './display-bids.component.html',
    styleUrls: ['./display-bids.component.css']
})
export class DisplayBidsComponent implements OnChanges {
    
    @Input() bid : ReplyPost;
    constructor() {
    }

    ngOnChanges() {
        console.log(this.bid);
    }

    fullName(bid:ReplyPost): string{
        return bid.user.firstname+' '+bid.user.lastname;
    }

}

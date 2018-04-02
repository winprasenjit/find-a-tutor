import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddpostComponent } from './addpost/addpost.component';
import { GlobalConstant } from '../../../shared/constants/global.constant';
import { SharedService } from '../../../shared/services/shared.service';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
    globalConst = GlobalConstant;

    constructor(public dialog: MatDialog, private sharedService : SharedService) { }

    ngOnInit() {
        console.log(this.sharedService.userInfo);
    }

    addPost(): void {
        const dialogRef = this.dialog.open(AddpostComponent, {
            width: this.globalConst.ADD_POST_MODAL.WIDTH,
            height: this.globalConst.ADD_POST_MODAL.HEIGHT
        });
        dialogRef.afterClosed().subscribe(result => {
            if (typeof result !== 'undefined') {
                console.log('Update timeline');
            }
        });
    }
}

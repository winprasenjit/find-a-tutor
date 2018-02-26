import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddpostComponent } from './addpost/addpost.component';
import { GlobalConstant } from '../../../shared/constants/global.constant';

@Component({
    selector: 'app-timeline',
    templateUrl: './timeline.component.html',
    styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
    globalConst = GlobalConstant;

    constructor(public dialog: MatDialog) { }

    ngOnInit() {
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

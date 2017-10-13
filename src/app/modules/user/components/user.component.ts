import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { MatDialog } from '@angular/material';

import { User } from '../models/user.model';
import { UserService } from '../services/user.service';
import { Column } from '../../../shared/models/column.model';
import { UserFormComponent } from './user-form/user-form.component';
import { GridComponent } from '../../../shared/components/grid/components/grid.component';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
    columnLoaded = false;
    users: User[];
    column: Column[];
    selectedItems: User;
    rowIndex: number;

    @ViewChild(GridComponent) gridComponent: GridComponent;

    constructor(private userService: UserService, public dialog: MatDialog) { }

    ngOnInit(): void {
        this.getUserColumn();
        this.getUserData();
    }

    getUserColumn(): void {
        this.userService
            .getColumns()
            .subscribe((data: Column[]) => {
                data[0]['callBack'] = function (row: User): string {
                    if (row) {
                        return row.firstname + ' ' + row.lastname;
                    }
                }
                data[5]['callBack'] = function (row: User): number {
                    if (row && row.rating) {
                        return Math.round(Number(row.rating['communication'] + row.rating['attitude'] + row.rating['sense']) / 3);
                    }
                }
                this.column = data;
                this.columnLoaded = true;
            });
    }

    getUserData(): void {
        this.userService
            .getAllUser()
            .subscribe((result: User[]) => {
                this.users = result;
            });
    }

    createFullName(firstname: string, lastname: string): string {
        return firstname + ' ' + lastname;
    }

    createRating(ratingObj: any): number {
        return Number(ratingObj.communication + ratingObj.attitude + ratingObj.sense) / 3;
    }

    createUser(): void {
        const dialogRef = this.dialog.open(UserFormComponent, {
            width: '400px',
            height: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
            if (typeof result !== 'undefined') {
                this.users.push(result);
                this.gridComponent.addRow(result);
            }
        });
    }

    updateUser(): void {
        const dialogRef = this.dialog.open(UserFormComponent, {
            width: '400px',
            height: '600px',
            data: this.selectedItems
        });
        dialogRef.afterClosed().subscribe(result => {
            if (typeof result !== 'undefined') {
                this.gridComponent.updateRow(result, this.rowIndex);
            }
        });
    }

    deleteUser(): void {
        this.userService
            .deleteUser(this.selectedItems.username)
            .subscribe((result: any) => {
                if (result.success) {
                    this.gridComponent.removeRow(this.rowIndex)
                }
            });
    }

    trackEvent(event: any): void {
        if (event.selection && event.selection.selected) {
            this.selectedItems = event.selection.items;
            this.rowIndex = event.selection.selectedIndex;
        }
    }
}

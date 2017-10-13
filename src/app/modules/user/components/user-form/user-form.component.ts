import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    isUpdate = false;
    user: User;
    submitted = false;

    constructor( @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<UserFormComponent>,
        private userService: UserService) { }

    ngOnInit(): void {
        if (!this.data) {
            this.user = new User(<User>{})
            return;
        }
        this.isUpdate = true;
        this.user = new User(this.data);
    }

    onSubmit(form): void {
        this.user.createFullName();
        if (!this.isUpdate) {
            this.saveUser();
        } else {
            this.updateUser();
        }

    }

    saveUser(): void {
        this.userService
            .createUser(this.user)
            .subscribe((result: User) => {
                this.dialogRef.close(result);
            });
    }

    updateUser(): void {
        this.userService
            .updateUser(this.user)
            .subscribe((result: User) => {
                this.dialogRef.close(result);
            });
    }

    getSliderVal(event, type): void {
        this.user.rating[type] = event.value;
    }
}

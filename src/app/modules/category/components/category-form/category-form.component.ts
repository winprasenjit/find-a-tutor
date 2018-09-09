import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';

@Component({
    selector: 'category-form',
    templateUrl: './category-form.component.html',
    styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {

    isUpdate = false;
    categoryForm: FormGroup;
    submitted = false;
    
    constructor( @Inject(MAT_DIALOG_DATA) private data: any,
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CategoryFormComponent>,
        private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.isUpdate = (!this.data) ? false : true;
        this.categoryForm = this.fb.group({
            name: [(this.data) ? this.data.name : '',
                [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
        });
    }

    onSubmit({ value, valid }: { value: Category, valid: boolean }): void {
        if (valid) {
            if (!this.isUpdate) {
                this.saveUser(value);
            } else {
                this.updateUser(value);
            }
        }
    }

    saveUser(value: Category): void {
        this.categoryService
            .createCategory(value)
            .subscribe((result: Category) => {
                this.dialogRef.close(result);
            });
    }

    updateUser(value: Category): void {
        Object.assign(this.data, value);
        this.categoryService
            .updateCategory(this.data)
            .subscribe((result: Category) => {
                this.dialogRef.close(result);
            });
    }
}

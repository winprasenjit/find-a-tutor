import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Category } from '../models/category';
import { ApiSettings } from '../../../shared/constants/api.constant';
import { SharedService } from '../../../shared/services/shared.service';
import { Column } from '../../../shared/models/column.model';

@Injectable()
export class CategoryService {
    private categoryAPI = ApiSettings.CATEGORY_API;

    constructor(private sharedService: SharedService) { }

    getColumns(): Observable<Column[]> {
        return this.sharedService
            .get(ApiSettings.CATEGORY_COLUMN_JSON)
            .map((result: any) => result as Column[]);
    }

    getAllCategory(): Observable<Category[]> {
        return this.sharedService
            .get(this.categoryAPI)
            .map((result: any) => result as Category[]);
    }

    createCategory(formData: Category): Observable<Category> {
        return this.sharedService
            .post(this.categoryAPI, formData)
            .map((result: any) => result as Category);
    }

    updateCategory(formData: Category): Observable<Category> {
        return this.sharedService
            .put(this.categoryAPI, formData)
            .map((result: any) => result as Category);
    }

    deleteCategory(name): Observable<String> {
        return this.sharedService
            .delete(this.categoryAPI, { name: name })
            .map((result: any) => result as string);
    }
}

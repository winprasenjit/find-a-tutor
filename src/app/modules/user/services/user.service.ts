import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {SharedService} from '../../../shared/services/shared.service';
import {User} from '../models/user.model';
import {ApiSettings} from '../../../shared/constants/api.constant';
import {Column} from '../../../shared/models/column.model';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
    private userAPI = ApiSettings.USER_API;
    selectedUser: User;

    constructor(private sharedService: SharedService) {
    }

    getColumns(): Observable<Column[]> {
        return this.sharedService
            .get(ApiSettings.USER_COLUMN_JSON)
            .pipe(map((result: any) => result as Column[]));
    }

    getAllUser(): Observable<User[]> {
        return this.sharedService
            .get(this.userAPI)
            .pipe(map((result: any) => result as User[]));
    }

    getUser(id): Observable<User> {
        return this.sharedService
            .get(this.userAPI + '/' + id)
            .pipe(map((result: any) => result as User));
    }

    createUser(formData: User): Observable<User> {
        return this.sharedService
            .post(this.userAPI, formData)
            .pipe(map((result: any) => result as User));
    }

    updateUser(formData: User): Observable<User> {
        return this.sharedService
            .put(this.userAPI, formData)
            .pipe(map((result: any) => result as User));
    }

    deleteUser(username): Observable<String> {
        return this.sharedService
            .delete(this.userAPI, {username: username})
            .pipe(map((result: any) => result as string));
    }
}

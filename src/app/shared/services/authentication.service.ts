import { ApiSettings } from './../constants/api.constant';

import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { User } from '../../modules/user/models/user.model';

@Injectable()
export class AuthenticationService {
    private _user: User;
    constructor(private http: Http) { }

    isLoggedIn(): boolean {
        return (localStorage.getItem('currentUser')) ? true : false;
    }

    login(username: string, password: string): any {
        return this.http
            .post(ApiSettings.AUTHENTICATE_API, {
                username: username,
                password: password
            })
            .map((response: Response) => {
                const user = response.json();
                if (user) {
                    this._user = user;
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    logout(): void {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    get User(): User {
        return this._user;
    }
}

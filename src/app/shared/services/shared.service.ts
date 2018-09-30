import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/catch';
import {User} from '../../modules/user/models/user.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class SharedService {
    private _userInfo: User;
    private headers: Headers;
    private options: RequestOptions;

    constructor(private http: Http) {
        this.headers = new Headers({'Content-Type': 'application/json'});
        this.options = new RequestOptions({headers: this.headers});
    }

    get userInfo(): User {
        if (!this._userInfo) {
            this._userInfo = JSON.parse(localStorage.getItem('currentUser'));
        }
        return this._userInfo;
    }

    set userInfo(v: User) {
        this._userInfo = v;
    }

    get(url: string, formData?: any): Observable<Response> {
        if (formData === undefined) {
            formData = {};
        }
        formData.timeStamp = new Date().getTime();
        const params: URLSearchParams = new URLSearchParams();
        for (const x in formData) {
            if (formData.hasOwnProperty(x)) {
                params.set(x, formData[x]);
            }
        }
        this.options = new RequestOptions({headers: this.headers, search: params});

        return this.http
            .get(url, this.options)
            .pipe(map(response => response.json()));
    }

    post(url: string, formData?: any): Observable<Response> {
        if (formData === undefined) {
            formData = {};
        }
        formData.timeStamp = new Date().getTime();

        return this.http
            .post(url, JSON.stringify(formData), this.options)
            .pipe(map(response => response.json()));
    }

    put(url: string, formData?: any): Observable<Response> {
        if (formData === undefined) {
            formData = {};
        }
        formData.timeStamp = new Date().getTime();

        return this.http
            .put(url, JSON.stringify(formData), this.options)
            .pipe(map(response => response.json()));
    }

    delete(url: string, formData?: any): Observable<Response> {
        if (formData === undefined) {
            formData = {};
        }
        formData.timeStamp = new Date().getTime();

        return this.http
            .delete(url, new RequestOptions({
                headers: this.headers,
                body: JSON.stringify(formData)
            }))
            .pipe(map(response => response.json()));
    }
}

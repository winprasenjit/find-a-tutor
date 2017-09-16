import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PostService {

    constructor(private http: Http) {}

    getPosts(): Observable<Response> {
       return this.http
            .get('http://localhost:4000/users')
            .map(response=>response.json());
    }
}

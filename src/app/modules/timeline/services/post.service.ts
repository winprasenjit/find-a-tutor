import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {SharedService} from '../../../shared/services/shared.service';
import {Post} from '../models/post';
import {ApiSettings} from '../../../shared/constants/api.constant';
import { map } from 'rxjs/operators';

@Injectable()
export class PostService {
    private addPostAPI = ApiSettings.ADD_POST_API;
    postCount: number;
    postLoaded = false;

    constructor(private sharedService: SharedService) {
    }

    getAllPost(skip: number, postCount: number): Observable<Post[]> {
        return this.sharedService
            .get(this.addPostAPI, {
                skip: skip,
                count: postCount,
                user: this.sharedService.userInfo.username
            })
            .pipe(map((result: any) => result as Post[]));
    }

    getPost(id: string): Observable<Post> {
        return this.sharedService
            .get(this.addPostAPI + '/' + id)
            .pipe(map((result: any) => result as Post));
    }

    createPost(formData: Post): Observable<Post> {
        return this.sharedService
            .post(this.addPostAPI, formData)
            .pipe(map((result: any) => result as Post));
    }

    updatePost(formData: Post): Observable<Post> {
        return this.sharedService
            .put(this.addPostAPI, formData)
            .pipe(map((result: any) => result as Post));
    }

    deletePost(post: Post): Observable<Post> {
        return this.sharedService
            .delete(this.addPostAPI, {id: post._id})
            .pipe(map((result: any) => result as Post));
    }

}

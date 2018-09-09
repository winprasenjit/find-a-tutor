import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {SharedService} from '../../../shared/services/shared.service';
import {Post} from '../models/post';
import {ApiSettings} from '../../../shared/constants/api.constant';

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
            .map((result: any) => result as Post[]);
    }

    getPost(id: string): Observable<Post> {
        return this.sharedService
            .get(this.addPostAPI + '/' + id)
            .map((result: any) => result as Post);
    }

    createPost(formData: Post): Observable<Post> {
        return this.sharedService
            .post(this.addPostAPI, formData)
            .map((result: any) => result as Post);
    }

    updatePost(formData: Post): Observable<Post> {
        return this.sharedService
            .put(this.addPostAPI, formData)
            .map((result: any) => result as Post);
    }

    deletePost(post: Post): Observable<Post> {
        return this.sharedService
            .delete(this.addPostAPI, {id: post._id})
            .map((result: any) => result as Post);
    }

}

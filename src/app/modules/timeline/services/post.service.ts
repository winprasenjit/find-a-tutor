import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SharedService } from '../../../shared/services/shared.service';
import { Post } from '../models/post';
import { ApiSettings } from '../../../shared/constants/api.constant';

@Injectable()
export class PostService {
    private addPostAPI = ApiSettings.ADD_POST_API;
    constructor(private sharedService: SharedService) { }

    getAllPost(): Observable<Post[]> {
        return this.sharedService
            .get(this.addPostAPI)
            .map((result: any) => result as Post[]);
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

    deletePost(name): Observable<String> {
        return this.sharedService
            .delete(this.addPostAPI, { name: name })
            .map((result: any) => result as string);
    }

}

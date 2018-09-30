/**
 * Created by prasenjit on 7/1/2018.
 */
import { Injectable } from '@angular/core';
import {ApiSettings} from "../../../shared/constants/api.constant";
import {SharedService} from "../../../shared/services/shared.service";
import {ReplyPost} from "../models/ReplyPost";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';

@Injectable()
export class ReplyPostService{
    private replyPostAPI = ApiSettings.REPLY_POST_API;

    constructor(private sharedService:SharedService){}

    replyToPost(formData:ReplyPost) : Observable<ReplyPost>{
        return this.sharedService
            .post(this.replyPostAPI,formData)
            .pipe(map((result:any)=>result as ReplyPost))
    }

    getBids(postId:string) : Observable<ReplyPost[]>{
        return this.sharedService
            .get(this.replyPostAPI,{postid:postId})
            .pipe(map((result:any)=>result as ReplyPost[]));
    }
}

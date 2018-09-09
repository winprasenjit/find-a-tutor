import {IContact} from "../../../shared/interfaces/iContact";
import {Post} from "./post";
import {User} from "../../user/models/user.model";
export interface IReplyPost{
    _id:string,
    post: Post,
    user: User,
    revisedPrice : number,
    coverLetter: string,
    contact: IContact[],
    createdBy:string,
    time : string
}
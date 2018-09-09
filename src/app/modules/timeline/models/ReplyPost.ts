import {IReplyPost} from "./iReplyPost";
import {IContact} from "../../../shared/interfaces/iContact";
/**
 * Created by prasenjit on 7/1/2018.
 */

export class ReplyPost implements IReplyPost{
    constructor(
        public _id,
        public post,
        public user,
        public revisedPrice,
        public coverLetter,
        public contact : Array<IContact>,
        public createdBy,
        public time
    ){}
}

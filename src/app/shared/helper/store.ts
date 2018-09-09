import { tassign } from 'tassign';
import { combineReducers } from "redux";
import { GlobalConstant } from '../constants/global.constant';
import { ITaskstate, TASK_INITIAL_STATE, taskingReducer } from '../../modules/task/helpers/task-store';
import { IImagestate, IMAGE_INITIAL_STATE, imagingReducer } from '../components/image-uploader/helpers/image-store';
import { IPoststate, POST_INITIAL_STATE, postReducer } from '../../modules/timeline/helpers/post.store';
import {IReplyPostState, REPLY_POST_INITIAL, replyPostReducer} from "../../modules/timeline/helpers/reply-post.store";

export interface IAppstate {
    tasking: ITaskstate,
    imageing: IImagestate,
    posting : IPoststate,
    replies : IReplyPostState
}

export const INITIAL_STATE: IAppstate = {
    tasking: TASK_INITIAL_STATE,
    imageing: IMAGE_INITIAL_STATE,
    posting : POST_INITIAL_STATE,
    replies: REPLY_POST_INITIAL
};

export const rootReducer = combineReducers<IAppstate>({
    tasking: taskingReducer,
    imageing: imagingReducer,
    posting : postReducer,
    replies: replyPostReducer
});
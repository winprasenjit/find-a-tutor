import { tassign } from 'tassign';
import { combineReducers } from "redux";
import { GlobalConstant } from '../constants/global.constant';
import { ITaskstate, TASK_INITIAL_STATE, taskingReducer } from '../../modules/task/helpers/task-store';
import { IImagestate, IMAGE_INITIAL_STATE, imagingReducer } from '../components/image-uploader/helpers/image-store';

export interface IAppstate {
    tasking: ITaskstate;
    imageing: IImagestate;
}

export const INITIAL_STATE: IAppstate = {
    tasking: TASK_INITIAL_STATE,
    imageing: IMAGE_INITIAL_STATE
};

export const rootReducer = combineReducers<IAppstate>({
    tasking: taskingReducer,
    imageing: imagingReducer
});
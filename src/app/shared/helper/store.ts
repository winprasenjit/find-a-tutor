import { GlobalConstant } from '../constants/global.constant';

export interface IAppstate {
    taskList: any[];
}

export const INITIAL_STATE: IAppstate = {
    taskList: [],
};

export function rootReducer(state: IAppstate, action) {
    switch (action.type) {
        case GlobalConstant.ADD_TASK:
            let task = {
                id: state.taskList.length + 1,
                taskname: action.taskname
            };
            return Object.assign({}, state, {
                taskList: state.taskList.concat(task)
            });

        case GlobalConstant.REMOVE_TASK:
            return Object.assign({}, state, {
                taskList: state.taskList.filter(t => t.taskname !== action.taskname)
            });
    }

    return state;
}
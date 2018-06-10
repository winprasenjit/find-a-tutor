import { tassign } from 'tassign';
import {ADD_POST, DISPLAY_POST, REMOVE_POST, UPDATE_POST} from './post.constant';

export interface IPoststate {
    postList: any[];
}

export const POST_INITIAL_STATE: IPoststate = {
    postList: [],
};

export function postReducer(state: IPoststate = POST_INITIAL_STATE, action): IPoststate {
    switch (action.type) {
        case ADD_POST:
            let post = tassign({}, action);
            delete post['type']; //Remove this line

            return tassign(state, {
                postList: state.postList.concat(post)
            });

        case UPDATE_POST:
            const postList = state.postList.map(post => {
                return (post._id === action._id) ? action : post
            })
            return tassign(state, {
                postList: postList
            });

        case REMOVE_POST:
            return tassign(state, {
                postList: state.postList.filter(t => t._id !== action._id)
            });
            
        case DISPLAY_POST :
            return tassign(state, {
                postList: state.postList
            });
    }

    return state;
}
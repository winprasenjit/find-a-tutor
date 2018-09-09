import {ADD_REPLY, DISPLAY_COMMENTS} from "./reply-post.constant";
import {tassign} from "tassign";

export interface IReplyPostState {
    replyList: any[]
}

export const REPLY_POST_INITIAL: IReplyPostState = {
    replyList: []
}

export function replyPostReducer(state: IReplyPostState = REPLY_POST_INITIAL, action: any) {
    switch (action.type) {
        case ADD_REPLY:
            let reply = tassign({}, action);

            return tassign(state, {
                replyList: state.replyList.concat(reply)
            });

        case DISPLAY_COMMENTS :
            return tassign(state, {
                replyList: state.replyList
            });
    }

    return state;
}
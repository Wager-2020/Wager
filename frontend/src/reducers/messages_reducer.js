import { RECEIVE_MESSAGES, RECEIVE_MESSAGE } from '../actions/messages_actions'
import { merge } from "lodash";

const messagesReducer = (state ={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_MESSAGES:
            let messageObjects = {};
            // let messageObjects = Object.assign({}, state);
            action.messages.forEach(message => {
                messageObjects[message.id] = message;
            });
            return Object.assign({}, state, messageObjects);
        case RECEIVE_MESSAGE:
            return merge({}, state, { [action.message.id]: action.message });
        default:
            return state;
    }
};

export default messagesReducer;
import { RECEIVE_MESSAGES, RECEIVE_MESSAGE } from '../actions/messages_actions'


const messagesReducer = (state ={}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_MESSAGES:
            let messageObjects = {};
            action.messages.forEach(message => {
                messageObjects[message._id] = message;
            });
            return messageObjects;
        case RECEIVE_MESSAGE:
            return { [action.message._id]: action.message };
        default:
            return state;
    }
};

export default messagesReducer;
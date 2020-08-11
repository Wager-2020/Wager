import * as messagesAPIUtil from '../util/message_api_util';

export const RECEIVE_MESSAGE = 'RECEIEVE_MESSAGE';
export const RECEIVE_MESSAGES = 'RECEIVE_MESSAGES';

export const receiveMessage = message => ({
    type: RECEIVE_MESSAGE,
    message
});

export const receiveMessages = messages => ({
    type: RECEIVE_MESSAGES,
    messages
});

export const fetchMessages = () => dispatch => {
    return messagesAPIUtil.fetchMessages()
        .then(messages => dispatch(receiveMessages(messages)))
        .catch(err => console.log(err))
};

export const createMessage = (message) => {
    return messagesAPIUtil.createMessage(message)
        .then(message => dispatch(receiveMessage(message)))
        .catch(err => console.log(err))
};
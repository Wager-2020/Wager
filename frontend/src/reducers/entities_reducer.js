import { combineReducers } from 'redux';
import wagers from './wagers_reducer';
import users from './users_reducer';
import messages from './messages_reducer';

const entitiesReducer = combineReducers({
    wagers,
    users,
    messages,
});

export default entitiesReducer;
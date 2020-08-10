import {
    RECEIVE_WAGERS, 
    RECEIVE_WAGER
} from '../actions/wager_actions'


const wagersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_WAGERS:
            return action.wagers;
        case RECEIVE_WAGER:
            // const wager = { [action.wager.id]: action.wager }
            // return Object.assign({}, state, wager)
            return { [action.wager.id]: action.wager };
        default:
            return state;
    }
};

export default wagersRedcuer;
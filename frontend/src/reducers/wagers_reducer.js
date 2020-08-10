import {
    RECEIVE_WAGERS, 
    RECEIVE_WAGER
} from '../actions/wager_actions'


const wagersReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_WAGERS:
            newState = action.wagers;
            return newState;
        case RECEIVE_WAGER:
            newState[action.wager.id] = action.wager;
            return newState;
        default:
            return state;
    }
};

export default wagersRedcuer;
import {
    RECEIVE_WAGERS, 
    RECEIVE_WAGER
} from '../actions/wager_actions'


const wagersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_WAGERS:
            let objectifiedWagers = {};
            action.wagers.forEach(wager => {
                objectifiedWagers[wager._id] = wager;
            });
            return objectifiedWagers;
        case RECEIVE_WAGER:
            return { [action.wager._id]: action.wager };
        default:
            return state;
    }
};

export default wagersReducer;
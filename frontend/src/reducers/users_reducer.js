import { RECEIVE_USER } from "../actions/user_actions";

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    let user;
    switch (action.type) {
        case RECEIVE_USER:
            user = action.user.data;
            return Object.assign({}, state, { 
                [user._id]: user, 
                [user.handle]: user._id });
        default:
            return state;
    }
};

export default usersReducer;
import { RECEIVE_USER, RECEIVE_USERS } from "../actions/user_actions";
import { merge } from "lodash"; 

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
      case RECEIVE_USER:
        return merge({}, { [action.user.data._id]: action.user.data });
      case RECEIVE_USERS:
        let userObject = {};
        action.users.data.forEach(user => {
           userObject[user._id] = user;  
        })
        return userObject;        
      default:
        return state;
    }
};

export default usersReducer;
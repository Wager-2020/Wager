import { RECEIVE_USER, RECEIVE_USERS } from "../actions/user_actions";
import { merge } from "lodash"; 

const usersReducer = (state = {}, action) => {
    Object.freeze(state);
    let user;
    switch (action.type) {
      case RECEIVE_USER:
        return merge({}, { [action.user.data._id]: action.user.data });
        // user = action.user.data; 
        // return merge({}, state, { 
        //     [user._id]: user,
        //   });
          // [user.handle]: user._id,
      case RECEIVE_USERS:
        let userObject = {};
        action.users.data.forEach(user => {
           userObject[user._id] = user;  
        })
        // return Object.assign({}, state, userObject);
        return userObject;
      default:
        return state;
    }
};

export default usersReducer;
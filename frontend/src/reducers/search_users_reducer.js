import { RECEIVE_SEARCH_USERS, CLEAR_SEARCH_USERS} from "../actions/user_actions";

const searchUsersReducer = (state = {}, action) => {
  Object.freeze(state);
  switch(action.type) {
    case RECEIVE_SEARCH_USERS:
      let userObject = {};
      action.users.data.forEach(user => {
         userObject[user._id] = user;  
      })
      return userObject;
    case CLEAR_SEARCH_USERS:
      return {};
    default: 
      return state;
  }
}

export default searchUsersReducer;
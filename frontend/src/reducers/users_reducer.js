// import { RECEIVE_USER } from "../actions/user_actions";

// const usersReducer = (state = {}, action) => {
//     Object.freeze(state);
//     let user;
//     switch (action.type) {
//         case RECEIVE_USER:
//             user = action.user;
//             return Object.assign({}, state, user);
//         case RECEIVE_TICKET:
//             user = Object.assign({}, state[action.ticket.user_id]);
//             user.purchased_event_ids.push(action.ticket.event_id);
//             return Object.assign({}, state, user);
//         default:
//             return state;
//     }
// };

// export default usersReducer;
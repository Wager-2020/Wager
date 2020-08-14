import * as APIUserUTIL from '../util/user_api_util';
import { fetchWagers, receiveWager } from './wager_actions';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = 'RECEIVE_USERS';
export const CLEAR_SEARCH_USERS = 'CLEAR_SEARCH_USERS';
export const RECEIVE_SEARCH_USERS = "RECEIVE_SEARCH_USERS";


export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const receiveUsers = users => ({
    type: RECEIVE_USERS,
    users
});

export const clearSearchUsers = () => ({
    type: CLEAR_SEARCH_USERS
});

export const receiveSearchUsers = users => ({
    type: RECEIVE_SEARCH_USERS,
    users
});

export const fetchUser = (userId) => dispatch => {
    return APIUserUTIL.fetchUser(userId)
        .then(user => dispatch(receiveUser(user)))
        .catch(err => console.log(err))
};

export const fetchUsers = (filter) => (dispatch) => {
  return APIUserUTIL.fetchUsers(filter)
    .then((users) => {
        dispatch(receiveUsers(users))
    })
    .catch((err) => console.log(err));
};

export const fetchSearchUsers = (searchParams) => dispatch => {
    return APIUserUTIL.fetchUsers({ searchParams })
    .then((users) => {
        dispatch(receiveSearchUsers(users))
    })
    .catch((err) => console.log(err));
}

export const getUserWagers = (userId) => (dispatch) => {
    return APIUserUTIL.getUserWagers(userId)
      .then((wagers) => dispatch(fetchWagers(wagers)))
      .catch((err) => console.log(err));
};

export const placeWager = (wager) => (dispatch) => {
    return APIUserUTIL.placeWager(wager)
      .then((wager) => dispatch(receiveWager(wager.data)))
      .catch((err) => console.log(err));
};
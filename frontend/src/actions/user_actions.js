import * as APIUserUTIL from '../util/user_api_util';
import { fetchWagers, receiveWager } from './wager_actions';

export const RECEIVE_USER = "RECEIVE_USER";


export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const fetchUser = (userId) => dispatch => {
    return APIUserUTIL.fetchUser(userId)
        .then(user => dispatch(receiveUser(user)))
        .catch(err => console.log(err))
};

export const getUserWagers = (userId) => (dispatch) => {
    return APIUserUTIL.getUserWagers(userId)
      .then((wagers) => dispatch(fetchWagers(wagers)))
      .catch((err) => console.log(err));
};

export const placeWager = (wager) => (dispatch) => {
    return APIUserUTIL.placeWager(wager)
      .then((wager) => dispatch(receiveWager(wager)))
      .catch((err) => console.log(err));
};
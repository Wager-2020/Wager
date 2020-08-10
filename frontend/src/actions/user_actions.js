import * as APIUserUTIL from '../util/user_api_util';
import { receiveWagers, receciveWager } from './wager_actions';

export const RECEIVE_USER = "RECEIVE_USER";

export const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const fetchUser = () => dispatch => {
    return APIUserUTIL.fetchUser()
        .then(user => dispatch(receiveUser(user)))
        .catch(err => console.log(err))
};

export const getUserWagers = (userId) => (dispatch) => {
    return APIUserUTIL.getUserWagers(userId)
      .then((wagers) => dispatch(receiveWagers(wagers)))
      .catch((err) => console.log(err));
};

export const placeWager = (wager) => (dispatch) => {
    return APIUserUTIL.placeWagers(wager)
      .then((wager) => dispatch(receiveWager(wager)))
      .catch((err) => console.log(err));
};
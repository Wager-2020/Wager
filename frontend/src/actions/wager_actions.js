import * as wagerUTIL from '../util/wagers_api_util';

export const RECEIVE_WAGERS = 'RECEIVE_WAGERS';
export const RECEIVE_WAGER = 'RECEIVE_WAGER';

export const receiveWagers = wagers => ({
    type: RECEIVE_WAGERS,
    wagers
});

export const receiveWager = wager => ({
    type: RECEIVE_WAGER,
    wager
});


export const fetchWagers = () => dispatch => {
    return wagerUTIL.getWagers()
        .then(wagers => {
            return dispatch(receiveWagers(wagers.data))
        })
        .catch(err => console.log(err))
};

export const fetchWager = (wagerId) => dispatch => {
    return wagerUTIL.getWager(wagerId)
        .then(wager => dispatch(receiveWager(wager.data)))
        .catch(err => console.log(err))
};

export const createWager = wager => dispatch => {
    return wagerUTIL.createWager(wager)
        .then(wager => dispatch(receiveWager(wager.data)))
}
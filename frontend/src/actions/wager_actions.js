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
        .then(wagers => dispatch(receiveWagers(wagers)))
        .catch(err => console.log(err))
};

export const fetchWager = () => dispatch => {
    return wagerUTIL.getWager()
        .then(wager => dispatch(receiveWager(wager)))
        .catch(err => console.log(err))
};
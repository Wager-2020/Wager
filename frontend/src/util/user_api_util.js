import axios from 'axios';

export const fetchUser = userId => {
    return axios.get(`/api/users/${userId}`);
};

export const fetchUsers = (filter) => {
  return axios.get(`api/users`, { params: filter } );
}

export const getUserWagers = (userId) => {
    return axios.get(`/api/users/${userId}/wagers`);
};

export const placeWager = (wager) => {
  const betData = {
    user_id: wager.userId,
    option: wager.option,
    amount_bet: wager.amount_bet,
  }
  return axios.post(`/api/bets/wagers/${wager.wagerId}`, betData);
};
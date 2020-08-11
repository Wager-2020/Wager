import axios from 'axios';

export const fetchUser = userId => {
    return axios.get(`/api/users/${userId}`)
};

export const getUserWagers = (userId) => {
    return axios.get(`/api/users/${userId}/wagers`);
};

export const placeWager = (wager) => {
  debugger;
  const betData = {
    user_id:wager.userId,
    option: wager.option,
  }
  return axios.post(`/api/bets/wagers/${wager.wagerId}`, betData);
};

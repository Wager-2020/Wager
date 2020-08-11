import axios from 'axios';

export const fetchUser = userId => {
    return axios.get(`/api/users/${userId}`)
};

export const getUserWagers = (userId) => {
    return axios.get(`/api/users/${userId}/wagers`);
};

export const placeWager = (wager) => {
  // console.log(`/api/bets/wagers/${wager.id}`);
  // debugger;
  
  return axios.post(`/api/bets/wagers/${wager.id}`, wager);
};

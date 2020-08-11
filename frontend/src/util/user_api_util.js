import axios from 'axios';

export const fetchUser = userId => {
    return axios.get(`/api/users/${userId}`)
};

export const getUserWagers = (userId) => {
    return axios.get(`/api/users/${userId}/wagers`);
};

export const placeWager = (wager) => {
  return axios.post(`/api/wagers/${wager.id}`, {wager});
};

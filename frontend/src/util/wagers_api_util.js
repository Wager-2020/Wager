import axios from "axios";

export const getWagers = () => {
    return axios.get("/api/wagers");
};

export const getWagersUserBetOn = (userId) => {
  return axios.get(`/api/wagers/users/${userId}`);
}

export const getWager = (wagerId) => {
  return axios.get(`/api/wagers/${wagerId}`);
};

export const createWager = (wager) => {
  
  return axios.post(`/api/wagers/`, wager);
};



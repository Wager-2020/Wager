import axios from "axios";

export const getWagers = () => {
    return axios.get("/api/wagers");
};

export const getWager = (wagerId) => {
  return axios.get(`/api/wagers/${wagerId}`);
};

export const createWager = (wager) => {
  
  return axios.post(`/api/wagers/`, wager);
};



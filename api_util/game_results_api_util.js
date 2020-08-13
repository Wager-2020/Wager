const API_KEY = require("../config/keys").resultsApiKey;

const MLB_GAMES_BY_DATE = (date) => {
  const yyyy = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
  const mm = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
  const dd = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
  const dateStr = [yyyy, mm, dd].join("-");

  const url = `https://api.sportsdata.io/v3/mlb/scores/json/GamesByDate/${dateStr}`;
  console.log(url);
  return url;
};


const axios = require('axios');

const getMlbResults = (date) => {
  return axios.get(MLB_GAMES_BY_DATE(date), {
      headers: {
        "Ocp-Apim-Subscription-Key": API_KEY,
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log("Something went wrong with getMlbResults' axios request");
      console.log(err);
    });
}

module.exports = {
  getMlbResults
}
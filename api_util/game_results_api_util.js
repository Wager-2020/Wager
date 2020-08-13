const API_KEY = require("../config/keys").resultsApiKey;

const MLB_GAMES_BY_DATE = (date) => {
  const yyyy = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
  const mm = new Intl.DateTimeFormat('en', { month: 'short' }).format(date)
  const dd = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
  // debugger;
  const dateStr = [yyyy, mm, String(parseInt(dd) - 10)].join("-");

  const SCORES = "scores";
  const ODDS = "odds";

  const GAMES_BY_DATE = "GamesByDate";
  const BETTING_EVENTS_BY_DATE = "BettingEventsByDate";

  const url = `https://api.sportsdata.io/v3/mlb/${SCORES}/json/${GAMES_BY_DATE}/${dateStr}`;
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
      let results = [];
      console.log(response.data);
      response.data.forEach(game => {
        results.push({
          awayTeam: game.AwayTeam,
          homeTeam: game.HomeTeam,
          awayTeamRuns: game.AwayTeamRuns,
          homeTeamRuns: game.HomeTeamRuns
        })
      })
      return results;
    })
    .catch(err => {
      console.log("Something went wrong with getMlbResults' axios request");
      console.log(err);
    });
}

module.exports = {
  getMlbResults
}
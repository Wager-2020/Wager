// https://the-odds-api.com/liveapi/guides/v3/samples.html

const API_KEY = require("../config/keys").oddsApiKey;
const SPORT_KEY = 'baseball_mlb';


const axios = require('axios');
// Get a list of in season sports
const getSeasonSports = (season) => axios.get('https://api.the-odds-api.com/v3/sports', {
    params: {
        api_key: API_KEY
    }
}).then(response => {

    console.log(
        `Successfully got ${response.data.data.length} sports.`,
        `Here's the first sport:`
    )

    console.log(response.data.data)
})
.catch(error => {
    console.log('Error status', error.response.status)
    console.log(error.response.data)
})

// To get odds for a sepcific sport, use the sport key from the last request
//   or set sport to "upcoming" to see live and upcoming across all sports

const MAX_NUM_ODDS = 3;
const getSportOdds = (sportKey = SPORT_KEY) => axios.get('https://api.the-odds-api.com/v3/odds', {
    params: {
        api_key: API_KEY,
        sport: sportKey,
        region: 'uk', // uk | us | eu | au
        mkt: 'h2h' // h2h | spreads | totals
    }
}).then(response => {
		debugger;
		let eventOdds = [];

		response.data.data.forEach(event => {

			let sums = [];
			for (let i = 0; i < MAX_NUM_ODDS; i++) {
				sums.push(0);
			}

			event.sites.forEach(site => {
				site.odds.h2h.forEach((odd, idx) => {
					sums[idx] += odd;
				});
			});

			sums = sums.map(sum => {
				return sum / (1.0 * event.sites.length);
			});


			eventOdds.push({ teams: event.teams, odds: sums, commenceTime: event.commence_time });
		});

		// console.log(eventOdds);
		// console.log(response.data.data);
		return eventOdds;
})
.catch(error => {
    console.log('Error status', error.response.status)
    console.log(error.response.data)
})

// getSeasonSports();
// getSportOdds();

module.exports = {
	getSeasonSports,
	getSportOdds
}
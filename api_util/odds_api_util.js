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

    console.log(response.data.data[0])
})
.catch(error => {
    console.log('Error status', error.response.status)
    console.log(error.response.data)
})

// To get odds for a sepcific sport, use the sport key from the last request
//   or set sport to "upcoming" to see live and upcoming across all sports


const MAX_NUM_ODDS = 3;
const getSportOdds = (sport) => axios.get('https://api.the-odds-api.com/v3/odds', {
    params: {
        api_key: API_KEY,
        sport: SPORT_KEY,
        region: 'uk', // uk | us | eu | au
        mkt: 'h2h' // h2h | spreads | totals
    }
}).then(response => {
		console.log(response.data)

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


			eventOdds.push({ teams: event.teams, odds: sums});
		});

		console.log(eventOdds);
		
})
.catch(error => {
    console.log('Error status', error.response.status)
    console.log(error.response.data)
})

module.exports = {
	getSeasonSports,
	getSportOdds
}
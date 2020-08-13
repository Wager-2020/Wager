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
    console.log('Error status', error.response)
    console.log(error.response.data)
})

// To get odds for a sepcific sport, use the sport key from the last request
//   or set sport to "upcoming" to see live and upcoming across all sports

const MAX_NUM_ODDS = 3;
const getSportOdds = (sportKey = SPORT_KEY) => axios.get('https://api.the-odds-api.com/v3/odds', {
    params: {
        api_key: API_KEY,
        sport: sportKey,
        region: 'us', // uk | us | eu | au
        mkt: 'totals' // h2h | spreads | totals
    }
}).then(response => {
		let eventOdds = [];

		
		response.data.data.forEach(event => {

			let odds = [];
			let points = [];
			let positions = [];
			for (let i = 0; i < MAX_NUM_ODDS; i++) {
				odds.push(0);
				points.push(0);
				positions.push("");
			}
			

			event.sites.forEach(site => {
				site.odds.totals.odds.forEach((odd, idx) => {
					odds[idx] += parseFloat(odd);
				});

				site.odds.totals.points.forEach((point, idx) => {
					points[idx] += parseFloat(point);
				});

				site.odds.totals.position.forEach((position, idx) => {
					positions[idx] = position;
				});
			});

			odds = odds.map(odd => {
				return odd / (1.0 * event.sites.length);
			});

			points = points.map(point => {
				return parseFloat(point) / (1.0 * event.sites.length);
			});

			eventOdds.push({ 
				teams: event.teams, 
				odds, 
				points,
				positions,
				commenceTime: event.commence_time }
			);

		});

		// console.log(eventOdds);
		return eventOdds;
})
.catch(error => {
    console.log('Error status', error.response)
    console.log(error.response)
})

module.exports = {
	getSeasonSports,
	getSportOdds
}
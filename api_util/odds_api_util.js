const request = require('request');

const headers = {
	'apikey': '9254c9a0-dcb5-11ea-b21c-596e4a7f5aa9'
};

const API_URL = (query) => {
	query = query ? query + "&" : "";
	return `https://app.oddsapi.io/api/v1/odds?${query}apikey=9254c9a0-dcb5-11ea-b21c-596e4a7f5aa9`
}

const NORTH_CENTRAL_AMERICA = "north-central-america";

const OPTIONS = {
	url: API_URL(NORTH_CENTRAL_AMERICA),
	headers: headers
};

// function callback(error, response, body) {
// 	if (!error && response.statusCode == 200) {
// 		console.log(body);
// 	}
// }

// request(options, callback);

const makeRequest = (callback) => {
  return request(OPTIONS, callback);
}

module.exports = makeRequest;
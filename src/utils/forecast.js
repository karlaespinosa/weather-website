const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/b1e206a38c572d35c9ad3d5bf2722575/${latitude},${longitude}`;
    request({url: url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to weather service.', undefined);
        } else if(response.body.error) {
            callback('Unable to find location.', undefined);
        } else {
            callback(undefined, `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is ${response.body.currently.precipProbability}% chance of rain`);
        }
    });
}

module.exports = forecast;
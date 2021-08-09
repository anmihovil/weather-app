const request = require('request');
const chalk = require('chalk');

const forecast = (long, lat, callback ) => {
    const url = 'http://api.weatherstack.com/current?access_key=bc09fd841289e5095d3c50ae6a51844b&query=' + lat + ',' + long + '&units=m';
    request({url, json:true}, (error, {body}) => {
        if( error ) {
            callback('Unable to connect to location services!', undefined); 
        } else if ( body.error ) {
            callback('Unable to find the location, please try again!', undefined);
        } else {
            const temp = body.current.temperature;
            const feelsLikeTemp = body.current.feelslike;
            const weatherDescription = body.current.weather_descriptions[0];
            callback(undefined, chalk.green(`The weather is ${weatherDescription} with temperature of ${temp}°C degrees that feels like ${feelsLikeTemp}°C.`));
        }
    })
}   

module.exports = forecast;
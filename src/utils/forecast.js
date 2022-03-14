const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=e3a1e246928eb489c7970adc358ffa9e&query=' + latitude + ',' + longitude + '&units=f';

    request({ url, json: true }, (error, { body } = {}) => {
        // console.log(response.body)
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another location!!', undefined);
        } else {
            console.log(body);
            callback(undefined, {
                description: body.current.weather_descriptions,
                temperature: 'It is currently ' + body.current.temperature + 'F.',
                feelsLike: 'It feels like ' + body.current.feelslike + ' out.',
                rain: 'There is a ' + body.current.precip + ' chance of rain.',
                humidity: 'Humidity is ' + body.current.humidity + '.'
            });
        }
    });
};

module.exports = forecast;
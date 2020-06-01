const axios = require('axios')

const forecast = (longitude, latitude, callback) => {
    const weatherURL = 'https://api.darksky.net/forecast/e17f6edbe8266ac06d64d7eabb0edb90/' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '?units=si'
    axios.get(weatherURL)
        .then(response => {
            const temperature = response.data.currently.temperature
            const precipProbability = response.data.currently.precipProbability
            const summary = response.data.daily.data[0].summary
            const data = summary + ' It is currently ' + temperature + ' degrees out. There is a ' + precipProbability + '% chance of rain.'
            callback(undefined, data)
        })
        .catch(error => {
            if(error.response){
                callback('Unable to find location', undefined)
            } else {
                callback('Unable to connect to weather service', undefined)
            }
        })
}

module.exports = forecast
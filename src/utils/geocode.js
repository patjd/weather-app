const axios = require('axios')

const geocode = (address, callback) => {
    const geocodingURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiamF5ZGVlcDIzOTYiLCJhIjoiY2thbzc0YzN4MXl1dTJ4bXN0bnNscXMwcyJ9._ykAN9PNVxtx2OKFSNrbSw&limit=1'
    axios.get(geocodingURL)
    .then(response => {
        if(response.data.features.length !== 0) {
            const [ longitude, latitude ] = response.data.features[0].center
            const location = response.data.features[0].place_name
            callback(undefined, {
                longitude,
                latitude,
                location,
            })
        } else {
            callback('Location not found. Try another search!', undefined)
        }
    })
    .catch(error => {
        callback('Unable to connect to location service', undefined)
    })
}

module.exports = geocode
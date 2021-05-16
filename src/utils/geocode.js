const request = require('postman-request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGV2dTA0MDkiLCJhIjoiY2tvbnp3ZjByMDZrOTJvczJ4ZWFpYjY1cyJ9.58ulP8ySFxvsKZpeTiirdQ&limit=1'

    request({ url, json:true}, (error, {body} = {}) => {
        if(error) {
            callback('Can not connect to mapBox service . . . . . ', undefined)

        }else if(body.message){
            callback(body.message, undefined)

        }else if(body.features.length === 0){
            callback('Invalid location . . . . . ', undefined)

        }else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
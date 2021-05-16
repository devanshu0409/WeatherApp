const request = require('postman-request');

const weather = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=4decbbe174797107152360c794836429&query='+latitude+','+longitude+'&units=m'

    request({ url, json:true}, (error, {body} = {}) => {
        if(error){
            callback('Something went wrong . . . . . ', undefined)
            
        } else if(body.error) {
            callback(body.error.info, undefined)
    
        } else{
            callback( undefined, 'It is currently ' + body.current.temperature + ' degrees out. Although it feels like ' + body.current.feelslike + ' degrees.')
        }
    })
}

module.exports = weather
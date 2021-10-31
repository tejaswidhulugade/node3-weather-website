const request = require('request')

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoidGVqYXN3aWRodWx1Z2FkZSIsImEiOiJja3Y5dXQyZnQ0dnZhMnFwNno4Y2VqaDF1In0.je4AXCQpocPlM4Zra0ScMw&limit=1'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Was unable to connect to server', undefined)
        } else if (body.features === undefined || body.features.length === 0) {
            callback('No matching results found', undefined)
        } else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const location = body.features[0].place_name

            callback(undefined, {
                latitude: latitude, 
                longitude: longitude,
                location: location})
        }
    })
}

const forecast = (latitude, longitude, callback) => {
const url = 'http://api.weatherstack.com/current?access_key=fd367c944481f73ed4843f1294dcb6d7&query='+latitude+','+longitude+'&units=m'

request({ url, json: true }, (error, {body}) => {

    if (error) {
        callback('Was unable to connect to server', undefined)
    } else if (body.error) {
        callaback('Location not found', undefined)
    } else {
        callback(undefined, {
            weather_descriptions: body.current.weather_descriptions[0],
            temperature: body.current.temperature,
            feelslike: body.current.feelslike
        })
    }
})
}

module.exports = {geoCode, forecast}
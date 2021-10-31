const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const { query } = require('express')


const app = express()
const port = process.env.PORT || 3000
// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather forecast',
        name: 'Tejaswi'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
    title: 'About Me',
    name: 'Tejaswi'
})
})
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Help pageee',
        title: 'Help',
        name: 'Tejaswi'
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Hello Express!</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send([{
//         name: 'Teja'
//     }, {
//         name: 'Sweetie'
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About page</h1>')
// })

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide address.'})
    }

    geocode.geoCode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({
                error
            })
        }

        geocode.forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }

            res.send({
                location,
                address: req.query.address,
                forecast: forecastData.weather_descriptions
            })
        })
    })
})

app.get('/help/*', (req, res) => {

    res.render('pagenotfound', {
        title: 'Help 404',
        errorMessage: 'Help article not found',
        name: 'Tejaswi'
    })

})

app.get('*', (req, res) => {
    res.render('pagenotfound', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Tejaswi'
    })
})

app.listen(port, () => {
    console.log('Server has started successfully on post: '+port)
})
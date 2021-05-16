//core modules
const path = require('path')

//npm modules
const chalk = require('chalk')
const express = require('express')
const hbs = require('hbs')

//custom modules
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars, views, and engines locations
app.set('views', viewsPath);
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//customize server to serve static asset
app.use(express.static(publicDirectoryPath))

//get mapping for root
app.get('', (req, res) => {
    res.render('index', {
        title: 'Hello from Express!',
        name : 'Devanshu'
    })
})

//get mapping for /about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name : 'Devanshu'
    })
})

//get mapping for /help
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'We are here to help',
        name : 'Devanshu'
    })
})

// get mapping for /weather
app.get('/weather', (req, res) => {
    if(!req.query.location){
        res.send({
            error: 'You must provide a location'
        })
    }

    geocode(req.query.location, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                location,
                forecastData
            })
        })
    })
    
})

// get mapping for error page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 : Not Found :(',
        name : 'Devanshu'
    })
})

//start server
app.listen(port, () => {
    console.log(chalk.green.inverse(`Server is up at http://localhost:${port}`))
})
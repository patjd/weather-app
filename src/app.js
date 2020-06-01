const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Setup path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup template engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Serve the static content
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jaydeep Patel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jaydeep Patel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Jaydeep Patel',
        helpText: 'This is help text.'
    })
})


app.get('/weather', (req, res) => {
    const { address } = req.query

    if(!address) {
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(address, (error, {longitude, latitude, location} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
    
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({
                    error
                })
            }
            res.send({
                location,
                forecast: forecastData,
                address,
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jaydeep Patel',
        errorMessage: 'Help article not found!'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jaydeep Patel',
        errorMessage: 'Page not found!'
    })
})

app.listen(port, () => console.log('Server up on port ' + port))
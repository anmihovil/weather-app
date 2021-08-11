const path = require('path');
const chalk = require('chalk');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public/');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(publicDirectoryPath)));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Andrew Mead'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Some helpful text',
        name: 'Andrew Mead'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }

    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {

        if (error) {
            return res.send({
                error:'Unable to find location, try another search.'
            });
        }    

        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            });     
    
        });
    });

});

app.get('/products', (req,res) => {
    if(!req.query.search) { 
        return res.send({
            error: 'You must provide a search term.'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '',
        errorText: 'Help article not found.',
        name: 'Andrew Mead'
    });
});

app.get('/*', (req, res) => {
    res.render('error', {
        title: '',
        errorText: 'Page not found.',
        name: 'Andrew Mead'
    });
});

app.listen(port, () => {
    console.log(chalk.cyan('Server is up and running on port ' + port +'!'));
});
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();

//Define paths for Express congif
const publicDirectoryPath = path.join(__dirname,'../public'); //provides path for public folder, so it can use css, js, etc.
const viewsPath = path.join(__dirname, '../templates/views'); //provides the path for the remane folder templates previously colled views
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);


//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Karla Espinosa'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Karla Espinosa'
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'An Address needs to be provided'
        })
    }

    geocode(req.query.address, (error, data) => {
        if(error) {
            return res.send({ error: error });
        }
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error: error });
            }
            return res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You most provide a search term'
        });
    }
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Karla Espinosa',
        msg: 'Here, you can find information about...'
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Karla Espinosa',
        message: 'Help article not found'
    });
});
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        name: 'Karla Espinosa',
        message: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server running');
});
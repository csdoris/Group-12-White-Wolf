/**
 * This is a simple RESTful API for fetching API keys from the backend.
 */

import express from 'express';
import axios from 'axios';

const HTTP_OK = 200;
const HTTP_NOT_FOUND = 404;

const router = express.Router();

// Fetch Weather API key
router.get('/', async (req, res) => {
    let weatherAPIKey = process.env.WEATHER_API_KEY;
    let cityName = req.query.city;
    let lat = req.query.lat;
    let lon = req.query.lon;
    // let lat = 36.8509;
    // let lon = 174.7645;
    // let cityName = 'Auckland';
    let url;
    if (cityName) {
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${weatherAPIKey}&units=metric`;
    } else {
        url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherAPIKey}&units=metric`;
    }
    
    let weather;
    await axios
        .get(url)
        .then(function (response) {
            weather = response.data.list;
        })
        .catch(function (error) {
            console.log(error);
        });

    if (weather) {
        res.status(HTTP_OK).json(weather);
    } else {
        res.status(HTTP_NOT_FOUND);
    }
});

export default router;

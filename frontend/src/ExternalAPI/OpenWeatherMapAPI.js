const axios = require('axios');

export default async function FetchWeatherInfo(city, lat, lon) {
    let weather;
    await axios
        .get('/api/weather', { params: { city: city, lat: lat, lon: lon } })
        .then(function (response) {
            weather = response.data;
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        });

    return weather;
}

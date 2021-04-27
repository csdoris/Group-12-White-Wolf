const axios = require('axios');

export default async function FetchWeatherInfo(city, lat, lon) {
    let weatherInfo;
    await axios
        .get('/api/weather', { params: { city: city, lat: lat, lon: lon } })
        .then(function (response) {
            let data = response.data;
            weatherInfo = data.map((element) => {
                var date = new Date(element.dt_txt);
                date.toISOString();
                let temperature = element.main.temp;
                let feelsLikeTemperature = element.main.feels_like;
                let weather = element.weather[0].main;
                let weatherDescription = element.weather[0].description;
                let weatherIcon = element.weather[0].icon;
                let windSpeed = element.wind.speed;
                let weatherInstance = {
                    month: date.getMonth(),
                    date: date.getDate(),
                    year: date.getFullYear(),
                    timeOfDay: date.getHours(),
                    temperature: temperature,
                    feelsLikeTemperature: feelsLikeTemperature,
                    weather: weather,
                    weatherDescription: weatherDescription,
                    weatherIcon: weatherIcon,
                    windSpeed: windSpeed,
                };
                return weatherInstance;
            });
        })
        .catch(function (error) {
            console.log(error);
        });

    return weatherInfo;
}

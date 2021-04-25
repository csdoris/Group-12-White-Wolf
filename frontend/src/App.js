import React from 'react';
import './App.css';
import FetchWeatherInfo from './ExternalAPI/OpenWeatherMapAPI';
import Home from './Pages/Home';
const axios = require('axios');

function App() {
    return (
        <>
            <button onClick={gettee}>click me to get</button>
            <Home />
        </>
    );
}

// example post to backend
const gettee = async () => {
    console.log('clicked');
    let weatherInfo = await FetchWeatherInfo('Auckland');
    console.log(weatherInfo);
};

export default App;

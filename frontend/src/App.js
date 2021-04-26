import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FetchWeatherInfo from './ExternalAPI/OpenWeatherMapAPI';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage'
import useToken from './hooks/useToken'

import './App.css';

const axios = require('axios');

function App() {

    const {token, setToken} = useToken();

    if (!token) {
        return <LoginPage setToken={setToken} />
    }

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/home">
                        <button onClick={gettee}>click me to get</button>
                        <Home /> 
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

// example post to backend
const gettee = async () => {
    console.log('clicked');
    let weatherInfo = await FetchWeatherInfo('Auckland' , 36.8509, 174.7645);
    console.log(weatherInfo);
};

export default App;

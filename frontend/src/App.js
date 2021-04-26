import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FetchWeatherInfo from './ExternalAPI/OpenWeatherMapAPI';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import {withRouter} from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage'
import useToken from './hooks/useToken'
import PrivateRoute from './Components/PrivateRoute'

import './App.css';

const axios = require('axios');

function App() {

    const {token, setToken} = useToken();

    function handleLoginData(data) {
        console.log(data);
        setToken(data.Token);
    }

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/home">
                        <button onClick={gettee}>click me to get</button>
                        <Home /> 
                    <Route exact path="/login">
                        <LoginPage setData={handleLoginData}/> 
                    </Route>
                    <PrivateRoute exact path="/home" component={Home} authenticated={token ? true : false}/>
                    <Route path="/">
                        <Redirect to="/home" />
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

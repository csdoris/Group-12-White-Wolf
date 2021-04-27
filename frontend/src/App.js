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

    function validateEmail(email) {
        if (!email) {
            return false;
        }
    
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    
        if (!pattern.test(email)) {
          return false;
        }
        
        return true;
    }

    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route path="/home">
                        <button onClick={gettee}>click me to get</button>
                        <Home /> 
                    <Route exact path="/login">
                        <LoginPage setData={handleLoginData} validateEmail={validateEmail}/> 
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

import React, { useState } from 'react';
import FetchWeatherInfo from './ExternalAPI/OpenWeatherMapAPI';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import useToken from './hooks/useToken'
import PrivateRoute from './Components/PrivateRoute'

import './App.css';
import ExportICS from './helpers/ExportICS';
import ImportICS from './helpers/ImportICS';
import { AppContextProvider } from './AppContextProvider';

function App() {


    const { token, setToken } = useToken();

    function handleLoginData(data) {
        console.log(data);
        setToken(data.token);
    }

    return (
        <>
            <AppContextProvider>
                <BrowserRouter>
                    <Switch>
                        <Route exact path="/login">
                            <button onClick={gettee}>click me to get</button>
                            <LoginPage setData={handleLoginData} />
                        </Route>
                        <Route exact path="/signup">
                            <SignupPage />
                        </Route>
                        <PrivateRoute exact path="/home"
                            component={Home}
                            authenticated={token ? true : false}
                            token={token}
                        />
                        <Route path="/">
                            <Redirect to="/home" />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </AppContextProvider>
        </>
    );
}

// example post to backend
const gettee = async () => {
    console.log('clicked');
    let ourEvent = {
        title: 'No title',
        address: 'Folsom Field, University of Colorado',
        description: 'des',
        endTime: '2021-05-02T07:47:09.149Z',
        lat: 52.61732,
        lng: -1.8604,
        startTime: '2021-05-03T09:47:09.149Z',
    };
    let events = [];
    events.push(ourEvent);
    // let contents = await ExportICS(events);
    let contents = await ImportICS();
    if (contents) {
        console.log(contents);
    }
};

export default App;

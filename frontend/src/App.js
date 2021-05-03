import React, { useEffect, useState } from 'react';
import FetchWeatherInfo from './ExternalAPI/OpenWeatherMapAPI';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage'
import SignupPage from './Pages/SignupPage'
import useToken from './hooks/useToken'
import PrivateRoute from './Components/PrivateRoute'

import './App.css';
import { AppContext } from './AppContextProvider';

function App() {

    const [plans, setPlans] = useState([]);
    const value = { plans, setPlans };

    const { token, setToken } = useToken();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    function handleLoginData(data) {
        console.log(data);
        setUsername(data.name);
        setEmail(data.email);
        setToken(data.token);
    }

    return (
        <>
            <AppContext.Provider value={value}>
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
                            username={username}
                            email={email}
                            token={token}
                        />
                        <Route path="/">
                            <Redirect to="/home" />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </AppContext.Provider>
        </>
    );
}

// example post to backend
const gettee = async () => {
    console.log('clicked');
    let weatherInfo = await FetchWeatherInfo('Auckland', 36.8509, 174.7645);
    console.log(weatherInfo);
};

export default App;

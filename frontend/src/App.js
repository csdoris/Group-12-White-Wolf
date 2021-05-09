import React from 'react';
import FetchWeatherInfo from './ExternalAPI/OpenWeatherMapAPI';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import useToken from './hooks/useToken';
import PrivateRoute from './Components/PrivateRoute';

import './App.css';
import { AppContextProvider } from './AppContextProvider.js';

function App() {

    const { token, setToken } = useToken();

    function handleLoginData(data) {
        setToken(data.token);
    }

    return (
        <>
            <AppContextProvider>
                    <Switch>
                        <Route exact path="/login">
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
            </AppContextProvider>
        </>
    );
}

export default App;

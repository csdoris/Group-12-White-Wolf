import React, { useState, useEffect, useContext } from 'react';
import GoogleMaps from '../Components/GoogleMaps';
import SideNav from '../Components/Sidebar';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import ScheduleView from '../Components/ScheduleView';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { AppContext, AppContextProvider } from '../helpers/AppContextProvider';

function Home({ username, email, token }) {
    const { APIkey, setAPIkey } = useContext(AppContext);
    const [keyObtained, setKeyObtained] = useState(false);
    const [value, setValue] = useState(0);

    useEffect(() => {
        axios
            .get('/api/apikeys/googlekey')
            .then(function (response) {
                const loader = new Loader({
                    apiKey: response.data.googleAPIKey,
                    libraries: ['places'],
                });
                loader.load().then(() => {
                    setKeyObtained(true);
                    setAPIkey(response.data.googleAPIKey);
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (keyObtained) {
        return (
            <div>
                <SideNav />
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Map View" />
                    <Tab label="Schedule View" />
                </Tabs>
                {value ? <ScheduleView /> : <GoogleMaps />}
            </div>
        );
    } else {
        return (
            <div>
                <SideNav />
                <CircularProgress />
            </div>
        );
    }
}

export default Home;

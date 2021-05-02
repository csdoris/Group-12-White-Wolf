import React, { useState, useEffect } from 'react';
import GoogleMaps from '../Components/GoogleMaps';
import SideNav from '../Components/Sidebar';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

export const PlanContext = React.createContext(undefined);

function Home({ username, email, token }) {
    const [keyObtained, setKeyObtained] = useState(false);
    const [plan, setPlan] = useState(undefined);

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
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    if (keyObtained) {
        return (
            <div>
                <PlanContext.Provider value={[plan, setPlan]}>
                    <SideNav />
                    <GoogleMaps />
                </PlanContext.Provider>
            </div>
        );
    } else {
        return (
            <div>
                <PlanContext.Provider value={[plan, setPlan]}>
                    <SideNav />
                </PlanContext.Provider>
                <CircularProgress />
            </div>
        );
    }
}

export default Home;

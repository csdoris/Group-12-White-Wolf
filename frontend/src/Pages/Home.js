import React, { useState, useEffect } from 'react';
import GoogleMaps from '../Components/GoogleMaps';
import SideNav from '../Components/Sidebar';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Logout from '../Components/Logout';

function Home() {
    const [keyObtained, setKeyObtained] = useState(false);

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
                <SideNav />
                <Logout />
                <GoogleMaps />
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

import React, { useState, useEffect } from 'react';
import GoogleMaps from '../Components/GoogleMaps';
import SideNav from '../Components/Sidebar';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

function Home({ username, email, token }) {
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
                <button onClick={gettee}>click me to get</button>
                <SideNav />
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

const gettee = async () => {
    console.log('clicked');
    axios
        .get('/api/plans')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

export default Home;

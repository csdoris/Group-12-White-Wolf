import React, { useState, useEffect, useContext } from 'react';
import GoogleMaps from '../Components/GoogleMaps';
import SideNav from '../Components/Sidebar';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Logout from '../Components/Logout';
import { AppContext } from '../AppContextProvider';

function Home() {
    const [keyObtained, setKeyObtained] = useState(false);
    const [plansObtained, setPlansObtained] = useState(false);
    const { plans, setPlans } = useContext(AppContext);

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
        
        axios.get(`/api/plans`, { headers: { "Authorization": `Bearer ${token}` }}).then( function (resp) {
            console.log("RESP FROM HOME",resp.data);
            setPlans(resp.data);
            console.log(plans);
            setPlansObtained(true);
        });
    }, []);

    if (keyObtained && plansObtained) {
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
                <CircularProgress />
            </div>
        );
    }
}

export default Home;

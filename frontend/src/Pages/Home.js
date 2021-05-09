import React, { useState, useEffect, useContext } from 'react';
import GoogleMaps from '../Components/GoogleMaps';
import SideNav from '../Components/Sidebar';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import ScheduleView from '../Components/ScheduleView';
import { SidebarContextProvider } from '../helpers/SidebarContextProvider';
import Logout from '../Components/Logout';
import { AppContext } from '../AppContextProvider';
import useToken from '../hooks/useToken';
import TabBar from '../Components/TabBar';

const MAP_VIEW = 0;

function Home() {
    const [keyObtained, setKeyObtained] = useState(false);
    const [plansObtained, setPlansObtained] = useState(false);
    const { plans, setPlans, setAPIkey } = useContext(AppContext);
    const [view, setView] = useState(MAP_VIEW);
    const token = useToken().token;

    useEffect(() => {
        setView(MAP_VIEW);
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

        axios.get(`/api/plans`, { headers: { "Authorization": `Bearer ${token}` } }).then(function (resp) {
            setPlans(resp.data);
            setPlansObtained(true);
        });
    }, []);

    function handleTabChange(event, newView) {
        setView(newView);
    };

    if (keyObtained && plansObtained) {
        return (
            <SidebarContextProvider>
                <div>
                    <SideNav/>
                    <TabBar view={view} handleChange={handleTabChange}/>
                    <Logout />
                    {view ? <ScheduleView /> : <GoogleMaps />}
                </div>
            </SidebarContextProvider>
        );
    } else {
        return (
            <div style={{height:'100vh', width:'100vw', display:'flex', alignItems:'center', justifyContent:'center'}}>
                <CircularProgress />
            </div>
        );
    }
}

export default Home;

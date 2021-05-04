import React, { useState, useEffect, useContext } from 'react';
import GoogleMaps from '../Components/GoogleMaps';
import SideNav from '../Components/Sidebar';
import { Loader } from '@googlemaps/js-api-loader';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import ScheduleView from '../Components/ScheduleView';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { SidebarContextProvider } from '../helpers/SidebarContextProvider';
import Logout from '../Components/Logout';
import { AppContext } from '../AppContextProvider';
import useToken from '../hooks/useToken';

function Home() {
    const [keyObtained, setKeyObtained] = useState(false);
    const [plansObtained, setPlansObtained] = useState(false);
    const { plans, setPlans, APIkey, setAPIkey } = useContext(AppContext);
    const [value, setValue] = useState(false);
    const token = useToken().token;

    useEffect(() => {
        setValue(0);
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
        
        axios.get(`/api/plans`, { headers: { "Authorization": `Bearer ${token}` }}).then( function (resp) {
            console.log("RESP FROM HOME",resp.data);
            setPlans(resp.data);
            console.log(plans);
            setPlansObtained(true);
        });
    }, []);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //This function is to switch back to map view when in schedule view and the plan is delted
    const deleteCalled = () => {
        setValue(0);
    };

    if (keyObtained && plansObtained) {
        return (
            <SidebarContextProvider>
                <div>
                    <SideNav view={value} deleteFunc={deleteCalled} />
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
                    <Logout />
                    {value ? <ScheduleView /> : <GoogleMaps />}
                </div>
            </SidebarContextProvider>
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

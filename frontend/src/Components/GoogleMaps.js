import React, { useState, useContext, useEffect } from 'react';
import {
    GoogleMap,
    InfoWindow,
    Marker,
} from '@react-google-maps/api';
import '../Styles/MapPinStyles.css'

import axios from 'axios';
import useToken from '../hooks/useToken';
import { AppContext } from '../AppContextProvider.js';
import EventPopup from './EventPopup';
import FetchWeatherInfo from '../ExternalAPI/OpenWeatherMapAPI';
import getWeatherForTime from '../helpers/getWeatherForTime';

const mapContainerStyle = {
    height: '100vh',
    width: '100vw',
};
const center = {
    lat: -36.848461,
    lng: 174.763336,
};
const options = {
    disableDefaultUI: true,
    zoomControl: true,
};

function GoogleMaps() {
    const {events, setEvents, plan} = useContext(AppContext);
    const [viewEvent, setViewEvent] = useState(null);
    const [open, setOpen] = useState(false);
    const [weathers, setWeathers] = useState([]);

    const { token } = useToken();
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    function handleClose() {
        setOpen(false);
    }

    function handleSave() {
        console.log("save called");
        setOpen(false);
    }

    function handleUpdate(updatedEvent) {
        console.log("update called");
        console.log(updatedEvent);

        // call the endpoint to update the event in the database
        axios.put(`/api/plans/${plan._id}/${viewEvent._id}`, updatedEvent, header).then(async (response) => {
            if (response.status === 204) {
                setOpen(false);
                const plansResponse = await axios.get(`/api/plans/${plan._id}`, header);
                setEvents(plansResponse.data.events);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        getWeather()
    });

    function getWeather() {
        events.map((event, index) => {
            FetchWeatherInfo(null, event.lat, event.lng).then(result => {
                const weather = getWeatherForTime(result, events[index]);
                if(weather===null) {
                    document.getElementById(index).innerHTML = "";
                    return;
                }
                const weatherHtml = `<div>
                        <img style="height:50px; float:right;" src="http://openweathermap.org/img/w/${weather.weatherIcon}.png"/>
                        <span>${weather.temperature}&#176;C</span>
                    </div>`;
                
                let newWeathers = weathers;
                newWeathers[index] = weather;
                setWeathers(newWeathers);
                document.getElementById(index).innerHTML = weatherHtml;
                console.log(weathers)
            });
        });
    }

    return (
        <div>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
            >
                {events.map((event) => (
                    <Marker
                        key={event._id}
                        position={{ lat: parseFloat(event.lat), lng: parseFloat(event.lng) }}
                    />
                ))}
                {events.map((event, index) => (
                    <InfoWindow position = {{ lat: parseFloat(event.lat), lng: parseFloat(event.lng) }}>
                        <div
                            className="eventInfo"
                            onClick={(eventSelected) => {
                                setViewEvent(event);
                                setOpen(true);
                            }}
                            >
                            {/* TODO: heading corresponding with event name, img, date and temp */}
                            <h2>{event.name}</h2>
                            <p>{new Date(event.startTime).toLocaleDateString("en-US", dateOptions) }</p>
                            <div id={index}></div>
                        </div>
                    </InfoWindow>
                ))}
            </GoogleMap>
            {
                open && <EventPopup event={viewEvent} open={open} handleClose={handleClose} handleSave={handleSave} handleUpdate={handleUpdate} />
            }
        </div>
    );
}

export default GoogleMaps;

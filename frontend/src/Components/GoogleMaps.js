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
import { SidebarContext } from '../helpers/SidebarContextProvider';

const mapContainerStyle = {
    height: '95vh',
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
    const { plan, setPlan } = useContext(AppContext);
    const [viewEvent, setViewEvent] = useState(null);
    const [open, setOpen] = useState(false);
    const { weatherInfo } = useContext(SidebarContext);

    const { token } = useToken();
    const header = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    };

    const [events, setEvents] = useState([]);

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
                setPlan(plansResponse.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        console.log("called", plan)
        if (plan && plan.events) {
            setEvents(plan.events);
            console.log("set events", events);
        } else {
            setEvents(null);
        }
    }, [plan]);

    return (
        <div>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
            >
                {events && events.map((event) => (
                    <Marker
                        key={event._id}
                        position={{ lat: parseFloat(event.lat), lng: parseFloat(event.lng) }}
                    />
                ))}
                {events && events.map((event, index) => (
                    <InfoWindow key={event._id} position={{ lat: parseFloat(event.lat), lng: parseFloat(event.lng) }}>
                        <div
                            className="eventInfo"
                            onClick={(eventSelected) => {
                                setViewEvent(event);
                                setOpen(true);
                            }}
                        >
                            {/* TODO: heading corresponding with event name, img, date and temp */}
                            <h2>{event.name}</h2>
                            <p>{new Date(event.startTime).toLocaleDateString("en-US", dateOptions)}</p>
                            {weatherInfo[event._id] &&
                                <div id={index}>
                                    <img style={{ height: 50, float: 'right' }} src={`http://openweathermap.org/img/w/${weatherInfo[event._id].weatherIcon}.png`} />
                                    <span>{weatherInfo[event._id].temperature}&#176;C</span>
                                </div>
                            }
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

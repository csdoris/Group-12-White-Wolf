import React, { useState, useContext } from 'react';
import {
    GoogleMap,
    InfoWindow,
    Marker,
} from '@react-google-maps/api';
import '../Styles/MapPinStyles.css'
import { AppContext } from '../AppContextProvider.js';

import EventPopup from './EventPopup';

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
    const {events} = useContext(AppContext);
    const [viewEvent, setViewEvent] = useState(null);
    const [open, setOpen] = useState(false);

    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    function handleClose() {
        setOpen(false);
    }

    function handleSave() {
        console.log("save called");
        setOpen(false);
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
                {console.log(events)}
                {events.map((event) => (
                    <Marker
                        key={event._id}
                        position={{ lat: parseFloat(event.lat), lng: parseFloat(event.lng) }}
                    />
                ))}
                {events.map((event) => (
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
                            <div>
                                {/* TODO: https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon */}
                                <img src={"http://openweathermap.org/img/w/" + "10d" + ".png" }/>
                                <span>21&#176;C</span>
                            </div>
                        </div>
                    </InfoWindow>
                ))}
            </GoogleMap>
            {
                open && <EventPopup event={viewEvent} open={open} handleClose={handleClose} handleSave={handleSave} />
            }
        </div>
    );
}

export default GoogleMaps;

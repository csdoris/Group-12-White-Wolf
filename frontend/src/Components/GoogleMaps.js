import React, { useState, useContext } from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';
import '../Styles/MapPinStyles.css'
import { PlanContext } from '../Pages/Home';

import EventPopup from './Eventpopup';

const libraries = ['places'];
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
    const [markers, setMarkers] = useState([]);
    const [plan, setPlan] = useContext(PlanContext);
    const [viewEvent, setViewEvent] = useState(null);
    const [open, setOpen] = useState(false);

    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    function changePlan() {
        // TODO: Get plan events from database and weather info
        // var updatedMarkers = [];
        // setMarkers(updatedMarkers);
        console.log("change plan");
    }

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

                // Delete later
                onClick={(event) => {
                    setMarkers((current) => [
                        ...current,
                        {
                            id: 1,
                            lat: event.latLng.lat(),
                            lng: event.latLng.lng(),
                            time: new Date(),
                        },
                    ]);
                }}
            >
                {changePlan()}
                {markers.map((marker) => (
                    <Marker
                        key={marker.time.toISOString()}
                        position={{ lat: marker.lat, lng: marker.lng }}
                    />
                ))}
                {markers.map((marker) => (
                    <InfoWindow position = {{ lat: marker.lat, lng: marker.lng }}>
                        <div
                            className="eventInfo"
                            onClick={(event) => {
                                setViewEvent(marker.id);
                                setOpen(true);
                            }}
                            >
                            {/* TODO: heading corresponding with event name, img, date and temp */}
                            <h2>Event1</h2>
                            <p>{marker.time.toLocaleDateString("en-US", dateOptions) }</p>
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
                open && <EventPopup eventId={viewEvent} open={open} handleClose={handleClose} handleSave={handleSave} />
            }
        </div>
    );
}

export default GoogleMaps;

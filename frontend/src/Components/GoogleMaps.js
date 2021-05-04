import React from 'react';
import {
    GoogleMap,
} from '@react-google-maps/api';

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
    return (
        <div>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}
            ></GoogleMap>
        </div>
    );
}

export default GoogleMaps;

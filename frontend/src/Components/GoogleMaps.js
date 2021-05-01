import React from 'react';
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from '@react-google-maps/api';
import '../Styles/MapPinStyles.css'

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
    const [markers, setMarkers] = React.useState([]);
    const [plan, setPlan] = React.useState(undefined);
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });
    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    if (loadError) return 'Error';
    if (!isLoaded) return 'Loading...';

    function changePlan(planMarkers) {
        setMarkers(planMarkers);
    }

    return (
        <div>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={10}
                center={center}
                options={options}

                onClick={(event) => {
                    setMarkers((current) => [
                        ...current,
                        {
                            lat: event.latLng.lat(),
                            lng: event.latLng.lng(),
                            time: new Date(),
                        },
                    ]);
                }}
            >
                {markers.map((marker) => (
                    <Marker
                        key={marker.time.toISOString()}
                        position={{ lat: marker.lat, lng: marker.lng }}
                    />
                ))}
                {markers.map((marker) => (
                    <InfoWindow
                        position = {{ lat: marker.lat, lng: marker.lng }}
                        onClick={(event) => {
                            
                        }}
                    >
                        <div>
                            {/* TODO: heading corresponding with event name, img, date and temp */}
                            <h2>Event1</h2>
                            <p>{marker.time.toLocaleDateString("en-US", dateOptions) }</p>
                            <div>
                                {/* TODO: https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon */}
                                <img src= {"http://openweathermap.org/img/w/" + "10d" + ".png" }/>
                                <span>21&#176;C</span>
                            </div>
                        </div>
                    </InfoWindow>
                ))}
            </GoogleMap>
        </div>
    );
}

export default GoogleMaps;

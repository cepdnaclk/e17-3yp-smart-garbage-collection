import React from 'react';
import { GoogleMap, withScriptjs } from "react-google-maps";
import withGoogleMap from 'react-google-maps/lib/withGoogleMap';

function Map() {
    return <GoogleMap defaultZoom={10} defaultCenter={{ lat: 6.931970, lng: 79.857750 }} />
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function TempMap() {
    return <div style={{ width: '100vw', height: '100vh' }}>
        <WrappedMap
            googleMapURL={"https://maps.google.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key='AIzaSyAFJY6haLkUkP0YIFsbpNZvH9fFO7qDHcw'"}
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}

        />
    </div >;
}
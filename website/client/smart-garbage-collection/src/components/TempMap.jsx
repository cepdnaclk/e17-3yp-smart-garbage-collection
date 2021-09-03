import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'react-google-maps';

function TempMap() {
    return <Map google={this.props.google} zoom={14}>

        <Marker onClick={this.onMarkerClick}
            name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
                <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
    </Map>;
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyAFJY6haLkUkP0YIFsbpNZvH9fFO7qDHcw")
})(TempMap)
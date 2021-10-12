import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';

export default function TempMap() {
    const [viewport, setViewport] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
        latitude: 6.8018,
        longitude: 79.9227,
        zoom: 15
    });

    return (
        <ReactMapGL
            // .env. thing didn't work
            mapboxApiAccessToken={"pk.eyJ1IjoiaXNhcmExMjMiLCJhIjoiY2t1bXhyaHlmM3Z0dTJ1azZxdTF5anJsbiJ9.y9bx1-DVAKDocnb8ZJNSTg"}
            mapStyle="mapbox://styles/isara123/ckumzi9ch0dzi17livce3kxp5" //outdoors
            // mapStyle="mapbox://styles/isara123/ckumzniex5d8317mnjspf1bdr" //street
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
        />
    );
}
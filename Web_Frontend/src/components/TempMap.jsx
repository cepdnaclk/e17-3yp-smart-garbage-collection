// Approach 1

// import * as React from 'react';
// import { useState, useEffect } from 'react';
// import ReactMapGL from 'react-map-gl';
// import Axios from 'axios';

// export default function TempMap() {

//     const [units, setUnits] = useState([]);
//     // fetching system latitude and longitude from server - didn't
//     let [systemLat, setSystemLat] = useState(0);
//     let [systemLong, setSystemLong] = useState(0);
//     systemLat = 6.8014;
//     systemLong = 79.9229;

//     // get units data
//     useEffect(() => {
//         Axios.get("http://localhost:3001/Units/getAll")
//             .then(res => {
//                 //console.log(res.data[0]['location']);
//                 setUnits(res.data)
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }, []);

//     // get system coordinates
//     useEffect(() => {
//         Axios.get("http://localhost:3001/System/getCoordinates")
//             .then(res => {
//                 setSystemLat(res.data[0]['latitude']);
//                 setSystemLong(res.data[0]['longitude']);
//             })
//             .catch(err => {
//                 console.log(err)
//             })
//     }, []);

//     const [viewport, setViewport] = useState({
//         width: window.innerWidth,
//         height: window.innerHeight,
//         latitude: systemLat,
//         longitude: systemLong,
//         zoom: 17
//     });

//     return (
//         <ReactMapGL
//             // .env. thing didn't work
//             mapboxApiAccessToken={"pk.eyJ1IjoiaXNhcmExMjMiLCJhIjoiY2t1bXhyaHlmM3Z0dTJ1azZxdTF5anJsbiJ9.y9bx1-DVAKDocnb8ZJNSTg"}
//             mapStyle="mapbox://styles/isara123/ckumzi9ch0dzi17livce3kxp5" //outdoors
//             // mapStyle="mapbox://styles/isara123/ckumzniex5d8317mnjspf1bdr" //street
//             {...viewport}
//             onViewportChange={nextViewport => setViewport(nextViewport)}
//         />
//     );
// }

import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import Axios from 'axios';
import binImg from '../images/bin.png';
import collectorImg from '../images/collector.png';
//import * as parkDate from "./data/skateboard-parks.json";

export default function TempMap() {
    {

        const [units, setUnits] = useState([]);
        const [collectors, setCollectors] = useState([]);
        // fetching system latitude and longitude from server - didn't
        let [systemLat, setSystemLat] = useState(0);
        let [systemLong, setSystemLong] = useState(0);
        systemLat = 6.8014;
        //systemLong = 79.9229;
        systemLong = 79.9240;

        // get units data
        useEffect(() => {
            Axios.get("http://localhost:3001/Units/getAll")
                .then(res => {
                    setUnits(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }, []);

        // get collectors data
        useEffect(() => {
            Axios.get("http://localhost:3001/Collectors/getLocation")
                .then(res => {
                    setCollectors(res.data);
                })
                .catch(err => {
                    console.log(err)
                })
        }, []);

        // get system coordinates - did not work
        useEffect(() => {
            Axios.get("http://localhost:3001/System/getCoordinates")
                .then(res => {
                    setSystemLat(res.data[0]['latitude']);
                    setSystemLong(res.data[0]['longitude']);
                })
                .catch(err => {
                    console.log(err)
                })
        }, []);

        const [viewport, setViewport] = useState({
            // width: window.innerWidth,
            // height: window.innerHeight,
            // width: "100vw",
            // height: "100vh",
            width: "1100px",
            height: "570px",
            latitude: systemLat,
            longitude: systemLong,
            zoom: 16.5
        });

        const [selectedUnit, setSelectedUnit] = useState(null);
        const [selectedCollector, setSelectedCollector] = useState(null);

        return (
            <div>
                <ReactMapGL
                    {...viewport}
                    mapboxApiAccessToken={"pk.eyJ1IjoiaXNhcmExMjMiLCJhIjoiY2t1bXhyaHlmM3Z0dTJ1azZxdTF5anJsbiJ9.y9bx1-DVAKDocnb8ZJNSTg"}
                    mapStyle="mapbox://styles/isara123/ckumzi9ch0dzi17livce3kxp5" //outdoors
                    onViewportChange={viewport => {
                        setViewport(viewport);
                    }}
                >
                    {/* {parkDate.features.map(park => ( */}
                    {units.map(unit => (
                        <Marker
                            key={unit.id}
                            latitude={unit.latitude}
                            longitude={unit.longitude}
                        >
                            <button
                                className="marker-btn"
                                onClick={e => {
                                    e.preventDefault();
                                    setSelectedUnit(unit);

                                }}
                            >
                                <img src={binImg} alt="Skate Park Icon" width="25px" height="25px" />
                            </button>
                        </Marker>
                    ))}

                    {collectors.map(collector => (
                        <Marker
                            key={collector.id}
                            latitude={collector.latitude}
                            longitude={collector.longitude}
                        >
                            <button
                                className="marker-btn"
                                onClick={e => {
                                    e.preventDefault();
                                    setSelectedCollector(collector);

                                }}
                            >
                                <img src={collectorImg} alt="Collector Icon" width="25px" height="25px" />
                            </button>
                        </Marker>
                    ))}

                    {selectedUnit ? (
                        <Popup
                            latitude={selectedUnit.latitude}
                            longitude={selectedUnit.longitude}
                            onClose={() => {
                                setSelectedUnit(null);
                            }}
                        >
                            <div>
                                <p>Unit ID: {selectedUnit.id}</p>
                                <p>Unit Location: {selectedUnit.location}</p>
                            </div>
                        </Popup>
                    ) : null}

                    {selectedCollector ? (
                        <Popup
                            latitude={selectedCollector.latitude}
                            longitude={selectedCollector.longitude}
                            onClose={() => {
                                setSelectedCollector(null);
                            }}
                        >
                            <div>
                                <p>Collector ID: {selectedCollector.id}</p>
                                <p>Collector Name: {selectedCollector.fname} {selectedCollector.lname}</p>
                            </div>
                        </Popup>
                    ) : null}

                </ReactMapGL>
            </div>
        );
    }
}

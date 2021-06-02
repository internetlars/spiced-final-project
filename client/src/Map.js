import React from "react";
import MapboxGL from "mapbox-gl";

export default function Map() {
    const [viewport, setViewport] = useState({
        latitude: 45.4211,
        longitude: -75.6903,
        width: "100vw",
        height: "100vh",
        zoom: 10,
    });

    return (
        <div>
            <MapboxGL
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            >
                markers
            </MapboxGL>
        </div>
    );
}

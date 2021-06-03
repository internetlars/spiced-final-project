import React from "react";

import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
    "pk.eyJ1IjoiaW50ZXJuZXRsYXJzIiwiYSI6ImNrcGR1bHdvNjFyZmQybnA3a2wyeHRpMzkifQ.B6TyPSQDOf0wX_VKW39bpg";
export default class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            lng: 13.4,
            lat: 52.49,
            zoom: 12,
        };
        this.mapContainer = React.createRef();
    }
    componentDidMount() {
        console.log("App just mounted");
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: "mapbox://styles/internetlars/ckpfrfc2n0lo518m4svmx64g6",
            center: [lng, lat],
            zoom: zoom,
                        showUserLocation={true}

        });

        map.once("load", () => {
            map.resize();
        });

        map.on("move", () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2),
            });
        });

        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: true,
            })
        );

        map.on("click", function (e) {
            var features = map.queryRenderedFeatures(e.point, {
                layers: ["courts-in-berlin"],
            });
            if (!features.length) {
                return;
            }
            var feature = features[0];

            var popup = new mapboxgl.Popup({ offset: [0, -15] })
                .setLngLat(feature.geometry.coordinates)
                .setHTML(
                    "<h3>" +
                        feature.properties.title +
                        "</h3>" +
                        "<p>" +
                        feature.properties.description +
                        "</p>"
                )
                .addTo(map);
        });
    }

    render() {
        const { lng, lat, zoom } = this.state;

        return (
            <>
                {/* <div>
                    <div ref={this.mapContainer} className="map-container" />
                </div> */}

                <div ref={this.mapContainer} className="map-container">
                    <div className="mapbar">
                        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                    </div>
                </div>

            </>
        );
    }
}

// import React from "react";
// import MapboxGL from "mapbox-gl";

// export default function Map() {
//     const [viewport, setViewport] = useState({
//         latitude: 45.4211,
//         longitude: -75.6903,
//         width: "100vw",
//         height: "100vh",
//         zoom: 10,
//     });

//     return (
//         <div>
//             <MapboxGL
//                 {...viewport}
//                 mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
//             >
//                 markers
//             </MapboxGL>
//         </div>
//     );
// }

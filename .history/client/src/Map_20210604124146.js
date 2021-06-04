import React from "react";

import mapboxgl from "!mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ReactMapGL, { Marker } from "react-map-gl";
import { useSelector } from "react-redux";

mapboxgl.accessToken =
    "pk.eyJ1IjoiaW50ZXJuZXRsYXJzIiwiYSI6ImNrcGR1bHdvNjFyZmQybnA3a2wyeHRpMzkifQ.B6TyPSQDOf0wX_VKW39bpg";



// var b = data.filter(function (el) {
//     return el.coordinates [x]
// })

export default class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: 13.4,
            lat: 52.49,
            zoom: 12,
            courts: useSelector((state) => state.courts)
            viewport: {
                width: "100vw",
                height: "100vh",
                latitude: 42.430472,
                longitude: -123.334102,
                zoom: 16,
            },
            userLocation: {},
        };
        this.mapContainer = React.createRef();
    }
    componentDidMount() {
        console.log("App just mounted");
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: "mapbox://styles/internetlars/ckph3bpuy0g3g17rt0f5fvzhe",
            center: [lng, lat],
            zoom: zoom,
            showUserLocation: true,
        });

        JSON.parse(localStorage.getItem("courts")).forEach((name) => {
            console.log("name in loop: ", name);
            // var el = document.createElement("div");
            // el.className = "custommarker";
            var marker = new mapboxgl.Marker({ color: "black" })
                .setLngLat(name.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: [0, -15] }).setHTML(
                        "<h3>" +
                            name.name +
                            "</h3>" +
                            "<p>" +
                            name.description +
                            "</p>" +
                            "<p>" +
                            "Players currently on the court: " +
                            "</p>" +
                            "<h4>" +
                            name.checkins +
                            "</h4>"
                    )
                )
                .addTo(map);
        });

        //fixes render of map
        map.once("load", () => {
            map.resize();
        });

        //enables moving on map
        map.on("move", () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2),
            });
        });

        //enables user tracking
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true,
                },
                trackUserLocation: false,
            })
        );

        //enable check-in
        // map.on('load', function () {

        map.on("click", function (e) {
            var features = map.queryRenderedFeatures(e.point, {
                layers: ["courtsinberlin"],
            });
            if (!features.length) {
                return;
            }
            // var feature = features[0];

            // var popup = new mapboxgl.Popup({ offset: [0, -15] })
            //     .setLngLat(feature.geometry.coordinates)
            //     .setHTML(
            //         "<h3>" +
            //             feature.properties.title +
            //             "</h3>" +
            //             "<p>" +
            //             feature.properties.description +
            //             "</p>" +
            //             "<p>" +
            //             "Players currently on the court: " +
            //             "</p>" +
            //             "<h4>" +
            //             feature.properties.checkins +
            //             "</h4>"
            //     )
            //     .addTo(map);
        });

        // map.on("load", function () {
        //     map.addSource("oli-test-source", {
        //         type: "geojson",
        //         data: {
        //             features: [
        //                 {
        //                     type: "Feature",
        //                     properties: {
        //                         title: "Test test test",
        //                         description:
        //                             "Outdoor small fullcourt with chain baskets and playground floor.",
        //                         "check-ins": 0,
        //                     },
        //                     geometry: {
        //                         type: "Point",
        //                         coordinates: [
        //                             13.429247340184489, 52.493398614626405,
        //                         ],
        //                     },
        //                 },
        //             ],
        //             type: "FeatureCollection",
        //         },
        //     });
        //     map.addLayer({
        //         id: "poi-labels",
        //         type: "symbol",
        //         source: "oli-test-source",
        //         layout: {
        //             "text-field": ["get", "description"],
        //             "text-variable-anchor": ["top", "bottom", "left", "right"],
        //             "text-radial-offset": 0.5,
        //             "text-justify": "auto",
        //             "icon-image": ["get", "icon"],
        //         },
        //     });
        //     map.addLayer({
        //         id: "oli-test-layer",
        //         type: "circle",
        //         source: "oli-test-source",
        //         paint: {
        //             "circle-radius": 10,
        //             "circle-color": "#D21B1B",
        //         },
        //     });
        // });
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

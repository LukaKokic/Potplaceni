import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';

class OLMap extends React.Component {
    map = null;

    componentDidMount() {
        const longitude = 16.107182;
        const latitude = 45.857587;

        // Create a point feature for the marker
        const marker = new Feature({
            geometry: new Point(fromLonLat([longitude, latitude]))
        });

        // Set the style of the marker
        marker.setStyle(new Style({
            image: new Icon({
                anchor: [0.5, 1],
                src: '/images/prib.png',
                scale: 0.05
            })
        }));

        // Create a vector source and add the marker feature to it
        const vectorSource = new VectorSource({
            features: [marker]
        });

        // Create a vector layer and add it to the map
        const vectorLayer = new VectorLayer({
            source: vectorSource
        });

        this.map = new Map({
            target: this.refs.mapContainer,
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                vectorLayer
            ],
            view: new View({
                center: fromLonLat([longitude, latitude]),
                zoom: 17
            })
        });
    }

    render() {
        return (
            <div ref="mapContainer" style={{ width: '99%', height: '500px', border: '5px solid black' }}></div>
        );
    }
}

export default OLMap;

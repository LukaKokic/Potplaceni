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
//import { defaults as defaultControls, ZoomSlider, Rotate } from 'ol/control';

class OLMap extends React.Component {
    map = null;

    componentDidMount() {
        //longitude = 17.8081;                // Mostar
        //latitude = 43.3355;                 // Mostar

        const { longitude, latitude } = this.props;

        // Create a point feature for the marker
        const marker = new Feature({
            geometry: new Point(fromLonLat([longitude, latitude]))
        });

        // Set the style of the marker
        marker.setStyle(new Style({
            image: new Icon({
                //anchor: [0.5, 1],
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
            }),
            controls: []        // ovo mijenja one gumbe za zoom i rotaciju
        });
    }

    render() {
        return (<div ref="mapContainer" style={{ width: '99%', height: '50vh', border: '5px solid black' }}></div>
        );
    }
}

export default OLMap;

/*
ovako sam pozivao u svom main.jsxu kad sam testirao

import React from 'react';
import ReactDOM from 'react-dom';
import OLMap from './map'; // Assuming map.jsx is in the same directory

class App extends React.Component {
  render() {
    return (
      <div>
        <OLMap />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
 */
            
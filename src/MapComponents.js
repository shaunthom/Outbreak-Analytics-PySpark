import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import geojsonData from './output_geojson.json';
import mapData from './data.json'; 

class MapComponents extends Component {
  render() {
    const mapDataConfig = [{
      type: 'choroplethmapbox',
      geojson: geojsonData,
      locations: mapData.locations,
      z: mapData.z_values,
      
    }];

    const layout = {
      mapbox: {
        style: "open-street-map",
        center: { lat: 37.0902, lon: -95.7129 }, 
        zoom: 2.5, 
      },
      autosize: true,
      dragmode: false
    };

    const containerStyle = {
      width: '100%', 
      height: '900px',   
    };

    return (
      <div className="map-container"  style={containerStyle}>
        <Plot
          data={mapDataConfig}
          layout={layout}
          config={{ staticPlot: true }} 
        />
      </div>
    );
  }
}
export default MapComponents;
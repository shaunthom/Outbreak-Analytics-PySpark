import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import geojsonData from './output_geojson.json';

const MapComponents = () => {
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (event) => {
        const layer = event.target;
        layer.bindTooltip(`Statistics: ${feature.properties.YOUR_STAT_PROPERTY}`).openTooltip();
      },
      mouseout: (event) => {
        event.target.closeTooltip();
      },
    });
  };

  return (
    <MapContainer 
      style={{ height: '100vh', width: '100vw' }} 
      center={[37.8, -96]}
      zoom={5} 
      minZoom={5} 
      maxZoom={6} 
      dragging={false}
      touchZoom={false}
      scrollWheelZoom={false} 
      doubleClickZoom={false} 
      zoomControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={geojsonData} onEachFeature={onEachFeature} />
    </MapContainer>
  );
};

export default MapComponents;

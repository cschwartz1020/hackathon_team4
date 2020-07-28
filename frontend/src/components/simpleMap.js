import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./marker"

const SimpleMap = ({ protests, clickedProtest }) => {
  let center = {lat: clickedProtest.location.latitude, lng: clickedProtest.location.longitude}

  const defaultProps = {
    center: {
      lat: 28,
      lng: 86
    },
    zoom: 11
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.REACT_APP_API_KEY}}
        defaultCenter={defaultProps.center}
        center={center}
        defaultZoom={defaultProps.zoom}
      >
        {protests.map(p => 
          <Marker
            lat={p.location.latitude}
            lng={p.location.longitude}
            text={p.title}
          />
        )}
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;
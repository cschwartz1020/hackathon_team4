import React from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from "./marker"

const SimpleMap = ({ markers, clickedMarker, zoom }) => {
  let center = {lat: clickedMarker.lat, lng: clickedMarker.lng}

  const defaultProps = {
    center: {
      lat: 28,
      lng: 86
    },
    zoom: 11
  };

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{key: process.env.REACT_APP_API_KEY}}
        defaultCenter={defaultProps.center}
        center={center}
        defaultZoom={defaultProps.zoom}
      >
        {markers.map(m =>  // [{lat, lng, title}]
          <Marker
            lat={m.lat}
            lng={m.lng}
            text={m.title}
          />
        )}
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;
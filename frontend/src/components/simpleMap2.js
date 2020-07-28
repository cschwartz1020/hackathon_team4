import React, { useEffect, useState } from "react"
import GoogleMapReact from 'google-map-react';
import Marker from "./marker"



const apiIsLoaded = (map, maps) => {
  // Get bounds by our places
  // Fit map to bounds
   var bounds1 = map.getBounds();
   console.log(bounds1.getNorthEast().lat() ,bounds1.getNorthEast().lng() )
   console.log(bounds1.getSouthWest().lat() ,bounds1.getSouthWest().lng() )

  map.addListener('dragend', function() {
    var ConnerBounds = map.getBounds();
   console.log(ConnerBounds.getNorthEast().lat() ,ConnerBounds.getNorthEast().lng() )
   console.log(ConnerBounds.getSouthWest().lat() ,ConnerBounds.getSouthWest().lng() )
  });

  map.addListener('zoom_changed', function() {
    var ConnerBounds = map.getBounds();
   console.log(ConnerBounds.getNorthEast().lat() ,ConnerBounds.getNorthEast().lng() )
   console.log(ConnerBounds.getSouthWest().lat() ,ConnerBounds.getSouthWest().lng() )
  });

};

const SimpleMap2 = ({ markers, clickedMarker, zoom }) => {
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
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
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

export default SimpleMap2;
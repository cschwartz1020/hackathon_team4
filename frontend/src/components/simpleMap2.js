import React, { useEffect, useState,useCallback } from "react"
import GoogleMapReact from 'google-map-react';
import Marker from "./marker"




const SimpleMap2 = ({ markers, clickedMarker, zoom }) => {
  const [bounds, setBounds] = useState({value:{northEast:{lat:34,lng:34},southWest:{lat:34,lng:34}}})
  // const [bounds, setBounds] = useState({value:'initial value'})
  let center = {lat: clickedMarker.lat, lng: clickedMarker.lng}

  const setValue = useCallback((newValue) => {
    setBounds({ ...bounds, value: newValue })

  }, [bounds]) 

  useEffect(() => {
    console.log("checkbounds: ",bounds); 
  },[bounds]);

  const apiIsLoaded = (map, maps) => {
    // Get bounds by our places
    // Fit map to bounds
     var CornerBounds = map.getBounds();

     setValue({northEast:{lat:CornerBounds.getNorthEast().lat(),lng:CornerBounds.getNorthEast().lng()},southWest:{lat:CornerBounds.getSouthWest().lat(),lng:CornerBounds.getSouthWest().lng()}})

    //  console.log(bounds1.getNorthEast().lat() ,bounds1.getNorthEast().lng() )
    //  console.log(bounds1.getSouthWest().lat() ,bounds1.getSouthWest().lng() )
  
    map.addListener('dragend', function() {
      var CornerBounds = map.getBounds();

      // set northEast and SouthWest coordinates
      setValue({northEast:{lat:CornerBounds.getNorthEast().lat(),lng:CornerBounds.getNorthEast().lng()},southWest:{lat:CornerBounds.getSouthWest().lat(),lng:CornerBounds.getSouthWest().lng()}})
    });

   

    map.addListener('zoom_changed', function() {
      var CornerBounds = map.getBounds();

      // set northEast and SouthWest coordinates
      setValue({northEast:{lat:CornerBounds.getNorthEast().lat(),lng:CornerBounds.getNorthEast().lng()},southWest:{lat:CornerBounds.getSouthWest().lat(),lng:CornerBounds.getSouthWest().lng()}})
    });
  
  };
  
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

          <Marker
            lat={34.297766572244406}
            lng={-118.7588887724533}
            text={"sdsdsdsd"}
          />
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap2;
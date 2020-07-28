import React, { Component } from 'react';
import isEmpty from 'lodash.isempty';

// components:
import Marker from './MapsComponents/Marker';

// examples:
import GoogleMap from './MapsComponents/GoogleMaps';


// Return map bounds based on list of places
const getMapBounds = (map, maps, places) => {
  const bounds = new maps.LatLngBounds();

  places.forEach((place) => {
    bounds.extend(new maps.LatLng(
      place.geometry.location.lat,
      place.geometry.location.lng,
    ));
  });
  return bounds;
};

// Re-center map when resizing the window
const bindResizeListener = (map, maps, bounds) => {
  maps.event.addDomListenerOnce(map, 'idle', () => {
    maps.event.addDomListener(window, 'resize', () => {
      map.fitBounds(bounds);
      console.log(map.getBounds())
    });
  });
};

// Fit map to its bounds after the api is loaded
const apiIsLoaded = (map, maps, places) => {
  // Get bounds by our places
  const bounds = getMapBounds(map, maps, places);
  // Fit map to bounds
  var bounds1 = map.getBounds();

  var NECorner = bounds1.getNorthEast();
  var SWCorner = bounds1.getSouthWest();
  var NWCorner = new maps.LatLng(NECorner.lat(), SWCorner.lng());
var SECorner = new maps.LatLng(SWCorner.lat(), NECorner.lng());
  console.log(NECorner.lat(),SWCorner,NWCorner, SECorner)
  
};

class AnotherMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: [],
    };
  }

  componentDidMount() {
    fetch('places.json')
      .then((response) => response.json())
      .then((data) => this.setState({ places: data.results }));
  }

  render() {
    const { places } = this.state;
    return (
      <>
        {!isEmpty(places) && (
          <GoogleMap
            defaultZoom={10}
            defaultCenter={[34.0522, -118.2437]}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, places)}
          >
            {places.map((place) => (
              <Marker
                key={place.id}
                text={place.name}
                lat={place.geometry.location.lat}
                lng={place.geometry.location.lng}
              />
            ))}
          </GoogleMap>
        )}
      </>
    );
  }
}

export default AnotherMap;
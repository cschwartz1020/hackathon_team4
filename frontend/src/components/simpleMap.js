import React, { useEffect, useState, useCallback } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./marker";
import Marker2 from "./marker2";
import axios from "axios";
import { useAuth0 } from "../react-auth0-spa";

const SimpleMap = ({ markers, clickedMarker, zoom }) => {
  let center = { lat: clickedMarker.lat, lng: clickedMarker.lng };

  const defaultZoomLevel = 6;
  const [bounds, setBounds] = useState({
    value: { northEast: { lat: 34, lng: 34 }, southWest: { lat: 34, lng: 34 } },
  });
  const [covidMarkers, setCovidMarkers] = useState({
    value: [
      {
        region: {
          cities: [{ lat: 34, lng: -121, name: "sddsd" }],
          province: "",
        },
      },
    ],
  });
  const [isCovidDataLoaded, setIsisCovidDataLoaded] = useState(false);
  const [mapZoom, setmapZoom] = useState(defaultZoomLevel);
  const [token, setToken] = useState(undefined);
  const { getTokenSilently } = useAuth0();
  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getTokenSilently({
          audience: `development-protestr-api`,
        });
        setToken(accessToken);
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
  }, []);

  // == Load Google Maps API ==
  const apiIsLoaded = (map, maps) => {
    //set zoom
    var zoom = map.getZoom();

    // iterate over markers and call setVisible
    if (zoom <= defaultZoomLevel) {
      setIsisCovidDataLoaded(false);
      setmapZoom(false);
    } else {
      setIsisCovidDataLoaded(true);
      setmapZoom(true);
    }

    // Fit map to bounds
    var CornerBounds = map.getBounds();
    setBoundsCallback({
      northEast: {
        lat: CornerBounds.getNorthEast().lat(),
        lng: CornerBounds.getNorthEast().lng(),
      },
      southWest: {
        lat: CornerBounds.getSouthWest().lat(),
        lng: CornerBounds.getSouthWest().lng(),
      },
    });

    // Add Drag end Listener to map
    map.addListener("dragend", function () {
      var CornerBounds = map.getBounds();
      // set northEast and SouthWest coordinates
      setBoundsCallback({
        northEast: {
          lat: CornerBounds.getNorthEast().lat(),
          lng: CornerBounds.getNorthEast().lng(),
        },
        southWest: {
          lat: CornerBounds.getSouthWest().lat(),
          lng: CornerBounds.getSouthWest().lng(),
        },
      });
    });

    // Add zoom changed Listener to map
    map.addListener("zoom_changed", function () {
      var zoom = map.getZoom();

      // iterate over markers and call setVisible
      if (zoom <= defaultZoomLevel) {
        setIsisCovidDataLoaded(false);
        setmapZoom(false);
      } else {
        setIsisCovidDataLoaded(true);
        setmapZoom(true);
      }

      //Get bounds
      var CornerBounds = map.getBounds();
      // set northEast and SouthWest coordinates
      setBoundsCallback({
        northEast: {
          lat: CornerBounds.getNorthEast().lat(),
          lng: CornerBounds.getNorthEast().lng(),
        },
        southWest: {
          lat: CornerBounds.getSouthWest().lat(),
          lng: CornerBounds.getSouthWest().lng(),
        },
      });
    });
  };

  // == Callbacks ==
  const setBoundsCallback = useCallback(
    (newValue) => {
      setBounds({ ...bounds, value: newValue });
    },
    [bounds]
  );

  const setCovidMarkersCallback = useCallback(
    (newValue) => {
      setCovidMarkers({ ...covidMarkers, value: newValue });
    },
    [covidMarkers]
  );

  // == Use Effects ==

  useEffect(() => {
    const getCovid = async () => {
      axios
        .get(
          `http://localhost:3000/api/covid/area/${bounds.value.northEast.lat}/${bounds.value.northEast.lng}/${bounds.value.southWest.lat}/${bounds.value.southWest.lng}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setCovidMarkersCallback(res.data);

          if (mapZoom) {
            setIsisCovidDataLoaded(true);
          } else {
            setIsisCovidDataLoaded(false);
          }
        });
    };
    if (token) {
      getCovid();
    }
  }, [bounds, token]);

  const defaultProps = {
    center: {
      lat: 28,
      lng: 86,
    },
    zoom: 11,
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
        defaultCenter={defaultProps.center}
        center={center}
        defaultZoom={defaultProps.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
      >
        {markers.map((
          m // [{lat, lng, title}]
        ) => (
          <Marker lat={m.lat} lng={m.lng} name={m.title} />
        ))}
        {/* <Popover>
          <PopoverTrigger>
            <Button>Trigger</Button>
          </PopoverTrigger>
          <PopoverContent zIndex={4}>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Confirmation!</PopoverHeader>
            <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
          </PopoverContent>
        </Popover> */}

        {isCovidDataLoaded ? (
          covidMarkers.value.map((covidMarker) =>
            covidMarker.region.cities.map((city) => (
              <Marker2
                lat={city.lat}
                lng={city.long}
                name={city.name}
                confirmed={city.confirmed}
              />
            ))
          )
        ) : (
          <Marker2 lat={34} lng={-121} text={"sdsdsd"} />
        )}
      </GoogleMapReact>
    </div>
  );
};

export default SimpleMap;

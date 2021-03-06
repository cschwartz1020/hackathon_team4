import React, { useEffect, useState,useCallback } from "react"
import GoogleMapReact from 'google-map-react';
import Marker2 from "./marker2"
import "../css/marker2.css"
import axios from "axios";


const SimpleMap2 = ({ markers, clickedMarker, zoom }) => {
    const defaultZoomLevel = 6;
    const [bounds, setBounds] = useState({value:{northEast:{lat:34,lng:34},southWest:{lat:34,lng:34}}})
    const [covidMarkers, setCovidMarkers] = useState({value:[{region:{cities:[{lat:34,lng:-121,name:"sddsd"}],province:""}}]})
    const [isCovidDataLoaded,setIsisCovidDataLoaded] = useState(false);
    const [mapZoom,setmapZoom] = useState(defaultZoomLevel);
   
    
    let center = {lat: clickedMarker.lat, lng: clickedMarker.lng}


    // == Load Google Maps API ==
    const apiIsLoaded = (map, maps) => {
        //set zoom
        var zoom = map.getZoom();
    
         // iterate over markers and call setVisible
        if(zoom <= defaultZoomLevel){
            setIsisCovidDataLoaded(false);
            setmapZoom(false)
        }else{
            setIsisCovidDataLoaded(true);
            setmapZoom(true)
        }

        // Fit map to bounds
        var CornerBounds = map.getBounds();
        setBoundsCallback({northEast:{lat:CornerBounds.getNorthEast().lat(),lng:CornerBounds.getNorthEast().lng()},southWest:{lat:CornerBounds.getSouthWest().lat(),lng:CornerBounds.getSouthWest().lng()}})

        // Add Drag end Listener to map
        map.addListener('dragend', function() {
            var CornerBounds = map.getBounds();
            // set northEast and SouthWest coordinates
            setBoundsCallback({northEast:{lat:CornerBounds.getNorthEast().lat(),lng:CornerBounds.getNorthEast().lng()},southWest:{lat:CornerBounds.getSouthWest().lat(),lng:CornerBounds.getSouthWest().lng()}})
        });

        // Add zoom changed Listener to map
        map.addListener('zoom_changed', function() {

            var zoom = map.getZoom();

            // iterate over markers and call setVisible
            if(zoom <= defaultZoomLevel){
                setIsisCovidDataLoaded(false);
                setmapZoom(false)
            }else{
                setIsisCovidDataLoaded(true);
                setmapZoom(true)
            }

            //Get bounds
            var CornerBounds = map.getBounds();
            // set northEast and SouthWest coordinates
            setBoundsCallback({northEast:{lat:CornerBounds.getNorthEast().lat(),lng:CornerBounds.getNorthEast().lng()},southWest:{lat:CornerBounds.getSouthWest().lat(),lng:CornerBounds.getSouthWest().lng()}})
        });
    };

    // == Callbacks ==
    const setBoundsCallback = useCallback((newValue) => {
        setBounds({ ...bounds, value: newValue })
    }, [bounds]) 

    const setCovidMarkersCallback = useCallback((newValue) => {
        setCovidMarkers({ ...covidMarkers, value: newValue })
    }, [covidMarkers]) 

    // == Use Effects ==

    useEffect(() => {
        axios.get( `http://localhost:3000/api/covid/area/${bounds.value.northEast.lat}/${bounds.value.northEast.lng}/${bounds.value.southWest.lat}/${bounds.value.southWest.lng}`)
        .then(res => {
            setCovidMarkersCallback(res.data)

            if(mapZoom){
                setIsisCovidDataLoaded(true);
                
            }else{
                setIsisCovidDataLoaded(false);
            }
        })
    },[bounds]);    
    
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
            <Marker2
                lat={m.lat}
                lng={m.lng}
                text={m.title}
            />
            )}
        {isCovidDataLoaded?covidMarkers.value.map(covidMarker => covidMarker.region.cities.map(city=> (
                <Marker2
            lat={city.lat}
            lng={city.long}
            name={city.name}
            confirmed={city.confirmed}
            />))):  <Marker2
            lat={34}
            lng={-121}
            text={"sdsdsd"}
        />}
            
        </GoogleMapReact>

        </div>
    );
}

export default SimpleMap2;
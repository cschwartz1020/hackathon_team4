import React, { useEffect, useState } from "react"
import axios from 'axios';

import SimpleMap from '../../components/simpleMap'
import ProtestCard from '../../components/ProtestCard'
import '../../css/protests.css'

const defaultProtest = [{
    summary: "For this protest we'll be meeting in Munn Park and walking to Charlotte. Bring signs, water, and masks.",
    location: {
        latitude: 43.4528,
        longitude: -110.7393,
        city: "Jackson"
    },
    date: new Date(),
    time: new Date(),
    title: "Protest Against Police Brutality",
    resources: ["masks", "water"],
    id: 1,
}];

const defaultMarker = [{
    lat: 43.4528,
    lng: -110.7393,
    title: "Example marker"
}];

const Protests = () => {
    useEffect(() => {
        axios.get('http://localhost:3000/api/protests/')
        .then(res => {
            setProtests(res.data)
            let tempMarkers = [];
            for (const m of res.data) {
                tempMarkers.push({
                    lat: m.location.latitude,
                    lng: m.location.longitude,
                    title: m.title
                })
            }
            setMarkers(tempMarkers)
        })
    }, [])

    const [protests, setProtests] = useState(defaultProtest)
    const [protestClicked, setProtestClicked] = useState(protests[0])
    const [markers, setMarkers] = useState(defaultMarker)

    console.log('PROTESTS: ', protests)
    console.log(markers)

    const search = (id) => {
        for (var i = 0; i < protests.length; i++) {
            if (protests[i].id === id) {
                return protests[i];
            }
        }
    }

    const onCardClick = (id) => {
        setProtestClicked(search(id))
    }

    return (
        <div className="protests">
            <div className="row">
                <div className="column"><SimpleMap clickedMarker={{lat: protestClicked.location.latitude, lng: protestClicked.location.longitude, title: protestClicked.title}} markers={markers}/></div>
                <div className="column">
                {protests.map(p => 
                    <div><ProtestCard protest={p} isClicked={protestClicked.id === p.id ? true : false} onCardClick={onCardClick}/></div>
                )}
                </div>
            </div>
        </div>
    )
}

export default Protests
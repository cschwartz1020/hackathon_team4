import React, { useEffect, useState } from "react"
import { Box, Button } from "@chakra-ui/core";

import SimpleMap from '../../components/simpleMap'
import ProtestCard from '../../components/ProtestCard'
import '../../css/protests.css'

const protests = [
    {
        description: "For this protest we'll be meeting in Munn Park and walking to Charlotte. Bring signs, water, and masks.",
        startLoc: "Lakeland",
        endLoc: "Charlotte",
        date: new Date(),
        time: "8:05am",
        title: "Protest Against Police Brutality",
        resources: ["masks", "water"],
        id: 0
    },
    {
        description: "This is another really great protest you should attend. Like it's gonna be great. We have 100+ people signed up already. Awesome.",
        startLoc: "Lakeland",
        endLoc: "Charlotte",
        date: new Date(),
        time: "8:05am",
        title: "Justiceee",
        resources: ["masks", "water"],
        id: 1
    }
];

const Protests = () => {
    const [protestClicked, setProtestClicked] = useState(protests[0])

    const onCardClick = (id) => {
        setProtestClicked(protests[id])
    }

    return (
        <div className="protests">
            <div className="row">
                <div className="column"><SimpleMap/></div>
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
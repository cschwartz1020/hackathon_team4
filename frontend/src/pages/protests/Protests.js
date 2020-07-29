import React, { useEffect, useState, useLayoutEffect } from "react"
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Switch,
    Button,
    useDisclosure,
    Flex,
    FormLabel,
    Text
  } from "@chakra-ui/core";

import SimpleMap from '../../components/simpleMap'
import ProtestCard from '../../components/ProtestCard'
import '../../css/protests.css'

const defaultProtest = [{
    summary: "For this protest we'll be meeting in Munn Park and walking to Charlotte. Bring signs, water, and masks.",
    startLocation: [
        {
            location: {
                latitude: 43.4528,
                longitude: -110.7393,
                city: "Jackson"
            }
        }
    ],
    endLocation: [
        {
            location: {
                latitude: 44.888,
                longitude: -110.7393,
                city: "Jackson"
            }
        }
    ],
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
    const [protestClicked, setProtestClicked] = useState(defaultProtest[0])
    const [userCity, setUserCity] = useState('Jackson')
    const [userCoord, setUserCoord] = useState({ lat: 43.4528, lng: -110.7393})
    const [localProtests, setLocalProtests] = useState(defaultProtest)
    const [protests, setProtests] = useState(defaultProtest)
    const [onlyLocalProtests, setOnlyLocalProtests] = useState(false)

    const getUserCoords = async () => {
        navigator.geolocation.getCurrentPosition(function(position) {
            setUserCoord({ lat: position.coords.latitude, lng: position.coords.longitude})
        });
    }

    const getLocalProtests = async () => {
        let city = '';
        let userLocalProtests = [];

        axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userCoord.lat},${userCoord.lng}&sensor=true&key=${process.env.REACT_APP_API_KEY}`)
          .then(res => {
              let words = res.data.results[0].formatted_address.split(',')
              city = words[1]
              setUserCity(city)

              for (const protest of protests) {
                if (protest.startLocation[0].location.city.trim() === city.trim()) {
                    userLocalProtests.push(protest)
                }
            }
            
            setLocalProtests(userLocalProtests)
        })
    }

    useEffect(() => {
        const getProtests = async () => {
            await axios.get('http://localhost:3000/api/protests/')
            .then(res => {
                setProtests(res.data)
                setProtestClicked(res.data[0])
                let tempMarkers = [];
                for (const m of res.data) {
                    tempMarkers.push({
                        lat: m.startLocation[0].location.latitude,
                        lng: m.startLocation[0].location.longitude,
                        title: m.title
                    })
                }
                setMarkers(tempMarkers)
            })
        }
        
        getProtests()
    }, [])

    useEffect(() => {
        getUserCoords()
    }, [protests])

    useEffect(() => {
        getLocalProtests()
    }, [userCoord])

    const [markers, setMarkers] = useState(defaultMarker)
    const [isOpen, setIsOpen] = useState(false)
    const [protestClickedTime, setProtestClickedTime] = useState('10:00')
    const { onClose } = useDisclosure();

    const search = (id) => {
        for (var i = 0; i < protests.length; i++) {
            if (protests[i]._id === id) {
                return protests[i];
            }
        }
    }

    const onCardClick = (id) => {
        setProtestClicked(search(id))
    }

    const openModal = (time) => {
        setProtestClickedTime(time)
        setIsOpen(true)
    }

    const getResources = () => {
        let temp = '';

        protestClicked.resources.map((r, index) => {
            temp += r
            let c = index === protestClicked.resources.length - 1 ? '' : ', '
            temp += c
        })

        return temp
    }

    console.log(protests)

    return (
        <div className="protests">
            <div className="row">
                <div className="leftcolumn"><SimpleMap clickedMarker={{lat: protestClicked.startLocation[0].location.latitude, lng: protestClicked.startLocation[0].location.longitude, title: protestClicked.title}} markers={markers}/></div>
                <div className="rightcolumn">
                    <Flex justify="center" align="center">
                        <FormLabel htmlFor="protest-type">Local Protests Only</FormLabel>
                        <Switch id="protest-type" size="lg" onChange={() => setOnlyLocalProtests(!onlyLocalProtests)} isChecked={onlyLocalProtests}/>
                    </Flex>
                    { onlyLocalProtests ? 
                        localProtests.map(p => 
                            <div>
                                <ProtestCard protest={p} isClicked={protestClicked._id === p._id ? true : false} onCardClick={onCardClick} openModal={openModal}/>
                            </div>
                        ) : (
                        protests.map(p => 
                            <div>
                                <ProtestCard protest={p} isClicked={protestClicked._id === p._id ? true : false} onCardClick={onCardClick} openModal={openModal}/>
                            </div>
                        ))
                    }
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                    <ModalHeader fontSize="24px">{protestClicked.title}</ModalHeader>
                    <ModalBody>
                        <Text fontSize="18px" fontWeight="bold">Start Location: {protestClicked.startLocation[0].location.city}</Text>
                    </ModalBody>
                    <ModalBody>
                        <Text fontSize="18px" fontWeight="bold">End Location: {protestClicked.endLocation[0].location.city}</Text>
                    </ModalBody>
                    <ModalBody fontSize="16px" fontWeight="bold">
                        When: {protestClickedTime}
                    </ModalBody>
                    <ModalBody>
                        <h2>{protestClicked.summary}</h2>
                    </ModalBody>
                    <ModalBody>
                        <h2>Resources needed: {getResources()}</h2>
                    </ModalBody>
                    <ModalFooter>
                        <Button variantColor="blue" mr={3} onClick={() => setIsOpen(false)}>
                        Close
                        </Button>
                    </ModalFooter>
                    </ModalContent>
                </Modal>
                </div>
            </div>
        </div>
    )
}

export default Protests
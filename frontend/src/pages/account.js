import React, { useState, useEffect } from "react";
import axios from 'axios'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  ButtonGroup,
  Input,
  Box,
  Heading,
  InputGroup,
  InputLeftAddon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Text,
  useDisclosure,
  Spinner
} from "@chakra-ui/core";
import ProtestCard from "../components/ProtestCard";
import { useAuth0 } from "../react-auth0-spa";

const defaultProtest = [
  {
    summary:
      "For this protest we'll be meeting in Munn Park and walking to Charlotte. Bring signs, water, and masks.",
    startLocation: [
      {
        location: {
          latitude: 43.4528,
          longitude: -110.7393,
          city: "Jackson",
        },
      },
    ],
    endLocation: [
      {
        location: {
          latitude: 44.888,
          longitude: -110.7393,
          city: "Jackson",
        },
      },
    ],
    date: new Date(),
    time: new Date(),
    title: "Protest Against Police Brutality",
    resources: ["masks", "water"],
    id: 1,
  },
];

export function Account(props) {
  const [pastProtests, setPastProtests] = useState(defaultProtest);
  const [upcomingProtests, setUpcomingProtests] = useState(defaultProtest);
  const [protests, setProtests] = useState(defaultProtest);
  const [isOpen, setIsOpen] = useState(false);
  const [protestClickedTime, setProtestClickedTime] = useState('10:00');
  const [protestClicked, setProtestClicked] = useState(defaultProtest[0])
  const { user, loading } = useAuth0()
  const { onClose } = useDisclosure();

  useEffect(() => {
    const getUserProtests = async () => {
      // first find the user in the db and save all of their protests they're signed up for
      await axios.get(`http://localhost:3000/api/users/email/${user.email}`)
      .then(res => {
        setProtests(res.data[0].protests)
        setProtestClicked(res.data[0].protests[0])
      })
    }

    if (user) {
      getUserProtests()
    }
  }, [user])

  const searchPast = (id) => {
    for (var i = 0; i < pastProtests.length; i++) {
      if (pastProtests[i]._id === id) {
        return pastProtests[i];
      }
    }
  };

  const searchUpcoming = (id) => {
    for (var i = 0; i < upcomingProtests.length; i++) {
      if (upcomingProtests[i]._id === id) {
        return upcomingProtests[i];
      }
    }
  };

  const onCardClick = (id) => {
    setProtestClicked(search(id))
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

  const openModal = (time) => {
    setProtestClickedTime(time);
    setIsOpen(true);
  };

  const onCardClickPast = (id) => {
    setProtestClicked(searchPast(id));
  };

  const onCardClickUpcoming = (id) => {
    setProtestClicked(searchUpcoming(id));
  };

  if (loading || !user) {
    return <Spinner size="xl"/>;
  }

  return (
    <div>
      <Heading as="h1" size="xl" marginTop="3%">
        Account Info
      </Heading>
      <Box
        margin="auto"
        maxW="xl"
        borderWidth="2px"
        rounded="lg"
        overflow="hidden"
        marginTop="2%"
        marginBottom="5%"
      >
        <InputGroup marginTop="3%" marginBottom="3%" size="md">
          <InputLeftAddon children="username" fontWeight="semibold" />
          <Input isReadOnly={true} value="sharvey" roundedLeft="0" />
        </InputGroup>
        <Box borderWidth="3px" margin="2%">
          <Heading as="h2" size="md" marginBottom="3%">
            My Upcoming Events
          </Heading>
          <div>
            <ProtestCard
              protest={upcomingProtests[0]}
              isClicked={protestClicked._id === upcomingProtests[0]._id ? true : false}
              onCardClick={onCardClickUpcoming}
              openModal={openModal}
            />
          </div>
          <ButtonGroup spacing={4} margin="2%">
            <Button leftIcon="arrow-back" variantColor="teal" variant="solid">
              Prev
            </Button>
            <Button
              rightIcon="arrow-forward"
              variantColor="teal"
              variant="solid"
            >
              Next
            </Button>
          </ButtonGroup>
        </Box>
        <Box borderWidth="3px" margin="2%" marginTop="5%">
          <Heading as="h2" size="md" marginBottom="3%">
            My Past Events
          </Heading>
          <div>
            <ProtestCard
              protest={pastProtests[0]}
              isClicked={protestClicked._id === pastProtests[0]._id ? true : false}
              onCardClick={onCardClickPast}
              openModal={openModal}
            />
          </div>
          <ButtonGroup spacing={4} margin="2%">
            <Button leftIcon="arrow-back" variantColor="teal" variant="solid">
              Prev
            </Button>
            <Button
              rightIcon="arrow-forward"
              variantColor="teal"
              variant="solid"
            >
              Next
            </Button>
          </ButtonGroup>
        </Box>
          <Input isReadOnly="false" value={user.nickname} roundedLeft="0" />
        <Heading as="h2" size="md" marginBottom="3%">
          My Events
        </Heading>
        <div>
        {
          protests.map(p => 
            <ProtestCard
              onAddClick={() => console.log('')}
              protest={p}
              isClicked={protestClicked._id === p._id ? true : false}
              onCardClick={onCardClick}
              openModal={openModal}
              attending={true}
            />
        )}
        </div>
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
      </Box>
    </div>
  );
}
export default Account;

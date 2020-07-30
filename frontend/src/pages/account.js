import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
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
  Text,
  useDisclosure,
  Spinner,
  Avatar,
  FormHelperText,
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
  const [protests, setProtests] = useState(defaultProtest);
  const [isOpen, setIsOpen] = useState(false);
  const [protestClickedTime, setProtestClickedTime] = useState("10:00");
  const [protestClicked, setProtestClicked] = useState(defaultProtest[0]);
  const { user, loading } = useAuth0();
  const { onClose } = useDisclosure();

  useEffect(() => {
    const getUserProtests = async () => {
      // first find the user in the db and save all of their protests they're signed up for
      await axios
        .get(`http://localhost:3000/api/users/email/${user.email}`)
        .then((res) => {
          setProtests(res.data[0].protests);
          setProtestClicked(res.data[0].protests[0]);
        });
    };

    if (user) {
      getUserProtests();
    }
  }, [user]);

  const search = (id) => {
    for (var i = 0; i < protests.length; i++) {
      if (protests[i]._id === id) {
        return protests[i];
      }
    }
  };

  const onCardClick = (id) => {
    setProtestClicked(search(id));
  };

  const getResources = () => {
    let temp = "";

    protestClicked.resources.map((r, index) => {
      temp += r;
      let c = index === protestClicked.resources.length - 1 ? "" : ", ";
      temp += c;
    });

    return temp;
  };

  const openModal = (time) => {
    setProtestClickedTime(time);
    setIsOpen(true);
  };

  if (loading || !user) {
    return <Spinner size="xl" />;
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
      >
        <Heading as="h2" size="md" margin="3%">
          My Info
        </Heading>
        <Avatar name="userpicture" src={user.picture} size="xl" />
        <InputGroup margin="2%" size="sm">
          <InputLeftAddon children="name" fontWeight="semibold" />
          <Input
            isReadOnly={true}
            value={user.given_name + " " + user.family_name}
            roundedLeft="0"
          />
        </InputGroup>
        <InputGroup margin="2%" size="sm">
          <InputLeftAddon children="username" fontWeight="semibold" />
          <Input isReadOnly={true} value={user.nickname} roundedLeft="0" />
        </InputGroup>
        <InputGroup margin="2%" size="sm">
          <InputLeftAddon children="email" fontWeight="semibold" />
          <Input isReadOnly={true} value={user.email} roundedLeft="0" />
        </InputGroup>
        <FormHelperText id="email-helper-text" marginBottom="1%">
          Your information will never be shared <span role="img">🤫</span>
        </FormHelperText>
      </Box>
      <Box
        margin="auto"
        maxW="xl"
        borderWidth="2px"
        rounded="lg"
        overflow="hidden"
        marginTop="2%"
      >
        <Heading as="h2" size="md" margin="3%">
          My Events
        </Heading>
        {
          protests.length > 0 ? 
          <>
          <div>
          {protests.map((p) => (
            <Box borderWidth="3px" margin="2%" rounded="lg">
              <ProtestCard
                onAddClick={() => console.log("")}
                protest={p}
                isClicked={protestClicked._id === p._id ? true : false}
                onCardClick={onCardClick}
                openModal={openModal}
                attending={true}
              />
            </Box>
          ))}
        </div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize="24px">{protestClicked.title}</ModalHeader>
            <ModalBody>
              <Text fontSize="18px" fontWeight="bold">
                Start Location: {protestClicked.startLocation[0].location.city}
              </Text>
            </ModalBody>
            <ModalBody>
              <Text fontSize="18px" fontWeight="bold">
                End Location: {protestClicked.endLocation[0].location.city}
              </Text>
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
              <Button
                variantColor="blue"
                mr={3}
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal> 
        </>
        : <h1>You haven't signed up for any protests!</h1>
      }
      </Box>
    </div>
  );
}
export default Account;

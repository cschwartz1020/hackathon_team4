import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  ButtonGroup,
  Input,
  Box,
  Checkbox,
  CheckboxGroup,
  Heading,
  InputRightElement,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/core";
import ProtestCard from "../components/ProtestCard";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

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
  const [protestClicked, setProtestClicked] = useState(defaultProtest[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [protestClickedTime, setProtestClickedTime] = useState("10:00");

  const columns = [
    {
      dataField: "Event Title",
      text: "Event Title",
      sort: true,
      filter: textFilter(),
    },
    {
      dataField: "Location",
      text: "Location",
      sort: true,
    },
    {
      dataField: "Date",
      text: "Date",
      sort: true,
    },
    {
      dataField: "Time",
      text: "Time",
      //formatter: this.linkDelete,
      sort: true,
    },
  ];

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

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {};
    console.log(data);
    fetch("http://localhost:3000/api/protests", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

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
      </Box>
    </div>
  );
}
export default Account;

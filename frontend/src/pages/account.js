import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
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

export function Account(props) {
  const [protests, setProtests] = useState(defaultProtest);
  const [protestClicked, setProtestClicked] = useState(defaultProtest[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [protestClickedTime, setProtestClickedTime] = useState('10:00');


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

  const search = (id) => {
    for (var i = 0; i < protests.length; i++) {
        if (protests[i]._id === id) {
            return protests[i];
        }
    }
  };

  const openModal = (time) => {
    setProtestClickedTime(time)
    setIsOpen(true)
    };

  const onCardClick = (id) => {
    setProtestClicked(search(id))
  }

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
          <Input isReadOnly="false" value="sharvey" roundedLeft="0" />
        </InputGroup>
        <Heading as="h2" size="md" marginBottom="3%">
          My Past Events
        </Heading>
        <div>
          <ProtestCard
            protest={protests[0]} isClicked={false} 
            //isClicked={protestClicked._id === p._id ? true : false}
            onCardClick={onCardClick}
            openModal={openModal}
          />
        </div>
      </Box>
    </div>
  );
}
export default Account;

import React, { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Button,
  Input,
  Box,
  Checkbox,
  CheckboxGroup,
  Heading,
  InputRightElement,
  InputGroup,
  useToast,
} from "@chakra-ui/core";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import DateTimePicker from "react-datetime-picker";

export function CreateProtest(props) {
  const [title, setTitle] = useState(undefined);
  const [desc, setDesc] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [finalLocation, setFinalLocation] = useState("");
  const [startLocationObj, setStartLocationObj] = useState(undefined);
  const [finalLocationObj, setFinalLocationObj] = useState(undefined);
  const [newResource, setNewResource] = useState(undefined);
  const [resources, setResources] = useState(["face masks", "water bottles"]);
  const [datetime, setDateTime] = useState(new Date());
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title) {
      toast({
        position: "top",
        title: "Required Field.",
        description: "'Event Title' is a required field.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else if (!startLocation) {
      toast({
        position: "top",
        title: "Required Field.",
        description: "'Start Location' is a required field.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else if (!finalLocation) {
      toast({
        position: "top",
        title: "Required Field.",
        description: "'Final Location' is a required field.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const datetimeStr = getDatetimeStr(datetime);
    const data = {
      time: datetimeStr,
      startLocation: {
        location: startLocationObj,
      },
      endLocation: {
        location: finalLocationObj,
      },
      title: title,
      summary: desc,
      resources: resources,
    };
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:3000/api/protests",
        data: data,
      });
      console.log("👉 Returned data:", response);
      alert('Your protest has been registered!')
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  };

  const handleStartSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setStartLocation(value);
    setStartLocationObj({
      country: results[0].address_components[5].long_name,
      city: results[0].address_components[2].long_name,
      latitude: latLng.lat,
      longitude: latLng.lng,
      subdivision: results[0].address_components[4].long_name,
    });
  };

  const handleFinalSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setFinalLocation(value);
    setFinalLocationObj({
      country: results[0].address_components[5].long_name,
      city: results[0].address_components[2].long_name,
      latitude: latLng.lat,
      longitude: latLng.lng,
      subdivision: results[0].address_components[4].long_name,
    });
  };

  /*const printMessage = (event) => {
    console.log({
      time: datetime,
      startLocation: {
        location: startLocationObj,
      },
      endLocation: {
        location: finalLocationObj,
      },
      title: title,
      summary: desc,
      resources: resources,
    });
  };*/

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescChange = (event) => {
    setDesc(event.target.value);
  };

  const getDatetimeStr = (datetime) => {
    const date = datetime;
    const dateTimeFormat = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const [
      { value: month },
      ,
      { value: day },
      ,
      { value: year },
      ,
      { value: hour },
      ,
      { value: minute },
      ,
      { value: second },
    ] = dateTimeFormat.formatToParts(date);
    const datetimeStr = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return datetimeStr;
  };

  const handleDateTimeChange = (datetime) => {
    setDateTime(datetime);
  };

  const handleStartLocationChange = (value) => {
    setStartLocation(value);
  };

  const handleFinalLocationChange = (value) => {
    setFinalLocation(value);
  };

  const handleResourceChange = (value) => {
    setResources(value);
  };

  const handleNewResourceChange = (event) => {
    setNewResource(event.target.value);
  };

  const handleNewResourceClick = () => {
    const oldResources = resources;
    oldResources.push(newResource);
    setResources(oldResources);
    setNewResource(undefined);
  };

  const makeCheckboxItems = () => {
    var resourcesList = resources.map((item) => {
      return (
        <Checkbox isChecked="true" value={item}>
          {item}
        </Checkbox>
      );
    });
    return resourcesList;
  };

  const getLocationDiv = (
    placeholder,
    setterMethod,
    initialValue,
    selecterMethod
  ) => {
    return (
      <PlacesAutocomplete
        value={initialValue}
        onChange={setterMethod}
        onSelect={selecterMethod}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              {...getInputProps({
                placeholder: placeholder,
                focusBorderColor: "teal.400",
              })}
            />
            {loading ? <div>...loading</div> : null}
            {suggestions.map((suggestion) => {
              const style = {
                backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
              };
              return (
                <div {...getSuggestionItemProps(suggestion, { style })}>
                  {suggestion.description}
                </div>
              );
            })}
          </div>
        )}
      </PlacesAutocomplete>
    );
  };

  return (
    <div>
      <Heading as="h1" size="xl" marginTop="3%">
        Register Your Event
      </Heading>
      <Heading as="h1" size="md">
        ✊🏿✊🏾✊🏽✊🏼✊🏻
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
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormLabel isRequired htmlFor="eventtitle" marginTop="3%">
              Event title
            </FormLabel>
            <Input
              focusBorderColor="teal.400"
              id="eventtitle"
              placeholder="Enter event title"
              onChange={handleTitleChange}
            />
            <FormLabel htmlFor="description" marginTop="3%">
              Description
            </FormLabel>
            <Input
              focusBorderColor="teal.400"
              id="description"
              placeholder="Enter a description of your event (optional)"
              onChange={handleDescChange}
            />
            <div>
              <FormLabel isRequired htmlFor="datetime" marginTop="3%">
                Date and Time
              </FormLabel>
              <div>
                <DateTimePicker
                  onChange={handleDateTimeChange}
                  value={datetime}
                />
              </div>
            </div>
            <FormLabel isRequired htmlFor="startlocation" marginTop="3%">
              Start Location
            </FormLabel>
            {getLocationDiv(
              "Enter start location",
              handleStartLocationChange,
              startLocation,
              handleStartSelect
            )}
            <FormLabel isRequired htmlFor="endlocation" marginTop="3%">
              Final Location
            </FormLabel>
            {getLocationDiv(
              "Enter final location",
              handleFinalLocationChange,
              finalLocation,
              handleFinalSelect
            )}
            <FormLabel htmlFor="resources" marginTop="3%">
              Resources
            </FormLabel>
            <CheckboxGroup
              onChange={handleResourceChange}
              variantColor="blue"
              defaultValue={["face masks", "water bottles"]}
            >
              {makeCheckboxItems()}
            </CheckboxGroup>
            <InputGroup marginTop="3%" size="md">
              <Input
                focusBorderColor="teal.400"
                id="addresource"
                placeholder="Add resource"
                onChange={handleNewResourceChange}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="md"
                  variantColor="teal"
                  onClick={handleNewResourceClick}
                >
                  Add
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Button
            mt={4}
            variantColor="teal"
            isLoading={props.isSubmitting}
            type="submit"
            marginBottom="3%"
          >
            Submit
          </Button>
        </form>
      </Box>
    </div>
  );
}
export default CreateProtest;

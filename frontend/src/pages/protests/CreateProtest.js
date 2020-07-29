import React, { useState } from "react";
import axios from "axios";
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
  List,
  ListItem,
  ListIcon,
  InputRightElement,
  InputGroup,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title) {
      alert("'Title' is a required field.");
      return;
    } else if (!startLocation) {
      alert("'Start Location' is a required field.");
      return;
    } else if (!finalLocation) {
      alert("'Final Location' is a required field.");
      return;
    }
    const data = {
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
    };
    try {
      const response = axios({
        method: "post",
        url: "http://localhost:3000/api/protests",
        data: data,
      });
      console.log('👉 Returned data:',response);
    } catch (e) {
      console.log(`😱 Axios request failed: ${e}`);
    }
  };

  const handleStartSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    console.log(results);
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

  const printMessage = (event) => {
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
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescChange = (event) => {
    setDesc(event.target.value);
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
            <InputGroup size="md">
              <Input
                focusBorderColor="teal.400"
                id="addresource"
                placeholder="Resource"
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

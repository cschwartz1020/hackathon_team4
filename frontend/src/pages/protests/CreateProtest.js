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
} from "@chakra-ui/core";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import DateTimePicker from "react-datetime-picker";

export function CreateProtest(props) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [finalLocation, setFinalLocation] = useState("");
  const [startLocationObj, setStartLocationObj] = useState(undefined);
  const [finalLocationObj, setFinalLocationObj] = useState(undefined);
  const [resource, setResource] = useState(["face masks, water bottles"]);
  const [datetime, setDateTime] = useState(new Date());

  /*const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
    const cmdData = this.state.command;
    const bodData = this.state.body;
    const typData = this.state.type;
    console.log("sending data to backend");
    const data = { "Command": cmdData, "Body": bodData, "Type":typData }
    console.log(data);
    fetch('https://h6d3rqs549.execute-api.us-west-1.amazonaws.com/TestProd/addcommand', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    alert("Your comamand '"+this.state.command+"' was added!");
  }*/

  const handleSubmit = (event) => {
    event.preventDefault();
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
      resources: ["mask", "water bottle"],
    };
    console.log(data);
    fetch(
      "http://localhost:3000/api/protests",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
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
      resources: ["mask", "water bottle"],
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

  const handleStartLocationChange = (event) => {
    setStartLocation(event);
  };

  const handleFinalLocationChange = (event) => {
    setFinalLocation(event);
  };

  const handleResourceChange = (event) => {
    setResource(event.target.value);
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
              variantColor="green"
              defaultValue={["face masks", "water bottles"]}
              isInline="true"
            >
              <Checkbox value="face masks">face masks</Checkbox>
              <Checkbox value="water bottles">water bottles</Checkbox>
              <Checkbox value="snacks">snacks</Checkbox>
              <Checkbox value="protest signs">protest signs</Checkbox>
              <Checkbox value="other">other</Checkbox>
            </CheckboxGroup>
          </FormControl>
          <Button
            mt={4}
            variantColor="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
          <Button mt={4} variantColor="teal" onClick={printMessage}>
            Print
          </Button>
        </form>
      </Box>
    </div>
  );
  /*return (
      <React.Fragment>
      <div classTitle="containerx">
	<h1 style={{ marginTop: "20px" }}>Add Commands</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group classTitle="command">
            <Form.Label htmlFor="command">Enter Command: </Form.Label>
            <Form.Control id="command" title="command" placeholder="Command" type="text" onChange={this.handleCmdChange} value={this.state.command} />
          </Form.Group>
          <Form.Group classTitle="body">
            <Form.Label htmlFor="body">Enter Body: </Form.Label>
            <Form.Control id="body" title="body" placeholder="Body" type="text" onChange={this.handleBodChange} value={this.state.body} />
          </Form.Group>
          <Form.Group controlId="typeDropdown">
    	    <Form.Label>Choose Type:</Form.Label>
    	    <Form.Control as="select" onChange={this.handleTypChange} value={this.state.type}>
              <option>endpoint</option>
              <option>string</option>
            </Form.Control>
          </Form.Group> 
	  <Button variant="primary" type="submit">Submit!</Button>
        </Form>
      </div>
      </React.Fragment>
    );*/
}
export default CreateProtest;

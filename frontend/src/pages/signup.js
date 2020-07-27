import React from 'react';
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/core";

  
const Signup = props => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
      <React.Fragment>
        <h1>Sign up</h1>
      </React.Fragment>
  );
};
  
  export default Signup;

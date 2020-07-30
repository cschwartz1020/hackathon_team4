import React from "react";
import "../css/navbar.css";
import { Box, Heading, Flex, Text, Button, PseudoBox } from "@chakra-ui/core";
import { Link } from "react-router-dom";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

// Note: This code could be better, so I'd recommend you to understand how I solved and you could write yours better :)
const Navbar = (props) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <React.Fragment>
      <Flex
        className="navagation-b"
        as="nav"
        align="center"
        justify="space-between"
        wrap="wrap"
        padding="1.5rem"
        bg="#15202B"
        color="white"
        {...props}
      >
        <Flex align="center" mr={5}>
          <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
            Protestr
          </Heading>
        </Flex>

        <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
          <svg
            className="hamburger"
            fill="white"
            width="22px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>

        <Box
          display={{ sm: show ? "block" : "none", md: "flex" }}
          width={{ sm: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
        >
          <Link to="/">
            <MenuItems>Home</MenuItems>
          </Link>
          <Link to="/registration">
            <MenuItems>Create</MenuItems>
          </Link>
          <Link to="/view">
            <MenuItems>View</MenuItems>
          </Link>
          <Link to="/feed">
            <MenuItems>Feed</MenuItems>
          </Link>
        </Box>

        <Box
          display={{ sm: show ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          <Link to="/account">
            <Button
              bg="transparent"
              border="1px"
              _hover={{ bg: "#008B8B" }}
              _active={{
                transform: "scale(0.98)",
                borderColor: "teal",
              }}
            >
              Account
            </Button>
          </Link>
        </Box>
      </Flex>
      <div className="v-spacer" />
    </React.Fragment>
  );
};

export default Navbar;

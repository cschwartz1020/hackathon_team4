import React from "react";
import { Button } from "@chakra-ui/core";
import { useAuth0 } from "../react-auth0-spa";

import protestr from '../images/protestr.png'

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  
  return (
    <div style={{ backgroundColor: 'white', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <img src={protestr} height='300' width='300'/>
        <Button
          onClick={() => loginWithRedirect({})}
          variantColor="blue"
        >
          Log in
        </Button>
    </div>
  );
};

export default Login;

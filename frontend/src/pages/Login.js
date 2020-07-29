import React from "react";
import { Button } from "@chakra-ui/core";
import { useAuth0 } from "../react-auth0-spa";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  
  return (
    <div className="home-pg">
      <div className="content">        
        <Button
          onClick={() => loginWithRedirect({})}
        >
          Log in
        </Button>
      </div>
    </div>
  );
};

export default Login;

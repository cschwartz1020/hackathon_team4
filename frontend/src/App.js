import React from 'react';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar"
import './App.css';
import Protests from './pages/protests/Protests';
import CreateProtest from './pages/protests/CreateProtest';
import Feed from "./pages/feed"
import Home from "./pages/home"
import PrivateRoute from './components/PrivateRoute'
import history from "./utils/history";
import Login from './pages/Login';
import { useAuth0 } from "./react-auth0-spa";

function App() {
    const { user, loading, isAuthenticated } = useAuth0();

    console.log('the user is: ', user)
  return (
    <div className="App">
      <ThemeProvider>
        <CSSReset />
            <Router history={history}>
                {isAuthenticated ? <Navbar></Navbar> : null}
                <Switch>
                    {/* Main route */}
                    {/* exact means this is the first page to load */}
                    <Route exact path="/">
                        {/* <SimpleMap/> */}
                        <Login />
                    </Route>
                    <PrivateRoute exact path="/home">
                        {/* <SimpleMap/> */}
                        <Home />
                    </PrivateRoute>
                    {/* Follow the same structure as above to show your page */}
                    <PrivateRoute path="/signup">
                    {/* Replace H1 with component */}
                        <h1>Hi this is a route</h1>
                    </PrivateRoute>
                    <PrivateRoute path="/registration">
                        <CreateProtest/>
                    </PrivateRoute>
                    <PrivateRoute path="/view">
                        <Protests/>
                    </PrivateRoute>
                    <PrivateRoute path="/feed">
                        <Feed></Feed>
                    </PrivateRoute>
                    <PrivateRoute path="*" exact={true}  ><h1>helloo</h1></PrivateRoute>
                </Switch>
            </Router>
        </ThemeProvider>
    </div>
  );
}

export default App;

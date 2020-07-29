import React from 'react';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar"
import './App.css';
import Protests from './pages/protests/Protests';
import CreateProtest from './pages/protests/CreateProtest';
import Signup from './pages/protests/Signup';
import Feed from "./pages/feed"
import Home from "./pages/home"

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <CSSReset />
            <Router>
                <Navbar></Navbar>
                <Switch>
                    {/* Main route */}
                    {/* exact means this is the first page to load */}
                    <Route exact path="/">
                        {/* <SimpleMap/> */}
                        <Home />
                    </Route>
                    {/* Follow the same structure as above to show your page */}
                    <Route path="/signup">
                    {/* Replace H1 with component */}
                        <Signup/>
                    </Route>
                    <Route path="/registration">
                        <CreateProtest/>
                    </Route>
                    <Route path="/view">
                        <Protests/>
                    </Route>
                    <Route path="/feed">
                        <Feed></Feed>
                    </Route>
                    <Route path="*" exact={true}  ><h1>helloo</h1></Route>
                </Switch>
            </Router>
        </ThemeProvider>
    </div>
  );
}

export default App;

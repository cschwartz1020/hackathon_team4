import React from 'react';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar"
import './App.css';
import Protests from './pages/protests/Protests'

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
                        <h1>main route</h1>
                    </Route>
                    {/* Follow the same structure as above to show your page */}
                    <Route path="/signup">
                    {/* Replace H1 with component */}
                        <h1>Hi this is a route</h1>
                    </Route>
                    <Route path="/register">
                        <h1>Hi this is the officials route, place component here </h1>
                    </Route>
                    <Route path="/view">
                        <Protests/>
                    </Route>
                    <Route path="*" exact={true}  ><h1>helloo</h1></Route>
                </Switch>
            </Router>
        </ThemeProvider>
    </div>
  );
}

export default App;

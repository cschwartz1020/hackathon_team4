import React from 'react';
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar"
import './App.css';
import Protests from './pages/protests/Protests';
import CreateProtest from './pages/protests/CreateProtest';
import Feed from "./pages/feed"
import Home from "./pages/home"
import Account from "./pages/account"
import PrivateRoute from './components/PrivateRoute'
import history from "./utils/history";
import Login from './pages/Login';
import { useAuth0 } from "./react-auth0-spa";

function App() {
    const { user, loading, isAuthenticated } = useAuth0();

    // console.log('the user is: ', user)
  return (
    <div className="App">
      <ThemeProvider>
        <CSSReset />
            <Router history={history}>
                {isAuthenticated ? <Navbar></Navbar> : null}
                <Switch>
                    {/* Main route */}
                    {/* exact means this is the first page to load */}
                    {!isAuthenticated ? <Route path="/" exact component={Login}/> : <PrivateRoute exact path="/" component={Home}/>}
                    <PrivateRoute exact path="/home" component={Home}/>
                    <PrivateRoute path="/registration" component={CreateProtest}/>
                    <PrivateRoute path="/view" component={Protests}/>
                    <PrivateRoute path="/feed" component={Feed}/>
                    <PrivateRoute path="/account" component={Account}/>
                    <PrivateRoute path="*" exact={true}><h1>helloo</h1></PrivateRoute>
                </Switch>
            </Router>
        </ThemeProvider>
    </div>
  );
}

export default App;

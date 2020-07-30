import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
import styled from "styled-components";
import Protest from "../images/protest.jpg";

const Styles = styled.div`
  .jumbotron {
    background: url(${Protest});
    height: 100vh;
    width: 100vw;
    background-size: cover;
    text-align: top;
    color: #808080;
  }
  .div {
    color: white;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  }
  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: grey;
    color: white;
    text-align: center;
  }
`;

const About = () => {
  return (
    <Styles>
      <Jumbotron>
        <div className="div">
          <h1>Description</h1>
          <font size="5">
            <p align="justify">
              To create a protest event in your area click on the 'Create' tab.
              If you'd like to view protests in your area, click on the 'View'
              tab. Additionally, you can view cases of COVID-19 in your area
              from this tab as well.
            </p>
          </font>

          <div>
            <font size="5">
              Click{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://documenter.getpostman.com/view/11679659/T1DsAvpQ"
              >
                here
              </a>{" "}
              for API Documentation
            </font>
          </div>
        </div>
      </Jumbotron>
    </Styles>
  );
};

export default About;

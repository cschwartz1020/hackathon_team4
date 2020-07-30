import React from 'react';
import header from "../images/header.png"
import "../css/covid-legend.css"


const MarkerLegend = (props) => {
   
    return (
      <React.Fragment>
           <div className="legend-container">
                        <img src={header} alt="header" />
                        <div className="covid-container-data">
                            <h1>Check Covid Cases in map!</h1>
                            <div className="flex-row">
                                <div className="marker-legend" style={{backgroundColor: "red"}}></div> 
                                <p>Confirmed cases, 300 or higher</p>
                            </div>
                            <div className="flex-row">
                                <div className="marker-legend" style={{backgroundColor: "yellow"}}></div> 
                                <p>Confirmed cases, 300 or lower</p>
                            </div>
                            <div className="flex-row">
                                <div className="marker-legend" style={{backgroundColor: "green"}}></div> 
                                <p>Confirmed cases, 100 or lower</p>
                            </div> 
                            <h4>To see covid confirmed cases markers, zoom the map!</h4>
                        </div>
                    </div>
  
      </React.Fragment>
    );
  };

  export default MarkerLegend;
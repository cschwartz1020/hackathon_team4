import React from 'react';
import "../css/marker2.css"

const Marker = (props) => {
    const {  name ,confirmed} = props;

function covidColordetector(confirmedNumber) {
  if(confirmedNumber <100){
     return "green";
  }else {
    if(confirmedNumber <300)
    {
      return "yellow";
    }else{
      return "red";
    }
  }

}

    return (
      <React.Fragment>
        <div className="marker-container">
      <div className="marker"
        style={{ backgroundColor: covidColordetector(confirmed), cursor:"pointer" }}
        title={name}
      />
      <div className="tool-tip">
        <h3 style={{margin:"5px 0 3px",fontWeight:"600"}}> {name}</h3>
        <h3>Confirmed cases: </h3>
        <span style={{color:"rgb(0, 183, 255)",fontWeight:"600"}}>{confirmed}</span>
      </div>
      </div>
      </React.Fragment>
    );
  };

  export default Marker;
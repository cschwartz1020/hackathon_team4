import React from 'react';
import "../css/marker.css"
import protestLogo from "../images/protestlogo.png"

const Marker = (props) => {
    const { color, name, location } = props;
    return (
      <div className="marker-container-protest">
      <img className="marker-icon"
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
        src={protestLogo}
        alt="protest logo"
      />
       <div className="tool-tip2">
        <h3 style={{margin:"5px 0 10px",fontWeight:"600"}}> {name}</h3>
        <h3>Location: </h3>
        <span style={{color:"rgb(0, 183, 255)",fontWeight:"600"}}>sd</span>
      </div>
      </div>
    );
  };

  export default Marker;
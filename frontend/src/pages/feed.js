import React, { useEffect, useState } from "react"
import "../css/feed.css"
import pump from "../images/pumpkin.jpg";
import SimpleMap from "../components/simpleMap"

const array = [1, 2, 3, 4, 5, 6, 7, 8];
const protests = [
    {
        description: "For this protest we'll be meeting in Munn Park and walking to Charlotte. Bring signs, water, and masks.",
        startLoc: "Lakeland",
        endLoc: "Charlotte",
        date: new Date(),
        lat: 34.155834,
        lng: -119.202789,
        time: "8:05am",
        title: "Protest Against Police Brutality",
        resources: ["masks", "water"],
        id: 0,
    },

];


const Feed = props => {
    const [protestClicked, setProtestClicked] = useState(protests[0])

    const onCardClick = (id) => {
        setProtestClicked(protests[id])
    }

  return (
      <React.Fragment>
        <div className="main">
        <div className="sec-1">
          {array.map((item) => (
            <div className="news-card" key={item}>
              <div className="left-card-side">
                <span className="card-head">NEWS</span>
                <div className="card-desc">
                  <h3>
                    John Lewis is first Black lawmaker to lie in state in US
                    Capitol Rotunda
                  </h3>
                </div>
                <h3>Protest in Alaska</h3>
                <h4>Posted by Anom1234</h4>
              </div>
              <div className="right-card-side">
                <img className="news-card-img" src={pump} alt="news" />
              </div>
            </div>
          ))}
        </div>
        <div className="sec-2">
        <SimpleMap clickedProtest={protestClicked} protests={protests}/>
        </div>
      </div>
      </React.Fragment>
  );
};
  
  export default Feed;
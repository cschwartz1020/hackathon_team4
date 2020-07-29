import React, { useEffect, useState } from "react"
import axios from 'axios';
import "../css/feed.css"
import SimpleMap from "../components/simpleMap"



const protests = [
    {
        description: "For this protest we'll be meeting in Munn Park and walking to Charlotte. Bring signs, water, and masks.",
        startLoc: "Lakeland",
        endLoc: "Charlotte",
        date: new Date(),
        lat: 34.155834,
        lng:  -119.202789,
        time: "8:05am",
        title: "Protest Against Police Brutality",
        resources: ["masks", "water"],
        id: 0,
    },

];

const defaultMarker = {
    lat: 34.155834,
    lng:  -119.202789,
    title: "Example marker"
};

let toggle = false;

const Feed = props => {

  const [newsData, setNewsData] = useState({});

  useEffect(() => {
    getNews();
  }, [])
  
  const getNews = () => {
    axios
      .get("http://localhost:3000/api/article/35")
         .then(response =>{
            setNewsData(response.data);
            console.log(response);
         })
  }

  const  newsItems = Object.entries(newsData).map(([item, value])  =>  {
    return (
      <a href={value.url}>
      <div className="news-card" key={item}>
      <div className="left-card-side">
        <span className="card-head">{value.title}</span>
        <div className="card-desc">
          <p>
            {value.description
            }
          </p>
        </div>
        <h3>{value.source.name}</h3>
        <h4>By: {(value.author) ? value.author : value.source.name}</h4>
      </div>
      <div className="right-card-side">
        <img className="news-card-img" src={value.urlToImage} alt="" />
      </div>
    </div>
    </a>
    );
});

  return (
      <React.Fragment>
        <div className="main">
        <div className="sec-1">     
          {(toggle) ? null : newsItems}     
        </div>
        <div className="sec-2">

        </div>
      </div>
      </React.Fragment>
  );
};
  
  export default Feed;

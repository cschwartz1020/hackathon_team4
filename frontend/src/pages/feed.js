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
    fetch('https://newsapi.org/v2/everything?q=protest&apiKey=0abc4b1e9c434c94878ff9fb1d4357f9')
          .then(response => response.json())
          .then(articles => {
            //console.log(articles.articles[0]);
            setNewsData(articles.articles);
          }).catch(error => console.log(error));
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

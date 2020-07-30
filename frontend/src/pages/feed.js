import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/feed.css";
import SimpleMap from "../components/simpleMap";
import { useAuth0 } from "../react-auth0-spa";

const protests = [
  {
    description:
      "For this protest we'll be meeting in Munn Park and walking to Charlotte. Bring signs, water, and masks.",
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

const defaultMarker = {
  lat: 34.155834,
  lng: -119.202789,
  title: "Example marker",
};

let toggle = false;

const Feed = (props) => {
  const { user, getTokenSilently } = useAuth0();
  const [newsData, setNewsData] = useState({});
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    const getToken = async () => {
      try {
        const accessToken = await getTokenSilently({
          audience: `development-protestr-api`,
        });
        setToken(accessToken);
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      getNews();
    }
  }, [token]);

  console.log(token)

  const getNews = () => {
    axios
      .get("http://localhost:3000/api/article/35", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setNewsData(response.data);
        console.log(response);
      });
  };

  const addUser = async () => {
    console.log(`addUser ${token}`);
    await axios
      .post(
        "http://localhost:3000/api/users",
        {
          firstName: user.given_name,
          lastName: user.family_name,
          email: user.email,
          protests: [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("Added user to DB");
      });
  };

  const checkForUser = async () => {
    let userInDB = false;

    await axios
      .get("http://localhost:3000/api/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        for (const p of res.data) {
          if (p.email === user.email) {
            userInDB = true;
          }
        }
      })
      .then(() => {
        if (!userInDB) {
          console.log("going to add the user now :) ");
          addUser();
        }
      });
  };

  useEffect(() => {
    // first check to see if they're in the DB
    // then add them if they're not

    if (user && token) {
      checkForUser();
    }
  }, [user, token]);

  const newsItems = Object.entries(newsData).map(([item, value]) => {
    return (
      <a href={value.url}>
        <div className="news-card" key={item}>
          <div className="left-card-side">
            <span className="card-head">{value.title}</span>
            <div className="card-desc">
              <p>{value.description}</p>
            </div>
            <h3>{value.source.name}</h3>
            <h4>By: {value.author ? value.author : value.source.name}</h4>
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
        <div className="sec-1">{toggle ? null : newsItems}</div>
        <div className="sec-2"></div>
      </div>
    </React.Fragment>
  );
};

export default Feed;

import React, {useEffect} from "react"
import "../css/home.css"
import SimpleMap2 from "../components/simpleMap2"
import axios from 'axios'
import { useAuth0 } from "../react-auth0-spa";


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


const Feed = props => {
  const { user } = useAuth0()

  const addUser = async () => {
    await axios.post('http://localhost:3000/api/users', {
      firstName: user.given_name,
      lastName: user.family_name,
      email: user.email,
      protests: []
    }).then(res => {
      console.log('Added user to DB')
    })
  }

  const checkForUser = async () => {
    let userInDB = false

    await axios.get('http://localhost:3000/api/users/')
    .then(res => {
      console.log(res)
      for (const p of res.data) {
        if (p.email === user.email) {
          userInDB = true
        }
      }
    })
    .then(() => {
      if (!userInDB) {
        console.log('going to add the user now :) ')
        addUser()
      }
    })
  }

  useEffect(() => {
    // first check to see if they're in the DB
    // then add them if they're not

    if (user) {
      checkForUser()
    }

  }, [user])

  return (
      <React.Fragment>
       <div className="mainx">
        <SimpleMap2 clickedMarker={defaultMarker} markers={protests}/>
        </div>
      </React.Fragment>
  );
};
  
  export default Feed;
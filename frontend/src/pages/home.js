import React from "react"
import "../css/home.css"
import SimpleMap2 from "../components/simpleMap2"
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

  // useEffect(() => {
  //   const getToken = async () => {
  //     try {
  //       const accessToken = await getTokenSilently({
  //         audience: `development-protestr-api`,
  //       });
  //       console.log(accessToken);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   getToken();
  // }, []);

  return (
      <React.Fragment>
       <div className="mainx">
        <SimpleMap2 clickedMarker={defaultMarker} markers={protests}/>
        </div>
      </React.Fragment>
  );
};
  
  export default Feed;
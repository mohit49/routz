import React, { useState,useEffect, useContext  } from "react";
import '../Feeds/Feeds.scss';
import { Data } from "../../App";
import axios from "axios";
const fetchposts =  process.env.REACT_BASE_API_URL +  process.env.REACT_APP_POSTS;
function Feeds({profileData}) {
    const [error, setError] = useState(false);
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState(false);
    useEffect(() => {
      if(profileData?.username?.length > 0) {
        setLoader(true);
        axios
          .get(fetchposts + `/?limit=15&index=0&type=photos&query=${profileData.username}`)
          .then(function (response) {
       
            if (response.data.sucessStatus) {
              setError(false);
              setLoader(false);
              setData(response.data.data)
            } else {
              setError(true);
              setLoader(false);
            }
          });
        }
      },[profileData?.username]);
  return (

    <div className="feeds-section">
        <h4>Latest Feeds</h4>
      
        <div className="feed-container">
        {data && data.map((ele,key)=> <div key={key} className="feed-container-list">
data
</div>
)}
        </div>
    </div>
  )
}

export default Feeds
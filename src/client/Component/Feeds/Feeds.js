import React, { useState, useEffect, useContext, useRef } from "react";

import { Data } from "../../App";
import axios from "axios";
import SlicksliderPosts from "../../uiElements/Slickslider/SlicksliderPosts";
import "../Feeds/feeds.scss";
import PostCard from "../PostCard/PostCard";
import { LazyLoadComponent } from 'react-lazy-load-image-component';
const fetchposts = process.env.REACT_BASE_API_URL + process.env.REACT_APP_POSTS;



function Feeds({ profileData }) {
  const [refetchPost, setRefetchPOst] = useState(false);
  const countRef = useRef(0);
  const [error, setError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState(false);

  useEffect(() => {
    if (profileData?.username?.length > 0) {
      setLoader(true);
      axios
        .get(
          fetchposts +
            `/?limit=15&index=0&query=${profileData.username}`
        )
        .then(function (response) {
          if (response.data.sucessStatus) {
            setError(false);
            setLoader(false);
            setData(response.data.data);
          } else {
            setError(true);
            setLoader(false);
          }
        });
    }
  }, [profileData?.username, refetchPost]);

  return (
    <LazyLoadComponent>
    <div className="feeds-section">
      {data &&
        data.map((ele, key) => (
          <div key={key} className="feed-container-list">

         {typeof profileData !== "undefined"  && <PostCard ele = {ele}  profileData={profileData}/> }
          </div>
        ))}
    </div>
    </LazyLoadComponent>
  );
}

export default Feeds;

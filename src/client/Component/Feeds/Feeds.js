import React, { useState,useEffect, useContext  } from "react";

import { Data } from "../../App";
import axios from "axios";
import SlicksliderPosts from "../../uiElements/Slickslider/SlicksliderPosts";
import '../Feeds/feeds.scss';
import { MapPinIcon } from "@heroicons/react/24/solid";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US')
const fetchposts =  process.env.REACT_BASE_API_URL +  process.env.REACT_APP_POSTS;
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  draggable:true,
  responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 1,
         
        }
      },
      {
          breakpoint: 1290,
          settings: {
            slidesToShow: 1,
           
          }
        },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
};
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
      
        {data && data.map((ele,key)=>
        <div key={key} className="feed-container-list">
        <div className="feed-container">
          <div className="postContent">
            <div className="name-location"><p>{ele.authorinfo.name}</p> <p><MapPinIcon/> {ele.location || "Delhi"}</p></div>
           
           
            <p>{timeAgo.format(new Date(ele.timestamp))}</p>
          </div>
          <SlicksliderPosts data={ele} insideImage={true} settings={settings} />
          </div></div>)
        }
    </div>
  )
}

export default Feeds
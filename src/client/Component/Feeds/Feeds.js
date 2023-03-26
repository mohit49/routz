import React, { useState,useEffect, useContext  } from "react";
import '../Feeds/Feeds.scss';
import { Data } from "../../App";
import axios from "axios";
import SlicksliderPosts from "../../uiElements/Slickslider/SlicksliderPosts";
const fetchposts =  process.env.REACT_BASE_API_URL +  process.env.REACT_APP_POSTS;
const settings = {
  dots: false,
  infinite: true,
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
        <h4>your posts</h4>
        {data && data.map((ele,key)=>
        <div key={key} className="feed-container-list">
        <div className="feed-container">
          <SlicksliderPosts data={ele} insideImage={true} settings={settings} />
          </div></div>)
        }
    </div>
  )
}

export default Feeds
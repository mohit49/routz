import React, { useState,useEffect, useContext  } from "react";

import { Data } from "../../App";
import axios from "axios";
import SlicksliderPosts from "../../uiElements/Slickslider/SlicksliderPosts";
import '../Feeds/feeds.scss';
import { MapPinIcon } from "@heroicons/react/24/solid";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en-US')
const fetchposts =  process.env.REACT_BASE_API_URL +  process.env.REACT_APP_POSTS;
const deletePostUrl =  process.env.REACT_BASE_API_URL +  process.env.REACT_APP_DELETE_POST;

const settings = {
  dots: true,
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
    const [showPost, setShowPost] = useState(false);
    const [refetchPost , setRefetchPOst] = useState(false);
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
      },[profileData?.username , refetchPost]);
      const deletePost = (id) => {
        axios
      .delete(deletePostUrl + "/?postId=" + id)
      .then(function (response) {
        if(response.data.sucessStatus) {
          setRefetchPOst(!refetchPost);
        }
      });

      }
  return (
    
    <div className="feeds-section">
      
        {data && data.map((ele,key)=>
        <div key={key} className="feed-container-list">
        <div className="feed-container">
          <div className="postContent">
            <div className="left-con">
            <div className="name-location"><p>{ele.authorinfo.name}</p> <p><MapPinIcon/> {ele.location || "Delhi"}</p></div>
            <p>{timeAgo.format(new Date(ele.timestamp))}</p>
          </div>
          <div className="right-con">
          <Dropdown>
          <Dropdown.Toggle id="dropdown-menu-post">
 <span></span><span></span><span></span> </Dropdown.Toggle>
 <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Share Post</Dropdown.Item>
        <Dropdown.Item onClick={() =>setShowPost(true)}>Delete Post</Dropdown.Item>
      </Dropdown.Menu>
 </Dropdown>
 </div>
 
          </div>
        <div className="post-section">
         { showPost && <div className="pop-box-post">
          <p>Are you Sure you want to delete this post</p>
          <div className="posts-btn">
          <Button onClick={() =>setShowPost(false)} variant="outline-primary">Cancle</Button>
          <Button  variant="primary" onClick={() =>deletePost(ele._id)}>Yes Delete Post</Button>
          </div> 
        </div>}
       
          <SlicksliderPosts data={ele} insideImage={true} settings={settings} />
          </div>
          </div></div>)
        }
    </div>
  )
}

export default Feeds
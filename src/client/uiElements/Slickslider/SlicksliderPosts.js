import React, { Component } from "react";
import { Carousel } from "antd";

const SlicksliderPosts = ({ settings, data }) => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <>
    <div   className='item-con-posts'>
    <div className="post-contnet">
      <p>{data?.authorinfo?.name} ({data?.authorinfo?.username})</p>
      <p>{data?.authorinfo?.usertype} </p>
    </div>
    <div className="item-img">
    <Carousel {...settings} afterChange={onChange}>
      {data && data?.postpics.map((ele,ind)=>
        <div className="post-item">
        <img src={process.env.REACT_BASE_API_IMAGES  + ele.destination+'/'+ ele?.filename}/>
        </div>
      )
    }
    </Carousel>

  </div>
  </div>
  </>
   
  );
};
export default SlicksliderPosts;

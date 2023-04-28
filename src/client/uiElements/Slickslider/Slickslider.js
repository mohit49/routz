import React, { Component } from "react";
import { Carousel } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
const Slickslider = ({ settings, data }) => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <Carousel {...settings} afterChange={onChange}>
      {Object.values(data).map((itemsVal, index) => {
        return <div key={index}  className='item-con'>
          <div className="post-contnet">
            <p>{itemsVal?.authorinfo?.name} ({itemsVal?.authorinfo?.username})</p>
            <p>{itemsVal?.authorinfo?.usertype} </p>
          </div>
          <div className="item-img">
<LazyLoadImage  effect="blur" src={process.env.REACT_BASE_API_IMAGES  + itemsVal.postpics[0].destination+'/'+ itemsVal?.postpics[0]?.filename}/>
        </div>
        </div>
      })}
      
    </Carousel>
  );
};
export default Slickslider;

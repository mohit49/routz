import React, { Component } from "react";
import { Carousel } from "antd";
import { LazyLoadImage } from "react-lazy-load-image-component";
const ContentSlider = ({
    effect,
    items,
    sliderName,
    autoPlay,
    dotPosition,
    className,
  }) => {
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <Carousel
      effect={effect}
      autoplay={autoPlay}
      dotPosition={dotPosition}
      className={className}
    >
      {Object.values(items).map((itemsVal, index) => {
        return (
          <div key={index} >
          
          <p>{itemsVal.text}</p>
          </div>
        );
      })}
    </Carousel>
  );

};
export default ContentSlider;

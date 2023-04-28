import React, { useState, lazy } from "react";
import { Carousel } from "antd";

import Button from "react-bootstrap/Button";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import "../Slider/slider.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Slider({
  effect,
  items,
  sliderName,
  autoPlay,
  dotPosition,
  className,
}) {
  return (
    <Carousel
      effect={effect}
      autoplay={autoPlay}
      dotPosition={dotPosition}
      className={className}
    >
      {Object.values(items).map((itemsVal, index) => {
        return (
          <div key={index} className={itemsVal.className}>
            <div className="contentContainer">
              <h2>{itemsVal.sliderHeading}</h2>
              <p>{itemsVal.sliderText}</p>
              {itemsVal.cta && (
                <Button
                  href={itemsVal.ctaLink}
                  variant={itemsVal.buttonVariant}
                  size={itemsVal.btnSize}
                >
                  {itemsVal.ctaText}
                </Button>
              )}
            </div>
            <div className="imageSlider">
              <BrowserView>
                <LazyLoadImage
                 
                  effect="blur"
                  src={itemsVal.image}
                />
              </BrowserView>
              <MobileView>
              <LazyLoadImage
                
                  effect="blur"
                  src={itemsVal.img_mob}
                />
              
              </MobileView>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}

export default Slider;

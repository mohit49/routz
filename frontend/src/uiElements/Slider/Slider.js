import React from 'react'
import { Carousel } from 'antd';
import Button from 'react-bootstrap/Button';
function Slider({effect,items, autoPlay, dotPosition , className}) {
    
  return (
    <Carousel effect={effect} autoplay={autoPlay} dotPosition={dotPosition} className={className}>
   {Object.values(items).map((itemsVal, index)=>{
    console.log(itemsVal)
    return <div key={index} className={itemsVal.className}>
        <div className='contentContainer'>
            <h2>{itemsVal.sliderHeading}</h2>
            <p>{itemsVal.sliderText}</p>
            {itemsVal.cta &&  <Button href={itemsVal.ctaLink} variant={itemsVal.buttonVariant} size={itemsVal.btnSize}>
        {itemsVal.ctaText}
      </Button>}
        </div>
       <div className='imageSlider'>
        <img src={itemsVal.image}/>
       </div>
    </div>
   })}
  </Carousel>
  )
}

export default Slider
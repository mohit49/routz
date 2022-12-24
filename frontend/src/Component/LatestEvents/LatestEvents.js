import React from 'react'
import "../LatestEvents/LatestEvents.scss";
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Slider from '../../uiElements/Slider/Slider';
import cardCover from '../../assets/images/cardcover.jpg'
import cardCover2 from '../../assets/images/cardcover2.jpg'
import cardCover3 from '../../assets/images/cardcover3.jpg'
import cardCoverAdd from '../../assets/images/add.jpg'
import cardCoverAdd2 from '../../assets/images/add2.jpg'
import cardCoverAdd3 from '../../assets/images/add3.jpg'
import { Avatar, Card } from 'antd';
function LatestEvents() {
    const { Meta } = Card;
    const sliderItem = {
        slide1:{
            'image': cardCoverAdd,
            'img_mob':cardCoverAdd,
            'cta': false,
            'ctaLink':'#',
            'ctaText':'',
            'sliderHeading':'',
            'sliderText':``,
            'className':'slider-con-inner',
            'buttonVariant':'primary',
            'btnSize':'md'
        },
        slide2:{
            'image':cardCoverAdd2,
            'img_mob':cardCoverAdd2,
            'cta': false,
            'ctaLink':'#',
            'ctaText':'',
            'sliderHeading':'',
            'sliderText':``,
            'className':'slider-con-inner',
            'buttonVariant':'primary',
            'btnSize':'md'
        },
        slide3:{
            'image':cardCoverAdd3,
            'img_mob':cardCoverAdd3,
            'cta': false,
            'ctaLink':'#',
            'ctaText':'',
            'sliderHeading':'',
            'sliderText':``,
            'className':'slider-con-inner',
            'buttonVariant':'primary',
            'btnSize':'md'
        },
    }
  return (
    <Container className='content-area-latest-ride'>
    
    <h3>View Latest Bike Riding Event in you area</h3>
    <div className='card-contaner'>
    <Card
    
    style={{ width: 240 }}
    cover={<img alt="example" src={cardCover} />}
  >
    <h4>Ride To ladhak</h4>
    <p className='duration'>one week</p>
    <p className='duration'>1st dec to 10 dec</p>
    <p className='organizer'>JMD automobiles</p>
    <Button href='#' variant='primary' size='md' className='buttonCard'>Book Now</Button>
  </Card>
  <Card
    
    style={{ width: 240 }}
    cover={<img alt="example" src={cardCover3} />}
  >
    <h4>Ride To ladhak</h4>
    <p className='duration'>one week</p>
    <p className='duration'>1st dec to 10 dec</p>
    <p className='organizer'>JMD automobiles</p>
    <Button href='#' variant='primary' size='md' className='buttonCard'>Book Now</Button>
  </Card>
  <Card
    
    style={{ width: 240 }}
    cover={<img alt="example" src={cardCover2} />}
  >
    <h4>Ride To ladhak</h4>
    <p className='duration'>one week</p>
    <p className='duration'>1st dec to 10 dec</p>
    <p className='organizer'>JMD automobiles</p>
    <Button href='#' variant='primary' size='md' className='buttonCard'>Book Now</Button>
  </Card>
  <Card
    
    style={{ width: 240 }}
    cover={<img alt="example" src={cardCover3} />}
  >
    <h4>Ride To ladhak</h4>
    <p className='duration'>one week</p>
    <p className='duration'>1st dec to 10 dec</p>
    <p className='organizer'>JMD automobiles</p>
    <Button href='#' variant='primary' size='md' className='buttonCard'>Book Now</Button>
  </Card>
<div className='sliderAdd'>
  <Slider effect='fade' autoPlay={true} items={sliderItem} dotPosition='bottom' buttonClass='primary' className='slider-home'/>
  </div>
    </div>
    </Container>
  )
}

export default LatestEvents
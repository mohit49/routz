import React, { useEffect, useState } from "react";
import "../LatestEvents/LatestEvents.scss";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Slider from "../../uiElements/Slider/Slider";
import cardCover from "../../assets/images/cardcover.jpg";
import cardCover2 from "../../assets/images/cardcover2.jpg";
import cardCover3 from "../../assets/images/cardcover3.jpg";
import cardCoverAdd from "../../assets/images/add.jpg";
import cardCoverAdd2 from "../../assets/images/add2.jpg";
import cardCoverAdd3 from "../../assets/images/add3.jpg";
import { Avatar, Card } from "antd";
import { LinkContainer } from "react-router-bootstrap";
import GetLocation from "../../Middleware/GetLocation";
import axios from "axios";
const viewEventApi =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_VIEW_EVENT_API;
function LatestEvents() {
  const [userPosition, setUserPosition] = useState();
  const [eventduration, seteventduration] = useState();
  const [filter, setFilterDate] = useState();
  const getLocation = GetLocation();

  const getDay = (data) => {
    var days = ["Sun", "Mon", "Tues", "Wed", "Thur", "Fri", "Sat"];
    var d = new Date(data);
    return days[d.getDay()];
  };
  const getMonth = (data) => {
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const d = new Date(data);
    return monthNames[d.getMonth()];
  };

  useEffect(() => {
    getLocation()
      .then((position) => {
        setUserPosition(position?.city);
        console.log(position?.city)
      })
      .catch((err) => {
      
        axios
        .get(viewEventApi + "/" + `search?limit=4`)
        .then(function (response) {
          setFilterDate(response.data?.data);
        });

        console.log('some issue with location rendering')
      });
  }, []);

  const { Meta } = Card;
  const sliderItem = {
    slide1: {
      image: cardCoverAdd,
      img_mob: cardCoverAdd,
      cta: false,
      ctaLink: "#",
      ctaText: "",
      sliderHeading: "",
      sliderText: ``,
      className: "slider-con-inner",
      buttonVariant: "primary",
      btnSize: "md",
    },
    slide2: {
      image: cardCoverAdd2,
      img_mob: cardCoverAdd2,
      cta: false,
      ctaLink: "#",
      ctaText: "",
      sliderHeading: "",
      sliderText: ``,
      className: "slider-con-inner",
      buttonVariant: "primary",
      btnSize: "md",
    },
    slide3: {
      image: cardCoverAdd3,
      img_mob: cardCoverAdd3,
      cta: false,
      ctaLink: "#",
      ctaText: "",
      sliderHeading: "",
      sliderText: ``,
      className: "slider-con-inner",
      buttonVariant: "primary",
      btnSize: "md",
    },
  };

  useEffect(() => {
    if (userPosition?.length > 0) {
      axios
        .get(viewEventApi + "/" + `search?city=${userPosition}&limit=4`)
        .then(function (response) {
          setFilterDate(response.data?.data);
        });
    }
    
  }, [userPosition]);

  return (
    <Container className='content-area-latest-ride'>
      <h3>View Latest Bike Riding Event in you area</h3>
      <div className='card-contaner'>
        {filter &&
          filter.map((ele, index) => {
            return (
              <Card
               
                cover={
                  <img
                    alt='example'
                    src={
                      process.env.REACT_BASE_API_URL +
                      ele.eventcoverpic.destination +
                      "/" +
                      ele.eventcoverpic.filename
                    }
                  />
                }>
                <h4>{ele.eventtitle}</h4>

                <p className='city'>{ele.city.name}</p>
                <p className='organizer'>{ele.creatorcompany}</p>
                <hr />
                <p className='duration'>
                  <b>From</b>{" "}
                  {getDay(JSON.parse(ele.eventduration)?.From) +
                    " " +
                    new Date(JSON.parse(ele.eventduration)?.From).getDate() +
                    " " +
                    getMonth(JSON.parse(ele.eventduration)?.From) +
                    " " +
                    new Date(
                      JSON.parse(ele.eventduration)?.From
                    ).getFullYear()}{" "}
                  <b>to</b>{" "}
                  {getDay(JSON.parse(ele.eventduration)?.to) +
                    " " +
                    new Date(JSON.parse(ele.eventduration)?.to).getDate() +
                    " " +
                    getMonth(JSON.parse(ele.eventduration)?.to) +
                    " " +
                    new Date(JSON.parse(ele.eventduration)?.to).getFullYear()}
                </p>
                <LinkContainer to={`event/${ele._id}`}>
                  <Button variant='primary' size='md' className='buttonCard'>
                    View Now
                  </Button>
                </LinkContainer>
              </Card>
            );
          })}

        <div className='sliderAdd'>
          <Slider
            effect='fade'
            autoPlay={true}
            items={sliderItem}
            dotPosition='bottom'
            buttonClass='primary'
            className='slider-home'
          />
        </div>
      </div>
    </Container>
  );
}

export default LatestEvents;

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "../ViewEvent/ViewEvent.scss";
import { Spinner } from "react-bootstrap";
import { Routes, Route, useParams } from "react-router-dom";
import { BuildingOfficeIcon , UserIcon , CheckIcon , CalendarIcon} from "@heroicons/react/24/solid";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from "react-bootstrap";
function ViewEvent() {
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState(false);
  const ViewEventApi =
    process.env.REACT_BASE_API_URL + process.env.REACT_APP_VIEW_EVENT_API;
  // We can call useParams() here to get the params,
  // or in any child element as well!
  let { eventName } = useParams();
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        ViewEventApi + "/" + eventName,
        { withCredentials: true },
        {
          eventId: eventName,
        }
      )
      .then(function (response) {
        setLoading(false);
        setEventData(response.data.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Container>
      {loading && (
        <div className='loading-con'>
          <Spinner
            style={{ color: "#0d6efd" }}
            as='span'
            animation='grow'
            size='lg'
            role='status'
            aria-hidden='true'
          />
        </div>
      )}
      {!loading && (
        <div className='event-container'>
         <div className="event-cover-pic">
          <img src={ process.env.REACT_BASE_API_URL + eventData?.eventcoverpic?.destination.split('./')[1] + '/' + eventData?.eventcoverpic?.filename}/>
         </div>
         <Row className="middleBadge">
        <Col>
        <div className="box-badge">  <span>  <BuildingOfficeIcon class='h-6 w-6 text-blue-500' /></span><span><p>Company</p>
        <h4>{eventData?.creatorcompany}</h4></span>
        </div>
        </Col>
       
        <Col> <div className="box-badge"> <span>  <UserIcon class='h-6 w-6 text-blue-500' /></span><span><p>Creator</p>
        <h4> {eventData?.creatorname}</h4></span>
        </div></Col>
        <Col> <div className="box-badge"><span>  <CheckIcon class='h-6 w-6 text-blue-500' /></span><span><p>Registations Done</p>
        <h4> 45</h4></span>
        </div></Col>
        <Col> <div className="box-badge"><span>  <CalendarIcon class='h-6 w-6 text-blue-500' /></span><span><p>Start Date</p>
        <h4> 45</h4></span>
        </div></Col>
      </Row>
      <Row className="middleBadge">
      <Col>
        <div className="box-badge textContent"   dangerouslySetInnerHTML={{__html: eventData.eventdiscription}}> 
        </div>
        </Col>
       
          </Row>
        </div>
       
      )}
    </Container>
  );
}

export default ViewEvent;

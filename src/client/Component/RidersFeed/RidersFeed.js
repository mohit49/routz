import React, { useEffect, useState, useContext } from 'react'
import { Container ,Button } from 'react-bootstrap'
import '../RidersFeed/RidersFeed.scss'
import axios from "axios";
import { Avatar, Card } from "antd";
import { LinkContainer } from "react-router-bootstrap";
import  profilepic from '../../assets/images/propic.jpg'
import { LazyLoadImage } from "react-lazy-load-image-component";
const fetchUsersBikers =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_SEARCH_BAR;
  import { Data } from "../../App";
import CardSleleton from '../Skeletons/CardSleleton';
function RidersFeed() {

  const { letestEventData, setLatestEventData, userPosition } = useContext(Data);

    const [data, setData] = useState(false);
    const [loader, setLoader] = useState(true);
useEffect(()=>{
  if(userPosition?.city?.length > 0) {
  axios
  .get(fetchUsersBikers + "/" + `?searchtype=biker&city=${userPosition?.city}&limit=5`)
  .then(function (response) {
    if(response.data.sucessStatus) {
      setLoader(false)
      setData(response.data.data.resultBikers);
    } 
   
  });
}
if (typeof userPosition?.city != "undefined" || userPosition == false) {

  axios
  .get(fetchUsersBikers + "/" + `?searchtype=biker&limit=5`)
  .then(function (response) {
    if(response.data.sucessStatus) {
      setLoader(false)
      setData(response.data.data.resultBikers);
    } 
   
  });
 }
},[userPosition])
  return (
    <section className='section-from-riders'>

      <Container className='container-mob' fluid="md"><h3><span>View Riders Near you</span> <a href="/">View All</a></h3>
{loader && <div className='demoCon-biker'><CardSleleton cardNo='5'/></div>}
{!loader && <div className='actual-biker-content'>
  {
data.map((ele, index) => {
  console.log(ele)
                return (
                  <div className="custom-card"
                    key={index}>
                       <div className="card-img">
                       <LazyLoadImage
                        alt='example'
                        effect="blur"
                        src={
                          ele.more[0].profilepic?.filename ? process.env.REACT_BASE_API_IMAGES +
                          ele.more[0].profilepic?.destination +
                          "/" +
                          ele.more[0].profilepic?.filename : profilepic
                        }
                      />
                      </div>
                      <div className="card-body">
                    <h4 className='name' title={ele?.name}><b>{ele?.name}</b></h4>

                 
                    <p className='email'>Email : {ele.email}</p>
                    <p className='kms-completed'>Distance Coverd : {ele?.more[0].kms} KMS</p>
                    <p className='kms-completed'><b>Bike Own : {ele?.more[0].bikeinfo}</b></p>
                   
                    <hr />
                  
                    <LinkContainer to={`profile/${ele.username}`}>
                      <Button
                        variant='primary'
                        size='md'
                        className='buttonCard'>
                        View Profile
                      </Button>
                    </LinkContainer>
                    </div>
                  </div>
                );
              })
            }
  </div>}
      
      </Container>
    
    </section>
  )
}

export default RidersFeed
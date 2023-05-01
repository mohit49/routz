import React, { useEffect, useState, useRef } from "react";
import "./SearchBar.scss";
import Button from "react-bootstrap/Button";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { Select } from "antd";
import { Radio } from "antd";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import profilepic from "../../assets/images/propic.jpg";
import WordLimit from 'react-word-limit';
const DEBOUNCE_THRESHOLD = 500;
const createEventAPI =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_SEARCH_BAR;
function SearchBar() {
  let location = useLocation();
  let navigate = useNavigate();
  const timeoutHandler = useRef(null);
  const handleChange = (event) => {
    if (timeoutHandler.current) {
      clearTimeout(timeoutHandler.current);
    }
    timeoutHandler.current = setTimeout(() => {
      setSearchInput(event.target.value);
    }, DEBOUNCE_THRESHOLD);
  };

  const source = axios.CancelToken.source();
  const cancelToken = source.token;
  const [checkedList, setCheckedList] = useState("biker");
  const [searchInput, setSearchInput] = useState();
  const [searchData, setSearchData] = useState();

  useEffect(() => {
    var searcType = checkedList;
    var limit = 15;
    var index = 0;
    var writeQueryUrl;
    if (searchInput?.length) {
      writeQueryUrl = `query=${searchInput}`;
    }
    if (searcType?.length > 0) {
      writeQueryUrl =
        writeQueryUrl?.length > 0
          ? writeQueryUrl + `&searchtype=${searcType}`
          : `searchtype=${searcType}`;
    }
    if (limit) {
      writeQueryUrl = writeQueryUrl
        ? writeQueryUrl + `&limit=${limit}&index=${index}`
        : `limit=${limit}&index=${index}`;
    }
    if (writeQueryUrl && searchInput?.length > 0) {
      console.log(writeQueryUrl);
      axios
        .get(createEventAPI + "/?" + writeQueryUrl, { cancelToken })
        .then(function (response) {
          if (response.data.sucessStatus) {
            setSearchData(response.data.data);
          } else {
            console.log("error");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      setTimeout(() => {
        source.cancel("Operation canceled by the user.");
      }, "1000");
    }
  }, [checkedList, searchInput]);
  const onChange = (list) => {
    setCheckedList(list.target.value);
  };

  return (
    <>
      <div className="main-search-container">
        <div className="type-area-search">
          <input placeholder="Search Here...." onChange={handleChange}></input>
        </div>
        <div className="searchtypeSelector">
         
          <Radio.Group defaultValue="biker" buttonStyle="solid"   onChange={onChange}>
      <Radio.Button value="biker">Bikers</Radio.Button>
      <Radio.Button value="event">Events</Radio.Button>
      <Radio.Button value="blog">Blogs</Radio.Button>
      <Radio.Button value="post">Posts</Radio.Button>
    </Radio.Group>
        </div>
       
        {searchInput?.length > 0 && (
          <div className="search-suggestions">

{!(
              searchData?.resultBikers?.length > 0 ||
              searchData?.eventSearch?.length > 0
            ) && <Spinner variant="primary" animation="border" />}
            {checkedList == 'biker' && searchData?.resultBikers.length > 0 && (
              <div className="biker-search">
                <p>
                  <b>Bikers</b>
                </p>
                <ul className="suggestion">
                  {searchData?.resultBikers.map((ele, index) => {
                    return (
                      <li
                        key={index}
                      
                      >
                     
                     
                        <LinkContainer to={`profile/${ele.username}`}>
            <Button className="sec-button">
            <div className="search-img"  >
                          <img
                            src={
                              ele.more[0].profilepic?.filename
                                ? process.env.REACT_BASE_API_IMAGES +
                                  ele.more[0].profilepic?.destination +
                                  "/" +
                                  ele.more[0].profilepic?.filename
                                : profilepic
                            }
                          />
                        </div>
                        <div className="searchDetails"  >
                        <p className="name">{ele.name}</p>
                        <p className="username">{ele.username}</p>
                        </div>
            </Button>
          </LinkContainer>

                       
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
             {checkedList == 'event' && searchData?.eventSearch?.length > 0 && (
              <div className="biker-search">
                <p>
                  <b>Events</b>
                </p>
                <ul className="suggestion eventsSearch">
       
          {searchData?.eventSearch.map((ele, index) => {
                    return (
                      <li key={index}>
                        <LinkContainer to={`event/${ele._id}`}>
                          <Button className="sec-button">
                          <div className="search-img"  >
                          <img
                            src={
                              ele.eventcoverpic?.filename
                                ? process.env.REACT_BASE_API_IMAGES +
                                  ele.eventcoverpic?.destination +
                                  "/" +
                                  ele.eventcoverpic?.filename
                                : profilepic
                            }
                          />
                        </div>
                            <div className="searchDetails">
                              <p className="name" title={ele.eventtitle}>
                              <WordLimit limit={40}>{ele.eventtitle}</WordLimit>
                              </p>

                              <p className="username">
                                Place : {ele.state.name}
                              </p>
                              <p className="username">By : {ele.creatorname}</p>
                            </div>
                          </Button>
                        </LinkContainer>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
           
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;

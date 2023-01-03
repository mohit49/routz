import React, { useState, useContext, useEffect } from "react";

import "../CreateEvent/CreateEvent.scss";

import Button from "react-bootstrap/Button";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {  DatePicker } from "antd";
import { Data } from "../../App";
import axios from "axios";

import dayjs from "dayjs";

const ResultGrid = React.lazy(() => import("../../Component/ResultGrid/ResultGrid"));
const CountryStateCity = React.lazy(() => import("../../Middleware/CountryStateCity/CountryStateCity"));
const createEventAPI =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_EVENT_API;
  const imageUpload =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_IMAGE_UPLOAD;

function CreateEvent() {
  const [eventTitle, setEventTitle] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [refetchcity, SetRefetchcity] = useState(false);
  const [eventSubheading, setEventSubheading] = useState();
  const [eventDuration, setEventDuration] = useState({});
  const [loading, setLoading] = useState(false);
  const [eventDiscription, setEventDiscription] = useState(true);
  const [eventStatus, setEventStatus] = useState(false);
  const [eventLink, setEventLink] = useState();
  const { loginState, setLoginState, profileData, setProfileData } =
    useContext(Data);
  const { RangePicker } = DatePicker;

  const [eventCoverPic, setEventCoverPic] = useState([]);

  // image uoload method

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onChangeEventPic = async ({ fileList: newFileList, file }) => {
    const getSrcFromFile = (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    };

    const src = file.url || (await getSrcFromFile(file));

    setEventCoverPic(newFileList);
  };

  const onRangeChange = (dates, dateStrings) => {
    if (dates) {
      setEventDuration({ From: dateStrings[0], to: dateStrings[1] });
    } else {
      console.log("Clear");
    }
  };

  const rangePresets = [
    {
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      label: "Last 14 Days",
      value: [dayjs().add(-14, "d"), dayjs()],
    },
    {
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
    {
      label: "Last 90 Days",
      value: [dayjs().add(-90, "d"), dayjs()],
    },
  ];

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(!loading);

    if (eventCoverPic.length > 0) {
      const reqData = {
        title: eventTitle,
        eventduration: eventDuration,
        eventDiscription: eventDiscription,
        eventSubheading : eventSubheading
      
      };
      var formData = new FormData();
      formData.append("userName", profileData._id);
      formData.append("eventCoverPic", true);
      formData.append("title",  reqData.title);
      formData.append("eventduration",  JSON.stringify(eventDuration));
      formData.append("eventsubheading",  eventSubheading);
      formData.append("eventDiscription",  reqData.eventDiscription);
      formData.append("state",  JSON.stringify(state));
      formData.append("city",  JSON.stringify(city));
      let imageNames = [];
      if (eventCoverPic) {
        eventCoverPic.forEach((ele, index) => {
          if (ele.originFileObj) {
            formData.append(
              "image",
              ele.originFileObj,
              profileData._id + "." + ele.originFileObj.name.split(".")[1]
            );
            return false;
          }
        });
      }
    }

    axios
      .post(
        createEventAPI,
        eventCoverPic.length
          ? formData
          : {
              title: eventTitle,
              eventduration: eventDuration,
              eventDiscription: eventDiscription,
              state:  JSON.stringify(state),
              city:  JSON.stringify(city),
            },
        { withCredentials: true }
      )
      .then(function (response) {
      
        if (!response.data.sucessStatus) {

        } else {
          setEventLink(`event/${response.data.data._id}`)
          setLoading(false);
          setEventStatus(true)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onchangeState = (value) =>{
    SetRefetchcity(true)
    setState(value)

  }
  const onchangeCity =(value) =>{
    setCity(value)
  }
  


  return (
    <>
  
  
dummy
       
       

        
         </>
  );
}

export default CreateEvent;

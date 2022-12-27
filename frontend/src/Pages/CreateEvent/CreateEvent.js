import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import "../CreateEvent/CreateEvent.scss";
import { PlusOutlined } from "@ant-design/icons";
import Button from "react-bootstrap/Button";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import { Data } from "../../App";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Spinner } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Input, DatePicker } from "antd";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Banner3 from "../../assets/images/headingbanner.jpg";
import dayjs from "dayjs";
import ResultGrid from "../../Component/ResultGrid/ResultGrid";
const createEventAPI =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_EVENT_API;
function CreateEvent() {
  const [eventTitle, setEventTitle] = useState();
  const [eventDuration, setEventDuration] = useState({});
  const [loading, setLoading] = useState(false);
  const [eventDiscription, setEventDiscription] = useState(true);
  const [eventStatus, setEventStatus] = useState(false);
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
      };
      var formData = new FormData();
      formData.append("userName", profileData._id);
      formData.append("eventCoverPic", true);
      formData.append("title",  reqData.title);
      formData.append("eventduration",  reqData.eventduration);
      formData.append("eventDiscription",  reqData.eventDiscription);
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
            },
        { withCredentials: true }
      )
      .then(function (response) {
      
        if (!response.data.sucessStatus) {

        } else {
          setLoading(false);
          setEventStatus(true)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
  
  
  <Container className="create-event-page">

      <div className='mainBanner'>
        <div className='innerContent'>
          <h2>Create Events</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy
          </p>
        </div>
        <img src={Banner3} />
      </div>


  {(loading && !eventStatus) && (
          <Spinner
            as='span'
            animation='grow'
            size='sm'
            role='status'
            aria-hidden='true'
          />
        )}
  {(!loading && !eventStatus) && (
      <div className='event-form'>
        <p>
          Evant Creator <b>{profileData?.name}</b> from{" "}
          <b>{profileData?.companyinfo}</b>
        </p>
        <hr />
        <br />
    
       
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout='horizontal'
            onSubmit={submitForm}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>Enter Event Name : </Form.Label>
              <Input
                value={eventTitle}
                onChange={(e) => setEventTitle(e.target.value)}
                placeholder='Enter Title Of the Event'
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='evenbtDuration'>
              <Form.Label>Enter Event Duration : </Form.Label>
              <RangePicker presets={rangePresets} onChange={onRangeChange} />
            </Form.Group>

            <Form.Group className='mb-3' controlId='evenbtDiscription'>
              <Form.Label>Enter Event Discription</Form.Label>
              <CKEditor
                editor={ClassicEditor}
                data='<p>Add event discription here</p>'
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setEventDiscription(data);
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
                
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='evenbtCoverPic'>
              <Form.Label>Upload Event Cover Picture</Form.Label>
              <ImgCrop
                shape='rect'
                aspect={21 / 9}
                rotate
                quality={1}
                grid={true}>
                <Upload
                 name="avatar"
                 listType="picture-card"
                  fileList={eventCoverPic}
                  onChange={onChangeEventPic}
                  showUploadList={true}
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                 
                  onPreview={onPreview}>
                  {eventCoverPic.length < 5 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Form.Group>
            <Form.Group className='mb-3' controlId='evenbtThumbnails'>
              <Button variant='primary' type='submit' size='md'>
                Create Event
              </Button>
            </Form.Group>
          </Form>
     

      </div>
  )}

            {(!loading && eventStatus) && (
      <ResultGrid status='success' title={`Your Event ${eventTitle} is Sucessfully Created`} subTitle={`Clikc On Blow Link to visit you event`}/>
         )}
</Container>
       
       

        
         </>
  );
}

export default CreateEvent;

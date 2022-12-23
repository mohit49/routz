import React, { useContext, useState, useEffect } from "react";
import "../Coverpic/Coverpic.scss";
import { EditOutlined  } from '@ant-design/icons';
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import { Data } from "../../App";
import { PhotoIcon } from '@heroicons/react/24/solid'
import  'antd/dist/antd.less';
import Axios from "axios";
import Container from "react-bootstrap/Container";
const EditProfileApi = process.env.REACT_BASE_API_URL + process.env.REACT_APP_EDIT_PROFILE;
function Coverpic({city,state,country}) {
  const [fileList, setFileList] = useState([]);
  const [images, setImages] = useState([]);
  
  const { loginState, setLoginState, profileData, setProfileData } =
    useContext(Data);

    const onChange = async ({ fileList: newFileList, file }) => {
   
    
      const getSrcFromFile = (file) => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
      };
      const src = file.url || (await getSrcFromFile(file));
        
        setFileList(newFileList);
        

        
      
      
      
      
    };
    

    useEffect(()=>{
  var currentTime = Date.now();
      if(fileList.length > 0) {
  
      var formData = new FormData();
  
      formData.append('userName', profileData._id);
      let imageNames=[];
      if(fileList) {
        fileList.forEach((ele,index) => {
          if(ele.originFileObj) {
            formData.append('image', ele.originFileObj , profileData._id + '.' + ele.originFileObj.name.split('.')[1]);
            return false;
          }
        })
      }
      
     
      Axios.post(EditProfileApi, formData,   { withCredentials: true } ).then((response)=>{
        if(response.statusText === 'OK') {
          setProfileData(response.data.data)
        }
     });
    }
     
  
    },[fileList]);

  return (
    <>
      <Container className="coverPic shadow-sm p-0">
        <div className="coverContent">
          <div className="userProfile">
          <ImgCrop rotate quality={0.8} grid={true}>
      <Upload 
        fileList={fileList}
        onChange={onChange}
        >
        <label class="iconEdit">
            <PhotoIcon class="h-6 w-6 text-blue-500"/>
            </label>
      </Upload>
      
    </ImgCrop>
            <div className="profile-image">
          
              {profileData?.profilepic && <img src={process.env.REACT_BASE_API_URL+profileData?.profilepic?.destination + '/' + profileData?.profilepic?.filename} />}
            
          
    
           
            </div>
            <div className="profile-name">
              <h4>
                {profileData.name} ({profileData.username}) <p style={{fontSize: 14 + 'px'}}> {city}</p>
              </h4>
              <p></p>
            </div>
          </div>
          <div className="user-info">
            <div className="mn-btn">
              <Button variant="primary">Message</Button>
              <Button variant="outline-light">Follow Now</Button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Coverpic;

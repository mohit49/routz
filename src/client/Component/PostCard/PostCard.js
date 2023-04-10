import React, { useState, useEffect } from "react";
import { MapPinIcon, MdOutlineDeleteOutline } from "@heroicons/react/24/solid";
import {
  TrashIcon,
  ChatBubbleLeftRightIcon,
  ShareIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { HeartFilled } from "@ant-design/icons";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Button from "react-bootstrap/Button";
import axios from "axios";
import SlicksliderPosts from "../../uiElements/Slickslider/SlicksliderPosts";
import  profilepic from '../../assets/images/propic.jpg'
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");
const deletePostUrl =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_DELETE_POST;
const postLike =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_POST_LIKE;
const profileFetch =
  process.env.REACT_BASE_API_URL + process.env.REACT_APP_PROFILE_FETCH;
const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  draggable: true,
  responsive: [
    {
      breakpoint: 1800,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 1290,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
function PostCard({ ele, profileData }) {
  const [showPost, setShowPost] = useState("");
  const [username, setUserName] = useState(ele.authorinfo.username);
  const [userProfilePic, setuserProfilePic] = useState(ele.authorinfo.username);
  const [likeList, setLikeList] = useState(ele.postlikes);
  const [likes, setLikes] = useState(ele.postlikes?.split(",").length || "0");
  const [likePostH, setLikePostH] = useState(false);
  const [removePost, setRemovePost] = useState(false);
  const deletePost = (id) => {
    axios.delete(deletePostUrl + "/?postId=" + id).then(function (response) {
      if (response.data.sucessStatus) {
        setRemovePost(true);
      }
    });
  };
  const likePost = (postId) => {
    axios.post(postLike + "/?postId=" + postId).then(function (response) {
      if (response.data.sucessStatus) {
        setLikeList(response.data?.list || "");
        setLikes(response.data.dataCount);
      }
    });
  };
  useEffect(() => {
    if (likeList?.includes(profileData?.regData?._id)) {
      setLikePostH(true);
    } else {
      setLikePostH(false);
    }
  }, [likes]);

  useEffect(() => {

    axios
      .get(profileFetch + "/" + username)
      .then(function (response) {
        if (response.data.sucessStatus) {
            setuserProfilePic(response.data.data?.profilepic);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [username]);
  return (
    <>
      {!removePost && (
        <div className="feed-container">
          <div className="postContent top-sec">
            <div className="left-con">
              <div className="name-location">
                <p><span className='pro-pic'> <img src={`${userProfilePic?.filename ? process.env.REACT_BASE_API_IMAGES + userProfilePic.destination +'/'+ userProfilePic.filename : profilepic}`}/>    </span> {ele.authorinfo.name}
                </p>
                <p>
                {timeAgo.format(new Date(ele.timestamp))} &nbsp; | &nbsp; <MapPinIcon /> {ele.location || "Delhi"}
                </p>
              </div>
             
            </div>

            <div className="right-con" onClick={() => setShowPost(ele._id)}>
              <TrashIcon />
            </div>
          </div>

          <div className="post-section">
            {(ele.postdiscription || ele.posttitle) && (
              <div className="post-discription">
                <h4>{ele.posttitle}</h4>
                <p>{ele.postdiscription}</p>
              </div>
            )}
            {ele._id == showPost && (
              <div className="pop-box-post">
                <p>Are you Sure you want to delete this post</p>
                <div className="posts-btn">
                  <Button
                    onClick={() => setShowPost("")}
                    variant="outline-primary"
                  >
                    Cancle
                  </Button>
                  <Button variant="primary" onClick={() => deletePost(ele._id)}>
                    Yes Delete Post
                  </Button>
                </div>
              </div>
            )}

            <SlicksliderPosts
              data={ele}
              insideImage={true}
              settings={settings}
            />
          </div>
          <div className="postContent">
            <div className="left-con">
              <div className="name-location chat-likes">
                <p>
                  {likePostH ? (
                    <HeartFilled
                      onClick={() => likePost(ele._id)}
                      style={{
                        color: "red",
                      }}
                    />
                  ) : (
                    <HeartIcon onClick={() => likePost(ele._id)} />
                  )}
                  <span>{likes}</span>
                </p>
                <p>
                  <ChatBubbleLeftRightIcon /> <span>20</span>
                </p>
              </div>
            </div>
            <div className="right-con bottom-share">
              <ShareIcon /> <span>Share</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PostCard;

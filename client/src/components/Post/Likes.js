import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import axios from "axios";
import { getAllLikes } from "../../actions/likes.actions";

const Likes = (props) => {
  const likesData = useSelector((state) => state.likeReducer);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleLike = async (post) => {
    axios({
      method: "post",
      url: `api/like/:like`,
      withCredentials: true,
      data: {
        user: uid,
        post: post,
      },
    }).then(() => {
      dispatch(getAllLikes());
    });
  };

  const handleUnlike = async (id) => {
    axios({
      method: "delete",
      url: `api/like/${id}`,
      withCredentials: true,
      data: {
        user: uid,
        post: props.post,
      },
    }).then(() => {
      dispatch(getAllLikes());
    });
  };
  let likesCount = 0;
  let isLiked;
  let likeId;

  const unlikeVisual = (e) => {
    console.log(e.target.src);
    e.target.src = "./img/icons/heart-crack.svg";
  };
  const relikeVisual = (e) => {
    console.log(e.target.src);
    e.target.src = "./img/icons/heart-full.png";
  };

  return (
    <div>
      {likesData.map((liker) => {
        if (liker.post === props.post) {
          likesCount++;
          if (liker.user === uid) {
            console.log("match");
            {
              isLiked = true;
              likeId = liker.id;
              console.log(isLiked);
            }
          }
        } else return null;
      })}
      {likesCount}
      {isLiked ? (
        <img
          src="./img/icons/heart-full.png"
          alt="liked"
          className="unlike-post icon-30"
          onMouseOver={unlikeVisual}
          onMouseLeave={relikeVisual}
          onClick={() => handleUnlike(likeId)}
        />
      ) : (
        <img
          src="./img/icons/heart-empty.svg"
          alt="not liked"
          className="icon-30"
          onClick={() => handleLike(props.post)}
        />
      )}
    </div>
  );
};

export default Likes;

import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UidContext } from "../AppContext";
import axios from "axios";
import { getAllLikes } from "../../actions/likes.actions";
import { isEmpty } from "../Utils";

const Likes = (props) => {
  const likesData = useSelector((state) => state.likeReducer);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const handleLike = async (post) => {
    await axios({
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
    await axios({
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
    e.target.src = "./img/icons/heart-crack.svg";
  };
  const relikeVisual = (e) => {
    e.target.src = "./img/icons/heart-full.png";
  };

  return (
    <div className="icon flex min-height bold">
      {!isEmpty(likesData[0]) &&
        likesData.map((liker) => {
          if (liker.post === props.post) {
            likesCount++;
            if (liker.user === uid) {
              {
                isLiked = true;
                likeId = liker.id;
              }
            }
          } else return null;
        })}
      {isLiked ? (
        <img
          src="./img/icons/heart-full.png"
          alt="liked"
          className="unlike-post icon"
          onMouseOver={unlikeVisual}
          onMouseLeave={relikeVisual}
          onClick={() => handleUnlike(likeId)}
        />
      ) : (
        <img
          src="./img/icons/heart-empty.svg"
          alt="not liked"
          className="icon"
          onClick={() => handleLike(props.post)}
        />
      )}
      <span>{likesCount}</span>
    </div>
  );
};

export default Likes;

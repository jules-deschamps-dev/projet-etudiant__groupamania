import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLikes } from "../../actions/likes.actions";
import { UidContext } from "../AppContext";

const LikeButton = (post, likes) => {
  const [liked, setLiked] = useState(false);
  const likesData = useSelector((state) => state.likeReducer);
  const postsData = useSelector((state) => state.postReducer);
  let likerNumber = 0;
  const dispatch = useDispatch;
  const uid = useContext(UidContext);
  if (uid) dispatch(getAllLikes());

  const like = () => {};

  const unlike = () => {};

  //liker.post === post.id

  useEffect(() => {
    likesData.map(
      (liker) => {
        if (liker.user === uid) setLiked(true);
        else setLiked(false);
      },
      [uid, likesData]
    );
  });
  /*
  useEffect(() => {
    console.log("-------");
    likesData.map((liker) => {
      console.log("like : ", liker.post);
      if (liker.user === uid) {
        postsData.map((post) => {
          console.log("post : ", post.id);
          if (liker.post === post.id) {
            console.log("match");
            likerNumber++;
            setLiked(true);
            console.log(liked);
          }
        });
      }
      return null;
    });
    console.log("-------");
  }, [uid, likesData]);
*/
  return (
    <div className="like-container">
      {liked === false && <p>like</p>}
      {liked && <p>unlike</p>}
      {likerNumber}
    </div>
  );
};

export default LikeButton;

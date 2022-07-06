import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import { isEmpty, dateParser } from "../Utils";
import Comment from "././comments/Comment";
import CommentsCounter from "./comments/CommentsCounter";
import DeleteCard from "./DeletePost";
import Likes from "./Likes";
import NewComment from "././comments/NewComment";
import UserInformation from "./UserInformation";

const Card = ({ post, like }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const handleComment = () => {
    showComments ? setShowComments(false) : setShowComments(true);
    return showComments;
  };

  const handlePin = (pin) => {
    console.log("---");
    console.log(pin);
    if (pin === true) {
      pin = false;
    } else pin = true;

    console.log(pin);
    console.log("---");

    dispatch(updatePost(post.id, post.content, pin));
  };

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updatePost(post.id, textUpdate));
    }
    setIsUpdating(false);
  };

  useEffect(() => {
    !isEmpty(usersData[0]) && setIsLoading(false);
  }, [usersData]);

  return (
    <li className="card-container flex column" key={post.id}>
      {isLoading ? (
        <p>Charging..</p>
      ) : (
        <div className="flex row">
          <UserInformation author={post.author} />

          <div className="flex column content-container">
            {userData.isAdmin &&
              (post.isPinned ? (
                <img
                  src="./img/icons/thumbtack.svg"
                  alt="Edit post"
                  className="icon"
                  onClick={() => handlePin(post.isPinned)}
                />
              ) : (
                <img
                  src="./img/icons/thumbtack-empty.svg"
                  alt="Edit post"
                  className="icon"
                  onClick={() => handlePin(post.isPinned)}
                />
              ))}

            {isUpdating === false && <p className="content">{post.content}</p>}
            {isUpdating === false && post.picture && (
              <img src={post.picture} className="image margin" />
            )}
            {isUpdating === true && (
              <div className="update-post">
                <textarea
                  defaultValue={post.content}
                  onChange={(e) => setTextUpdate(e.target.value)}
                />
                <div className="btn-container">
                  <button className="btn" onClick={updateItem}>
                    Valider !
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="info-post-container margin">
            <span className="date">{dateParser(post.createdAt)}</span>
            {(userData.id === post.author || userData.isAdmin) && (
              <div className="flex row">
                <div className="post-attribut-container">
                  <div
                    className="btn-container"
                    onClick={() => setIsUpdating(true)}
                  >
                    <img
                      src="./img/icons/pen-circle.svg"
                      alt="Edit post"
                      className="edit-btn icon"
                    />
                  </div>
                  <div>
                    <DeleteCard id={post.id} />
                  </div>
                </div>
              </div>
            )}

            <div className="flex row post-attribut-container">
              <div>
                <Likes post={post.id} />
              </div>
              <div onClick={handleComment}>
                <CommentsCounter post={post.id} />
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        {showComments ? (
          <>
            <NewComment post={post.id} />
            <Comment post={post.id} />
          </>
        ) : null}
      </div>
    </li>
  );
};

export default Card;

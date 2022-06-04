import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import { isEmpty, dateParser } from "../Utils";
import DeleteCard from "./DeletePost";
import LikeButton from "./LikeButton";

const Card = ({ post, like }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
  const likesData = useSelector((state) => state.likeReducer);
  const dispatch = useDispatch();

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
    <li className="card-container flex row" key={post.id}>
      {isLoading ? (
        <p>Chargement</p>
      ) : (
        <>
          <div className="info-container">
            <div className="picture-container">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user.id === post.author) return user.picture;
                      else return null;
                    })
                    .join("") //replace "," by ""
                }
                alt="Avatar utilisateur"
                className="limit-width "
              />

              <span className="author flex">
                {!isEmpty(usersData[0]) &&
                  usersData.map((user) => {
                    if (user.id === post.author)
                      return user.firstName + " " + user.lastName;
                    else return null;
                  })}
              </span>
            </div>
          </div>

          <div className="flex column content-container">
            {isUpdating === false && <p className="content">{post.content}</p>}
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
            {userData.id === post.author && (
              <div className="flex row">
                <div
                  className="btn-container"
                  onClick={() => setIsUpdating(true)}
                >
                  <img
                    src="./img/icons/message-pen.svg"
                    alt="Edit post"
                    className="edit-btn icon"
                  />
                </div>
                <div>
                  <DeleteCard id={post.id} />
                </div>
              </div>
            )}

            <div>
              {likesData
                .map((liker) => {
                  if (liker.post === post.id) return <LikeButton />;
                  else return "like";
                })
                .join("")}
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../../actions/post.actions";
import { isEmpty, dateParser } from "../Utils";
import DeleteCard from "./DeletePost";
import Likes from "./Likes";
import UserInformation from "./UserInformation";

const Card = ({ post, like }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);
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
        <p>Charging..</p>
      ) : (
        <>
          <UserInformation author={post.author} />

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
                    className="edit-btn icon-set-post"
                  />
                </div>
                <div>
                  <DeleteCard id={post.id} />
                </div>
              </div>
            )}

            <div>
              <Likes post={post.id} />
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default Card;

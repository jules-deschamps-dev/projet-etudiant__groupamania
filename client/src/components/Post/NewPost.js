import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPosts, handleFile, newPost } from "../../actions/post.actions";
import { isEmpty, timestampParser } from "../Utils";

const NewPost = () => {
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState(null);
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorsReducer.postErrors);
  const dispatch = useDispatch();

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
    const data = new FormData();
    if (file) data.append("file", file);
    dispatch(handleFile(data));
  };

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("author", userData.id);
      data.append("content", message);
      if (file) data.append("file", file);
      if (file) data.append("picture", postPicture);

      await dispatch(newPost(data));
      dispatch(getPosts());
      cancelPost();
    }
  };
  const cancelPost = async () => {
    setMessage("");
    setPostPicture(null);
    setFile(null);
  };

  return (
    <>
      <div className="new-post-container">
        <div className="flex">
          <div className="flex row textarea-container">
            <img
              src={userData.picture}
              alt="avatar utilisateur"
              className="picture"
            />
            <textarea
              name="message"
              id="message"
              placeholder=">Créer une nouvelle publication"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="content"
            />
            <div className="import-picture-container">
              <img
                src="./img/icons/hexagon-image.png"
                alt="bouton"
                className="absolute icon"
              />
              <input
                type="file"
                id="file-upload"
                name="file"
                accept=".jpg, .jpeg, .png"
                className="import-btn absolute"
                onChange={(e) => handlePicture(e)}
              />
            </div>
          </div>
        </div>

        {message || postPicture ? (
          <div className="card-container flex row ">
            <div className="info-container">
              <img
                src={userData.picture}
                alt="Avatar utilisateur"
                className="picture"
              />
              <div className="info-user-txt-container">
                <span className="author flex">{userData.name}</span>
                <span className="bio">{userData.departement}</span>
              </div>
            </div>

            <div className="content-container">
              <p className="content">{message}</p>
              <img src={postPicture} alt="" className="image" />
            </div>
            <div className="info-post-container margin">
              <span className="date">{timestampParser(Date.now())}</span>
              <div className="flex row post-attribut-container">
                <img
                  src="./img/icons/heart-empty.svg"
                  alt="liked"
                  className=" icon"
                />
                <img
                  src="./img/icons/comment.svg"
                  alt="liked"
                  className="icon"
                />
              </div>
            </div>
          </div>
        ) : null}

        <div className="btn-send">
          {message || postPicture ? (
            <>
              <button className="cancel" onClick={cancelPost}>
                Annuler
              </button>

              <button className="send" onClick={handlePost}>
                Envoyer
              </button>

              {!isEmpty(error.maxSize) && alert(error.maxSize)}
              {!isEmpty(error.format) && alert(error.format)}
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default NewPost;

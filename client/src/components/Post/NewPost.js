import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getPosts } from "../../actions/post.actions";
import { timestampParser } from "../Utils";
import axios from "axios";

const NewPost = () => {
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null);
  const [file, setFile] = useState("");
  const userData = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const handlePicture = () => {};

  const handlePost = async () => {
    if (message || postPicture) {
      const data = new FormData();
      data.append("author", userData.id);
      data.append("content", message);
      if (file) data.append("file", file);

      axios({
        method: "post",
        url: `api/post/create`,
        withCredentials: true,
        data: {
          content: message,
          author: userData.id,
        },
      }).then(() => {
        dispatch(getPosts());
        cancelPost();
      });
    }
  };
  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setFile("");
  };

  return (
    <div className="new-post-container">
      <NavLink exact to="/profil">
        <div className="flex row margin user-info">
          <img
            src={userData.picture}
            alt="avatar utilisateur"
            className="limit-width margin "
          />
        </div>

        <span className="margin">{userData.name}</span>
      </NavLink>

      <div className="new-post-container">
        <textarea
          name="message"
          id="message"
          placeholder=">Créer une nouvelle publication"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          className="content"
        />

        {message || postPicture ? (
          <div className="card-container flex row margin">
            <div className="picture-container">
              <img
                src={userData.picture}
                alt="Avatar utilisateur"
                className="icon-picture"
              />
            </div>

            <div className="flex column container">
              <h3 className="author">{userData.name}</h3>
              <div className="content">
                <p>{message}</p>
                <img src={postPicture} alt="" />
              </div>
              <span className="date">{timestampParser(Date.now())}</span>
            </div>
          </div>
        ) : null}

        <div className="import-picture-container">
          <img
            src="./img/icons/hexagon-image.svg"
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

        <div className="btn-send">
          {message || postPicture ? (
            <>
              <button className="cancel" onClick={cancelPost}>
                Annuler le message
              </button>
              <button className="send" onClick={handlePost}>
                Envoyer
              </button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default NewPost;

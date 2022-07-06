import axios from "axios";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../../../actions/comments.actions";
import { UidContext } from "../../AppContext";

const NewComment = (props) => {
  const uid = useContext(UidContext);
  const [message, setMessage] = useState("");
  const userData = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  const handlePost = async () => {
    if (message) {
      console.log(props.post);
      axios({
        method: "post",
        url: `api/comment/create`,
        withCredentials: true,
        data: {
          content: message,
          author: uid,
          post: props.post,
        },
      }).then(() => {
        dispatch(getAllComments());
        cancelPost();
      });
    }
  };
  const cancelPost = () => {
    setMessage("");
  };
  return (
    <>
      <textarea
        name="message"
        id="message"
        placeholder=">Commenter la publication"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
        className="new-comment-txtarea"
      />
      <div className="btn-send">
        {message ? (
          <>
            <button className="cancel" onClick={cancelPost}>
              Annuler
            </button>
            <button className="send" onClick={handlePost}>
              Envoyer
            </button>
          </>
        ) : null}
      </div>
    </>
  );
};

export default NewComment;

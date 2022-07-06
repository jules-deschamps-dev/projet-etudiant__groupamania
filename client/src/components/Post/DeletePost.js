import React from "react";
import { useDispatch } from "react-redux";
import { deletePost } from "../../actions/post.actions";

const DeleteCard = (props) => {
  const dispatch = useDispatch();
  const deleteQuote = () => dispatch(deletePost(props.id));

  return (
    <div
      className="btn-container"
      onClick={() => {
        if (window.confirm("Voulez-vraiment supprimer cette publication"))
          deleteQuote();
      }}
    >
      <img
        src="./img/icons/circle-trash.svg"
        alt="Delete post"
        className="edit-btn icon"
      />
    </div>
  );
};

export default DeleteCard;

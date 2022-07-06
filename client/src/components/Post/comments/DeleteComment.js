import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteComment,
  getAllComments,
} from "../../../actions/comments.actions";

const DeleteComment = (props) => {
  const dispatch = useDispatch();
  const deleteIt = () => {
    dispatch(deleteComment(props.id));
    dispatch(getAllComments());
  };

  return (
    <div
      className="btn-container"
      onClick={() => {
        if (window.confirm("Voulez-vraiment supprimer ce commentaire"))
          deleteIt();
      }}
    >
      <img
        src="./img/icons/circle-trash.svg"
        alt="Delete post"
        className="edit-btn icon icon-set-post tiny-x-margin"
      />
    </div>
  );
};

export default DeleteComment;

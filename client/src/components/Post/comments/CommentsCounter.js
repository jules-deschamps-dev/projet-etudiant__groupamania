import React, { useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../../Utils";

const CommentsCounter = (props) => {
  const commentsData = useSelector((state) => state.commentsReducer);
  let commentsCount = 0;

  {
    !isEmpty(commentsData[0]) &&
      commentsData.map((comment) => {
        if (comment.post === props.post) {
          commentsCount++;
        } else return null;
      });
  }

  return (
    <div className="icon flex min-height bold">
      {commentsCount >= 2 ? (
        <img src="./img/icons/comments.svg" alt="liked" className="icon" />
      ) : (
        <img src="./img/icons/comment.svg" alt="liked" className="icon" />
      )}

      <span>{commentsCount}</span>
    </div>
  );
};

export default CommentsCounter;

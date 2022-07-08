import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UidContext } from "../../AppContext";
import { isEmpty } from "../../Utils";
import DeleteComment from "./DeleteComment";

const Comment = (props) => {
  const uid = useContext(UidContext);
  const commentsData = useSelector((state) => state.commentsReducer);
  const user = useSelector((state) => state.userReducer);
  const users = useSelector((state) => state.usersReducer);
  let isAuthor = false;

  return (
    <div className=" flex min-height">
      <ul className="flex column w100">
        {!isEmpty(commentsData[0]) &&
          commentsData.map((comment) => {
            if (comment.post === props.post) {
              if (comment.author === uid) {
                isAuthor = true;
              } else isAuthor = false;
              return (
                <li className="comment" key={comment.id}>
                  <img
                    src={
                      !isEmpty(users[0]) &&
                      users
                        .map((author) => {
                          if (author.id === comment.author)
                            return author.picture;
                          else return null;
                        })
                        .join("") //replace "," by ""
                    }
                    alt="Avatar utilisateur"
                    className="picture limit-width "
                  />

                  <div className="flex column">
                    <span className="author">
                      {
                        !isEmpty(users[0]) &&
                          users
                            .map((author) => {
                              if (author.id === comment.author)
                                return author.firstName + " " + author.lastName;
                              else return null;
                            })
                            .join("") //replace "," by ""
                      }
                    </span>
                    <span className="comment-content">{comment.content}</span>
                  </div>

                  {(isAuthor || user.isAdmin) && (
                    <div className="flex margin-left-auto">
                      <img
                        src="./img/icons/comment-pen.svg"
                        alt="Edit post"
                        className="edit-btn icon-set-post icon tiny-x-margin"
                      />

                      <DeleteComment id={comment.id} />
                    </div>
                  )}
                </li>
              );
            }
          })}
      </ul>
    </div>
  );
};

export default Comment;

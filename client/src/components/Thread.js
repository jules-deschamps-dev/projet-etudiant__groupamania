import React, { useEffect, useState } from "react";
import { getPosts } from "../actions/post.actions";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Post/Card";
import { isEmpty } from "./Utils";

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer);

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false); //on a récupéré les posts on a plus besoin de le faire
    }
  }, [loadPost, dispatch]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(posts[0]) &&
          posts.map((post) => {
            return <Card post={post} key={post.id} />;
          })}
      </ul>
    </div>
  );
};

export default Thread;

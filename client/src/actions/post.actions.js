import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const NEW_POSTS = "NEW_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const GET_POST_ERRORS = "GET_POST_ERRORS";
export const GET_UPLOAD_ERRORS = "GET_UPLOAD_ERRORS";

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/post/`, {
        withCredentials: true,
      });
      dispatch({ type: GET_POSTS, payload: res.data });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const newPost = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/post/create`,
        data: data,
        withCredentials: true,
      });
      dispatch({ type: GET_POST_ERRORS, payload: "" });
    } catch (err) {
      if (err.response.data.errors) {
        dispatch({
          type: GET_POST_ERRORS,
          payload: err.response.data.errors,
        });
      } else {
        dispatch({ type: GET_POST_ERRORS, payload: "" });
      }
    }
  };
};

/*
export const handleFile = (file) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/upload`, file)
      .then(dispatch({ type: GET_POST_ERRORS, payload: "" }))
      .catch((err) => {
        if (err.response.data.errors) {
          dispatch({
            type: GET_UPLOAD_ERRORS,
            payload: err.response.data.errors,
          });
        } else {
          dispatch({ type: GET_UPLOAD_ERRORS, payload: "" });
        }
      });
  };
};*/

export const updatePost = (postId, content, isPinned) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
        data: { content, isPinned },
        withCredentials: true,
      });
      dispatch({ type: UPDATE_POST, payload: { content, isPinned, postId } });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const deletePost = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
        withCredentials: true,
      });
      dispatch({ type: DELETE_POST, payload: { id } });
    } catch (err) {
      return console.log(err);
    }
  };
};

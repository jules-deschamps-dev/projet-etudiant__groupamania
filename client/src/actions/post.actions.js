import axios from "axios";

export const GET_POSTS = "GET_POSTS";
export const NEW_POSTS = "NEW_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const newPost = (data) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/post/create`, data, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (postId, content) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}`,
      data: { content },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { content, postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { id } });
      })
      .catch((err) => console.log(err));
  };
};

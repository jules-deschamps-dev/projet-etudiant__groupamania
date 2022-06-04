import axios from "axios";

export const GET_LIKES = "GET_LIKES";
export const GET_LIKES_BY_POST = "GET_LIKES_BY_POST";

export const getAllLikes = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/like/`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: GET_LIKES, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const getLikesByPost = (postId) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/like/${postId}`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: GET_LIKES_BY_POST, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

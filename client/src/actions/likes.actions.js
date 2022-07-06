import axios from "axios";

export const GET_LIKES = "GET_LIKES";
export const GET_LIKES_BY_POST = "GET_LIKES_BY_POST";
export const GIVE_LIKE = "GIVE_LIKE";
export const UNLIKE = "UNLIKE";

export const getAllLikes = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/like/`, {
        withCredentials: true,
      });
      dispatch({ type: GET_LIKES, payload: res.data });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const getLikesByPost = (postId) => {
  console.log("axios", postId);
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/like/${postId}`,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: GET_LIKES_BY_POST, payload: res.data });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const giveLike = (uid) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/like/like`,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: GIVE_LIKE, payload: res.data });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const unlike = () => {
  return async (dispatch) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}api/like/unlike`,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: UNLIKE, payload: res.data });
    } catch (err) {
      return console.log(err);
    }
  };
};

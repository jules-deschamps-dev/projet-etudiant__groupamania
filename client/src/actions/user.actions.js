import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";

export const getUser = (uid) => {
  return async (dispatch) => {
    return await axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log("erreur ", err));
  };
};

export const uploadPicture = (data, id) => {
  return async (dispatch) => {
    return await axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data, {
        withCredentials: true,
      })
      .then((res) => {
        return axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${id}`, {
            withCredentials: true,
          })
          .then((res) => {
            dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
          });
      })
      .catch((err) => console.log(err));
  };
};

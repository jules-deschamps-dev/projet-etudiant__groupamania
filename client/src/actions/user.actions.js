import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_PROFIL = "UPDATE_PROFIL";
export const GET_USER_ERRORS = "GET_USER_ERRORS";

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

export const updateProfil = (data, uid) => {
  return async (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/user/${uid}`,
      data: { data },
    })
      .then((res) => {
        dispatch({ type: UPDATE_PROFIL, payload: res.data });
      })
      .catch((err) => console.log("erreur ", err));
  };
};
/*
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
*/

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        }
      })
      .catch((err) => console.log(err));
  };
};

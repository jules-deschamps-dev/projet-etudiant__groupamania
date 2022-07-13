import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";
export const UPDATE_COMMENT = "UPDATE_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getAllComments = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/comment/`,
        {
          withCredentials: true,
        }
      );
      dispatch({ type: GET_COMMENTS, payload: res.data });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const updateComment = (id, content) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URL}api/comment/${id}`,
        data: { content },
        withCredentials: true,
      });
      dispatch({ type: UPDATE_COMMENT, payload: { content, id } });
    } catch (err) {
      return console.log(err);
    }
  };
};

export const deleteComment = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "delete",
        url: `${process.env.REACT_APP_API_URL}api/comment/${id}`,
        withCredentials: true,
      });
      dispatch({ type: DELETE_COMMENT, payload: { id } });
    } catch (err) {
      return console.log(err);
    }
  };
};

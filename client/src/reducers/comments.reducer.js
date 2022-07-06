import { GET_COMMENTS, UPDATE_COMMENT } from "../actions/comments.actions";
import { DELETE_POST } from "../actions/post.actions";

const initialState = {};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;
    case UPDATE_COMMENT:
      return state.map((comment) => {
        if (comment.id === action.payload.id) {
          return {
            ...comment,
            content: action.payload.content,
          };
        } else return comment;
      });
    case DELETE_POST:
      return action.payload;
    default:
      return state;
  }
}

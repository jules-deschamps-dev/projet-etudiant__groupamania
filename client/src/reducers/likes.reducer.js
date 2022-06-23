import {
  GET_LIKES,
  GET_LIKES_BY_POST,
  GIVE_LIKE,
  UNLIKE,
} from "../actions/likes.actions";

const initialState = {};

export default function likeReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LIKES:
      return action.payload;
    case GET_LIKES_BY_POST:
      return action.payload;
    case GIVE_LIKE:
      return action.payload;
    case UNLIKE:
      return action.payload;
    default:
      return state;
  }
}

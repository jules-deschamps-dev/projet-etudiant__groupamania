import {
  GET_USER,
  UPDATE_PROFIL,
  UPLOAD_PICTURE,
} from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPDATE_PROFIL:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state, //afin de ne pas écraser les données existante
        picture: action.payload,
      };
    default:
      return state;
  }
}

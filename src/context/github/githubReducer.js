import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  // GET_USER,
  // GET_REPOS,
  GET_USER_AND_REPOS,
} from '../types';

const githubReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loading: false,
      };
    // case GET_USER:
    //   return {
    //     ...state,
    //     user: action.payload,
    //     loading: false,
    //   };
    // case GET_REPOS:
    //   return {
    //     ...state,
    //     repos: action.payload,
    //     loading: false,
    //   };
    case GET_USER_AND_REPOS:
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };
    default:
      return {
        state,
      };
  }
};

export default githubReducer;

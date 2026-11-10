import * as T from './userTypes.js';

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedId: null,
  posts: [],
  postsLoading: false,
  postsError: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case T.FETCH_USERS_REQUEST:
      return { ...state, loading: true, error: null };
    case T.FETCH_USERS_SUCCESS:
      return { ...state, loading: false, items: action.payload };
    case T.FETCH_USERS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case T.SELECT_USER:
      return {
        ...state,
        selectedId: action.payload,
        posts: [],
        postsLoading: false,
        postsError: null,
      };
    case T.FETCH_POSTS_REQUEST:
      return action.payload === state.selectedId
        ? { ...state, postsLoading: true, postsError: null, posts: [] }
        : state;
    case T.FETCH_POSTS_SUCCESS:
      return action.payload.userId === state.selectedId
        ? {
            ...state,
            postsLoading: false,
            posts: action.payload.posts,
          }
        : state;
    case T.FETCH_POSTS_FAILURE:
      return action.payload.userId === state.selectedId
        ? {
            ...state,
            postsLoading: false,
            postsError: action.payload.error,
          }
        : state;
    default:
      return state;
  }
}

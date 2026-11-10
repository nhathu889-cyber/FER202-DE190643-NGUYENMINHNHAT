import axios from 'axios';
import * as T from './userTypes.js';

const API = 'https://jsonplaceholder.typicode.com';

const fetchUsersRequest = () => ({ type: T.FETCH_USERS_REQUEST });
const fetchUsersSuccess = (users) => ({
  type: T.FETCH_USERS_SUCCESS,
  payload: users,
});
const fetchUsersFailure = (error) => ({
  type: T.FETCH_USERS_FAILURE,
  payload: error,
});

export const selectUser = (id) => ({ type: T.SELECT_USER, payload: id });

export const fetchUsers = () => async (dispatch, getState) => {
  const { items, loading } = getState().users;
  if (items.length > 0 || loading) return;

  dispatch(fetchUsersRequest());
  try {
    const response = await axios.get(`${API}/users`);
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    dispatch(fetchUsersFailure(
      axios.isAxiosError(error) ? error.message : 'Không thể tải danh sách người dùng.',
    ));
  }
};

export const fetchPostsByUser = (userId) => async (dispatch) => {
  dispatch(selectUser(userId));
  dispatch({ type: T.FETCH_POSTS_REQUEST, payload: userId });
  try {
    const response = await axios.get(`${API}/posts`, {
      params: { userId },
    });
    dispatch({
      type: T.FETCH_POSTS_SUCCESS,
      payload: { userId, posts: response.data },
    });
  } catch (error) {
    dispatch({
      type: T.FETCH_POSTS_FAILURE,
      payload: {
        userId,
        error: axios.isAxiosError(error)
          ? error.message
          : 'Không thể tải bài viết của người dùng.',
      },
    });
  }
};

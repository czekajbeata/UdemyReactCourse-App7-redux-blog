import jsonPlaceholder from "../apis/jsonPlaceholder";
import _ from "lodash";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  const userIds = _.uniq(_.map(getState().posts, "userId"));
  userIds.forEach((id) => dispatch(fetchUser(id)));
};

export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get("/posts");
  dispatch({
    type: "FETCH_POSTS",
    payload: response.data,
  });
};

export const fetchUser = (userId) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${userId}`);
  dispatch({
    type: "FETCH_USER",
    payload: response.data,
  });
};

// lodash memoized action creator - single call for each passed parameter during entire life cycle

// export const fetchUser = (userId) => (dispatch) => _fetchUser(userId, dispatch);

// const _fetchUser = _.memoize(async (userId, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${userId}`);
//   dispatch({
//     type: "FETCH_USER",
//     payload: response.data,
//   });
// });

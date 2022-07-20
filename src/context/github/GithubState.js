import React, { useReducer } from 'react';
// import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
// import {
//   SEARCH_USERS,
//   SET_LOADING,
//   CLEAR_USERS,
//   GET_USER,
//   GET_REPOS,
// } from '../types';

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // const github = axios.create({
  //   baseURL: 'https://api.github.com',
  //   headers: { Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}` },
  // });

  // // Search Users
  // const searchUsers = async (text) => {
  //   setLoading();

  //   const res = await github.get(`/search/users?q=${text}`);

  //   dispatch({
  //     type: SEARCH_USERS,
  //     payload: res.data.items,
  //   });
  // };

  // // Get User
  // const getUser = async (username) => {
  //   setLoading();

  //   const res = await github.get(`/users/${username}`);

  //   dispatch({
  //     type: GET_USER,
  //     payload: res.data,
  //   });
  // };

  // // Get Repos
  // const getUserRepos = async (username) => {
  //   setLoading();

  //   const res = await github.get(
  //     `/users/${username}/repos?per_page=10&sort=created:asc`
  //   );

  //   dispatch({ type: GET_REPOS, payload: res.data });
  // };

  // // Clear users
  // const clearUsers = () => {
  //   dispatch({ type: CLEAR_USERS });
  // };

  // // Set Loading
  // const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        dispatch,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;

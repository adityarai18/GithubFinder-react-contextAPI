import React, { useEffect, Fragment, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import GithubContext from '../../context/github/githubContext';
import Repos from '../repos/Repos';
import { getUserAndRepos } from '../../context/github/action';
import { GET_USER_AND_REPOS, SET_LOADING } from '../../context/types';

const User = () => {
  const { loading, user, dispatch } = useContext(GithubContext);
  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    company,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  const { userName } = useParams();

  useEffect(() => {
    dispatch({ type: SET_LOADING });
    getUserAndRepos(userName).then((res) => {
      dispatch({ type: GET_USER_AND_REPOS, payload: res });
    });
  }, [dispatch, userName]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back To Search
      </Link>
      Hireable : {''}
      {hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={avatar_url}
            className='round-img'
            alt=''
            style={{ width: '150px' }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className='btn btn-dark my-1'>
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username:</strong> {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company:</strong> {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website:</strong> {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers : {followers}</div>
        <div className='badge badge-success'>Following : {following}</div>
        <div className='badge badge-light'>Public Repos : {public_repos}</div>
        <div className='badge badge-dark'>Public Gists : {public_gists}</div>
      </div>
      <p className='my-2' style={{ padding: '0px 2rem' }}>
        <strong>Repositories:</strong>
      </p>
      <Repos />
    </Fragment>
  );
};

export default User;

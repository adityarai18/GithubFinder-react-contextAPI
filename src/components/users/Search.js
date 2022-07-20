import React, { useState, useContext } from 'react';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';
import { searchUsers } from '../../context/github/action';
import { SEARCH_USERS, SET_LOADING, CLEAR_USERS } from '../../context/types';

const Search = () => {
  const { dispatch, users } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const [text, setText] = useState('');

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = (e) => {
    if (text === '') {
      setAlert('Please enter something', 'light');
    } else {
      dispatch({ type: SET_LOADING });
      searchUsers(text).then((users) => {
        dispatch({ type: SEARCH_USERS, payload: users });
      });
      setText('');
    }
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Users...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {users.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={() => dispatch({ type: CLEAR_USERS })}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;

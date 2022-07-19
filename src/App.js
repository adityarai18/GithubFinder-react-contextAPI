import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);

  // async componentDidMount() {
  //   const github = axios.create({
  //     baseURL: 'https://api.github.com',
  //     timeout: 1000,
  //     headers: { Authorization: process.env.REACT_APP_GITHUB_TOKEN },
  //   });

  //   this.setState({ loading: true });

  //   const res = await github.get('/users');

  //   this.setState({ users: res.data, loading: false });
  // }

  const github = axios.create({
    baseURL: 'https://api.github.com',
    headers: { Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}` },
  });

  // search github users
  const searchUsers = async (text) => {
    setLoading(true);

    const res = await github.get(`/search/users?q=${text}`);

    setUsers(res.data.items);
    setLoading(false);
  };

  // get single github user
  const getUser = async (username) => {
    setLoading(true);

    const res = await github.get(`/users/${username}`);

    setUser(res.data);
    setLoading(false);
  };

  // get users repo
  const getUserRepos = async (username) => {
    setLoading(true);

    const res = await github.get(
      `/users/${username}/repos?per_page=10&sort=created:asc`
    );

    setRepos(res.data);
    setLoading(false);
  };

  // clear users from state
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  // Set alert
  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  // const {user, loading} = this.state;

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Routes>
            <Route
              path='/'
              element={
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClear={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users loading={loading} users={users} />
                </Fragment>
              }
            />
            <Route path='/about' element={<About />} />
            <Route
              path='/user/:userName'
              element={
                <User
                  getUser={getUser}
                  getUserRepos={getUserRepos}
                  user={user}
                  repos={repos}
                  loading={loading}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios';
import './App.css';

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}` },
});

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
    user: {},
    repos: [],
  };

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

  // search github users
  searchUsers = async (text) => {
    this.setState({ loading: true });

    const res = await github.get(`/search/users?q=${text}`);

    this.setState({ users: res.data.items, loading: false });
  };

  // get single github user
  getUser = async (username) => {
    this.setState({ loading: true });

    const res = await github.get(`/users/${username}`);

    this.setState({ user: res.data, loading: false });
  };

  // get users repo
  getUserRepos = async (username) => {
    this.setState({ loading: true });

    const res = await github.get(
      `/users/${username}/repos?per_page=10&sort=created:asc`
    );

    this.setState({ repos: res.data, loading: false });
  };

  // clear users from state
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  // Set alert
  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  render() {
    // const {user, loading} = this.state;

    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Routes>
              <Route
                path='/*'
                element={
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={this.state.users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users
                      loading={this.state.loading}
                      users={this.state.users}
                    />
                  </Fragment>
                }
              />
              <Route path='/about' element={<About />} />
              <Route
                path='/user/:userName'
                element={
                  <User
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={this.state.user}
                    repos={this.state.repos}
                    loading={this.state.loading}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

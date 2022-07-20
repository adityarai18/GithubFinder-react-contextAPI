import axios from 'axios';

let githubToken;

if (process.env.NODE_ENV !== 'production') {
  githubToken = process.env.REACT_APP_GITHUB_TOKEN;
} else {
  githubToken = process.env.GITHUB_TOKEN;
}

const github = axios.create({
  baseURL: 'https://api.github.com',
  headers: { Authorization: `${githubToken}` },
});

// Search Users
export const searchUsers = async (text) => {
  const res = await github.get(`/search/users?q=${text}`);

  return res.data.items;
};

// // Get User
// export const getUser = async (username) => {
//   const res = await github.get(`/users/${username}`);

//   return res.data;
// };

// // Get Repos
// export const getUserRepos = async (username) => {
//   const res = await github.get(
//     `/users/${username}/repos?per_page=10&sort=created:asc`
//   );

//   return res.data;
// };

export const getUserAndRepos = async (username) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${username}`),
    github.get(`/users/${username}/repos?per_page=10&sort=created:asc`),
  ]);

  return { user: user.data, repos: repos.data };
};

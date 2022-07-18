import React from 'react';
import Repoitem from './Repoitem';
import PropTypes from 'prop-types';

const Repos = (props) => {
  const { repos } = props;

  return repos.map((repo) => <Repoitem repo={repo} key={repo.id} />);
};

Repos.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default Repos;

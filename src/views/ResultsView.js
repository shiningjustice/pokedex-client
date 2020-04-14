import React from 'react';
import { Redirect } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';

import { user } from '../components/helpers/userHelper';

const ResultsView = (props) => {
  if (props.match.url === "/favorites") {
    if (user.exists) {
      // do some call here
    } else {
      return <Redirect to="login" />
    }
  }
  return (
    <>
      <SearchBar setModal={props.setModal} {...props} />
      <Results />
      <button>Load More Pokemon</button>
    </>
  )
};

export default ResultsView;
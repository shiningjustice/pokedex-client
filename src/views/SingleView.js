import React from 'react';
import Single from '../components/Single';

const SingleView = (props) => {
  return (
    <>
      <Single setModal={() => props.setModal()} {...props} /> 
    </>
  );
}

export default SingleView;
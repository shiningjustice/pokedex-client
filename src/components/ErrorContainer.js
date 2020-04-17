import React from 'react';

const ErrorContainer = (props) => {
  return <div className='ErrorContainer'>
    <p className='ErrorContainer p error'>{props.error}</p>
  </div>
};

export default ErrorContainer;
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

import '../styles/loadingIndicators.css';

const LoadingIndicators = () => {
	return (
		<div className='LoadingIndicators d-flex justify-content-center'>
			<Spinner animation='grow' variant='danger' />
			<Spinner animation='grow' variant='light' />
			<Spinner animation='grow' variant='dark' />
		</div>
	);
};

export default LoadingIndicators;

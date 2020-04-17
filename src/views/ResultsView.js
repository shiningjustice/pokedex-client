import React, { useState } from 'react';
import { useAuth } from '../components/helpers/context';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';
import ErrorContainer from '../components/ErrorContainer';

const ResultsView = (props) => {
	const [error, setError] = useState(null);

	const auth = useAuth();

	return (
		<>
			<SearchBar setModal={props.setModal} setError={setError} {...props} />

			{error && <ErrorContainer error={error} />}

			<Results setError={setError} auth={auth} {...props} />
		</>
	);
};

export default ResultsView;

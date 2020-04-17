import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import Results from '../components/Results';
import { useAuth } from '../components/helpers/context';
import ErrorContainer from '../components/ErrorContainer';

// import { user } from '../components/helpers/userHelper';

// **** GREETINGS DO THE LOAD MORE POKEMON BUTTON!! Might have to do it on the
// Results.js page

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

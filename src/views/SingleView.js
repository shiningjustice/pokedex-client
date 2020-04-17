import React, { useState } from 'react';
import { useAuth } from '../components/helpers/context';
import SearchBar from '../components/SearchBar';
import ErrorContainer from '../components/ErrorContainer';

import Single from '../components/Single';

const SingleView = (props) => {
	const [error, setError] = useState(null);

	const auth = useAuth();
	return (
		<>
			<SearchBar setModal={props.setModal} setError={setError} {...props} />
			{error && <ErrorContainer error={error} />}
			<Single auth={auth} setError={setError} {...props} />
		</>
	);
};

export default SingleView;

import React from 'react';
import { Redirect } from 'react-router-dom';
import Register from '../components/Registration';
import Login from '../components/Login';
import { user } from '../components/helpers/userHelper';

import '../components/tempstyles.css';

const AuthView = (props) => {
	if (user.exists) {
		return <Redirect to='/' />;
	}

	const checkIfEmpty = (fieldVal, fieldIsEmpty) => {
		if (fieldVal === '') {
			fieldIsEmpty(true);
		}
	};

	const handleLoginSuccess = () => {
		const { location, history } = props;
		const destination = (location.state || {}).from || '/';
		history.push(destination);
	};

	const handleRegistrationSuccess = () => {
		const { history } = props;
		history.push('/login');
	}

	return (
		<div className='AuthView'>
			{props.match.url === '/login' ? (
				<Login onLoginSuccess={handleLoginSuccess} />
			) : (
				<Register onRegistrationSuccess={handleRegistrationSuccess} />
			)}
		</div>
	);
};

export default AuthView;

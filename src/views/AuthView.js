import React from 'react';
import { Redirect } from 'react-router-dom';
import Register from '../components/Registration';
import Login from '../components/Login';
import { Container } from '../components/Bootstrap';

import '../styles/authView.css';

const AuthView = (props) => {
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
		<Container className='AuthView'>
			<h2>{props.match.url === '/login' ? 'Login' : 'Sign Up'}</h2>
			{props.match.url === '/login' ? (
				<Login onLoginSuccess={handleLoginSuccess} />
			) : (
				<Register onRegistrationSuccess={handleRegistrationSuccess} />
			)}
		</Container>
	);
};

export default AuthView;

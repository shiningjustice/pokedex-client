import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../services/auth-api-service';
import { useAuth } from './helpers/context';

import { Label, Input } from './form/form';
import ErrorContainer from '../components/ErrorContainer';

const Login = (props) => {
	const [error, setError] = useState(null);

	const auth = useAuth();

	const firstInput = useRef();
	
	useEffect(() => {
		firstInput.current.focus();
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const { username, password } = event.target;

		setError(null);

		AuthApiService.postLogin({
			username: username.value,
			password: password.value,
		})
			.then((res) => {
				username.value = '';
				password.value = '';
				auth.processLogin(res.authToken);
				props.onLoginSuccess();
			})
			.catch((res) => {
				console.log(res.error);
				setError();
			});
	};

	return (
		<form className='Login' onSubmit={handleSubmit}>
			{error && <ErrorContainer error={error} />}

			<h2>Login</h2>

			<div>
				<Label htmlFor='login-username-input`'>Username</Label>
				<Input
					ref={firstInput}
					id={`login-username-input`}
					nameProp='username'
					required
				></Input>
			</div>

			<div>
				<Label htmlFor='login-password-input'>Password</Label>
				<Input
					type='password'
					id='login-password-input'
					nameProp='password'
					required
				></Input>
			</div>

			<button type='submit'>Submit</button>
			<Link to='/register'>Sign Up For an Account</Link>
		</form>
	);
};

export default Login;

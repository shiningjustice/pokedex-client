import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../services/auth-api-service';
import { useAuth } from './helpers/context';
import { Form, Row, Col, Button } from './Bootstrap';
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
				setError();
			});
	};

	return (
		<Form className='Login' onSubmit={handleSubmit}>
			{error && <ErrorContainer error={error} />}

			<Form.Group as={Row}>
				<Label htmlFor='login-username-input`' column sm={2}>
					Username
				</Label>
				<Col sm={10}>
					<Input
						ref={firstInput}
						id={`login-username-input`}
						nameProp='username'
						autoComplete='username'
						required
					></Input>
				</Col>
			</Form.Group>

			<Form.Group as={Row}>
				<Label htmlFor='login-password-input' column sm={2}>
					Password
				</Label>
				<Col sm={10}>
					<Input
						type='password'
						id='login-password-input'
						nameProp='password'
						autoComplete='current-password'
						required
					></Input>
				</Col>
			</Form.Group>

			<Button type='submit' variant='secondary'>Submit</Button>
			<Link to='/register'><Button variant='link'>Sign Up For an Account</Button></Link>
		</Form>
	);
};

export default Login;

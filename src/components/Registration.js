import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../services/auth-api-service';
import ErrorContainer from '../components/ErrorContainer';

import { Label, Input } from './form/form';

const Registration = (props) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [confirmedPassword, setConfirmedPassword] = useState('');
	const [usernameIsEmpty, setUsernameIsEmpty] = useState(false);
	const [passwordIsEmpty, setPasswordIsEmpty] = useState(false);
	const [firstNameIsEmpty, setFirstNameIsEmpty] = useState(false);
	const [confirmedPasswordIsEmpty, setConfirmedPasswordIsEmpty] = useState(
		false
	);
	const [error, setError] = useState(null);

	const firstInput = useRef(null);

	const requiredErrorMsg = <span className='error'>Field cannot be blank</span>;

	const handleSubmit = (ev) => {
		ev.preventDefault();
		const { firstName, username, password } = ev.target;
		AuthApiService.postUser({
			first_name: firstName.value,
			username: username.value,
			password: password.value,
		})
			.then((user) => {
				firstName.value = '';
				username.value = '';
				password.value = '';
				props.onRegistrationSuccess();
			})
			.catch((res) => {
				setError(res.error.message);
			});
	};

	useEffect(() => {
		firstInput.current.focus()
	}, []);

	console.log(firstName, username);
	return (
		<form className='Registration' onSubmit={handleSubmit}>
			<h2>Sign Up</h2>
			{error && <ErrorContainer error={error} />}

			<div>
			<Label htmlFor='registration-firstName-input'>
				First Name
				{firstNameIsEmpty && requiredErrorMsg}
			</Label>
			<Input
				ref={firstInput}
				value={firstName}
				id='registration-firstName-input'
				onChange={(event) => setFirstName(event.target.value)}
				nameProp='firstName'
				onBlur={() =>
					!firstName ? setFirstNameIsEmpty(true) : setFirstNameIsEmpty(false)
				}
				required
			></Input>
			</div>

			<Label htmlFor='registration-username-input'>
				Username
				{usernameIsEmpty && requiredErrorMsg}
			</Label>
			<Input
				value={username}
				onChange={(event) => setUsername(event.target.value)}
				id={`login-username-input`}
				aria-label='username'
				onBlur={() =>
					!username ? setUsernameIsEmpty(true) : setUsernameIsEmpty(true)
				}
				required
			></Input>

			<Label htmlFor='registration-password-input'>
				Password
				{passwordIsEmpty && requiredErrorMsg}
			</Label>
			<Input
				type='password'
				value={password}
				onChange={(event) => setPassword(event.target.value)}
				id='registration-password-input'
				nameProp='password'
				onBlur={() =>
					!password ? setPasswordIsEmpty(true) : setUsernameIsEmpty(false)
				}
				required
			></Input>

			<Label htmlFor='registration-isValid-input'>
				Confirm Password{' '}
				{confirmedPasswordIsEmpty && requiredErrorMsg}
			</Label>
			<Input
				type='password'
				onChange={(event) => setConfirmedPassword(event.target.value)}
				id='registration-isValid-input'
				aria-label='confirmed-password'
				onBlur={() =>
					!confirmedPassword
						? setConfirmedPasswordIsEmpty(true)
						: setConfirmedPasswordIsEmpty(false)
				}
				required
			></Input>

			<button type='submit'>Submit</button>
			<Link to='/login'>Already have an account?</Link>
		</form>
	);
};

export default Registration;
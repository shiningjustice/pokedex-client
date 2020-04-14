import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { user } from '../components/helpers/userHelper';

import ErrorContainer from '../components/ErrorContainer';

import '../components/tempstyles.css';

const AuthView = (props) => {
	const [usernameIsEmpty, setUsernameIsEmpty] = useState(false);
	const [passwordIsEmpty, setPasswordIsEmpty] = useState(false);
	const [firstNameIsEmpty, setFirstNameIsEmpty] = useState(false);
	const [confirmedPasswordIsEmpty, setConfirmedPasswordIsEmpty] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState(null)

	if (user.exists) {
		return <Redirect to='/' />;
	}

	const submitForm = (event, type) => {
		event.preventdefault();

		if (type === 'login') {
			// do something
		} else {
			if (password !== confirmedPassword) {
        setError('Confirmed password does not match password. Please try again');
      }
		}
	};

	const checkIfEmpty = (fieldVal, fieldIsEmpty) => {
		if (fieldVal === '') {
			fieldIsEmpty(true);
		}
	};

	return (
		<div className='AuthView'>
      {error && <ErrorContainer error={error} />}
			{props.match.url === '/login' ? (
				<form className='login'>
					<h2>Login</h2>

					<label htmlFor={`login-username-input`}>
						Username {usernameIsEmpty && <span className='error'>Field cannot be blank</span>}
					</label>
					<input
						type='text'
						onChange={(event) => setUsername(event.target.value)}
						id={`login-username-input`}
						aria-label='username'
						onBlur={() => checkIfEmpty(username, setUsernameIsEmpty)}
						required
					></input>

					<label htmlFor='login-password-input'>
						Password {passwordIsEmpty && <span className='error'>Field cannot be blank</span>}
					</label>
					<input
						type='password'
						onChange={(event) => setPassword(event.target.value)}
						id='login-password-input'
						aria-label='password'
						onBlur={() => checkIfEmpty(password, setPasswordIsEmpty)}
						required
					></input>

					<button type='submit' onClick={(event) => submitForm(event, 'login')}>
						Submit
					</button>
          <Link to='/register'>Sign Up For an Account</Link>
				</form>
			) : (
				<form className='register'>
					<h2>Register</h2>

					<label htmlFor='registration-firstName-input'>
						First Name {firstNameIsEmpty && <span className='error'>Field cannot be blank</span>}
					</label>
					<input
						type='firstName'
						onChange={(event) => setFirstName(event.target.value)}
						id='registration-firstName-input'
						aria-label='firstName'
						onBlur={() => checkIfEmpty(firstName, setFirstNameIsEmpty)}
						required
					></input>

					<label htmlFor='registration-username-input'>
						Choose a Username {usernameIsEmpty && <span className='error'>Field cannot be blank</span>}
					</label>
					<input
						type='username'
						onChange={(event) => setUsername(event.target.value)}
						id='registration-username-input'
						aria-label='username'
						onBlur={() => checkIfEmpty(username, setUsernameIsEmpty)}
						required
					></input>

					<label htmlFor='registration-password-input'>
						Password {passwordIsEmpty && <span className='error'>Field cannot be blank</span>}
					</label>
					<input
						type='password'
						onChange={(event) => setPassword(event.target.value)}
						id='registration-password-input'
						aria-label='password'
						onBlur={() => checkIfEmpty(password, setPasswordIsEmpty)}
						required
					></input>

					<label htmlFor='registration-isValid-input'>
						Password {confirmedPasswordIsEmpty && <span className='error'>Field cannot be blank</span>}
					</label>
					<input
						type='password'
						onChange={(event) => setConfirmedPassword(event.target.value)}
						id='registration-isValid-input'
						aria-label='confirmed-password'
						onBlur={() => checkIfEmpty(confirmedPassword, setConfirmedPasswordIsEmpty)}
						required
					></input>

					<button
						type='submit'
						onClick={(event) => submitForm(event, 'register')}
					>
						Submit
					</button>
				</form>
			)}
		</div>
	);
};

export default AuthView;

import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from './helpers/context';
import { Container, Button } from './Bootstrap';

import './tempstyles.css';

const Header = (props) => {
	const auth = useAuth();

	const renderUserLinks = () => {
		if (!!auth.user.id) {
			return (
				<Link to='/'>
					<Button variant='light'>Logout</Button>
				</Link>
			);
		} else {
			return (
				<>
					<Link to='/login' className='mr-2'>
						<Button variant='light'>Login</Button>
					</Link>
					<Link to='/register'>
						<Button variant='light'>Register</Button>
					</Link>
				</>
			);
		}
	};

	return (
		<Container fluid className='Header d-flex align-items-center'>
			<Link to='/' className='Header Link'>
				<h1>Pokedex</h1>
			</Link>
			<Link className='ml-auto mr-2' to='/favorites'>
				<Button variant='light'>
					<span role='img' aria-label='heart'>
						❤
					</span>
				</Button>
			</Link>
			{renderUserLinks()}
		</Container>
	);
};

export default Header;

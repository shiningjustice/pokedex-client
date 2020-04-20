import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './helpers/context';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import '../styles/header.css';

const Header = (props) => {
	const auth = useAuth();

	const handleLogoutClick = () => {
		auth.processLogout();
	};

	const renderUserLinks = () => {
		if (!!auth.user.id) {
			return (
				<>
					<Link className='ml-auto mr-2' to='/favorites'>
						<Button variant='light'>
							<span role='img' aria-label='heart'>
								💖
							</span>
						</Button>
					</Link>
					<Link to='/'>
						<Button
							type='button'
							onClick={() => handleLogoutClick()}
							variant='light'
						>
							Logout
						</Button>
					</Link>
				</>
			);
		} else {
			// if (props.params.)
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
		<header as='header' className='Header mainContainer'>
			<Container className='Header container'>
				<Link to='/' className='Header Link'>
					<h1 className='Header pixelFont scrMobileMax'>PB PDX</h1>
					<h1 className='Header pixelFont scrTabletMin'>PB's Pokedex</h1>
				</Link>
				{renderUserLinks()}
			</Container>
		</header>
	);
};

export default Header;

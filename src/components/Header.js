import React from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from './helpers/context';

import './tempstyles.css';

const Header = (props) => {
	const auth = useAuth();

	const renderUserLinks = () => {
		if (!!auth.user.id) {
			return <Link to='/login'>Logout</Link>;
		} else {
			return <Link to='/login'>Login</Link>;
		}
	};

	return (
		<div className='Header'>
			<Link to='/' className='Header Link'>
				<h1>Pokedex</h1>
			</Link>
			<Link to='/favorites'>Heart Icon</Link>
			{renderUserLinks()}
		</div>
	);
};

export default Header;

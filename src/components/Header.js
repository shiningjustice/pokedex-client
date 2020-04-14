import React from 'react';
import { Link } from 'react-router-dom';

// get this from context later
import { user } from './helpers/userHelper';

import './tempstyles.css';

const Header = (props) => {
  const renderUserLinks = () => {
    if (user.exists) {
      return (
        <Link to="/login">Logout</Link>
      )
    } else {
      return (
        <Link to="login">Login</Link>
      )
    }
  }

	return (
		<div className="Header">
      <Link to="/" className="Header Link"><h1>Pokedex</h1></Link>
      <Link to="/browse/favorites">Heart Icon</Link>
      {renderUserLinks()}
    </div>
	);
};

export default Header;

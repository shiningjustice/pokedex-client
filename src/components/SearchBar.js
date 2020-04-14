import React, { useState } from 'react';
import ErrorContainer from './ErrorContainer';

import './tempstyles.css';

// get this from context later

const SearchBar = (props) => {
	const [pokemonName, setPokemonName] = useState('');
	const [error, setError] = useState(null);

	const submitPokemonSearch = () => {
		if (!pokemonName) {
			setError('Missing search term');
		}
	};
	const placeholder = 'Name or number';
	return (
		<div className='SearchBar mainContainer'>
			{error && <ErrorContainer error={error} />}
			<form>
				{props.inModal ? (
					<input
						className='SearchBar'
						onChange={(event) => setPokemonName(event.target.value)}
						placeholder={placeholder}
						disabled={props.disabled}
						autoFocus
					/>
				) : (
					<input
						className='SearchBar'
						onChange={(event) => setPokemonName(event.target.value)}
						onFocus={() => props.setModal(true)}
						placeholder={placeholder}
					/>
				)}

				{/* this should be type='submit' but ran into some bugs and didn't have the time to fix it */}
				<button
					type='button'
					className='SearchBar'
					onClick={() => submitPokemonSearch()}
				>
					Search
				</button>
			</form>
		</div>
	);
};

export default SearchBar;

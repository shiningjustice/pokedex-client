import React, { useEffect } from 'react';
import PokemonApiService from '../services/pokemon-api-service';
import { usePokemon } from './helpers/context';
import './tempstyles.css';

// get this from context later

const SearchBar = (props) => {
	const pokemonContext = usePokemon();
	const { setModal } = props;

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log({ event });
		const searchTerm = event.target.searchBar.value;

		if (!searchTerm) {
			props.setError('Missing search term');
		}

		await PokemonApiService.getRequestedPokemon(
			{ name: searchTerm },
			pokemonContext.pageNum
		)
			.then((res) => {
				console.log({ res }, 'typeof:', typeof res);
				if (Array.isArray(res)) {
					pokemonContext.setPokemonResults(res);
				} else {
					pokemonContext.setPokemonResults([res]);
					pokemonContext.setCurrPokemon(res);
				}
			})
			.catch((error) => props.setError(error.message));
	};

	const placeholder = 'Name or number';
	return (
		<div className='SearchBar mainContainer'>
			<form onSubmit={handleSubmit}>
				{/* {props.inModal ? (
					<input
						className='SearchBar'
						name='search-bar'
						aria-label='search-bar'
						placeholder={placeholder}
						// SearchBar disabled when not visible, i.e., on the modal's 2nd
						// page (for categories/subcategories)
						disabled={props.disabled}
						autoFocus
					/>
				) : ( */}

				<label htmlFor='search-bar'>Search for a Pokemon</label>
				<input
					className='SearchBar'
					id='search-bar'
					name='searchBar'
					aria-label='search-bar'
					placeholder={placeholder}
				/>

				{/* )} */}

				{/* this should be type='submit' but ran into some bugs and didn't have the time to fix it */}
				<button type='submit' className='SearchBar'>
					Search
				</button>
			</form>

			<button onClick={() => setModal(true)}>Browse More</button>
		</div>
	);
};

export default SearchBar;

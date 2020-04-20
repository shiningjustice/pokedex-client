import React from 'react';
import PokemonApiService from '../services/pokemon-api-service';
import { usePokemon } from './helpers/context';
import { Form, Col, Button } from './Bootstrap';

import '../styles/searchBar.css';

const SearchBar = (props) => {
	const pokemonContext = usePokemon();
	const { setModal } = props;

	const handleSubmit = async (event) => {
		event.preventDefault();
		const searchTerm = event.target.searchBar.value;

		if (!searchTerm) {
			props.setError('Missing search term');
		}

		await PokemonApiService.getRequestedPokemon(
			{ name: searchTerm },
			pokemonContext.pageNum
		)
			.then((res) => {
				if (Array.isArray(res)) {
					pokemonContext.setPokemonResults(res);
				} else {
					pokemonContext.setPokemonResults([res]);
					pokemonContext.setCurrPokemon(res);
				}
			})
			.catch((error) => props.setError(error.message));
	};

	const placeholder = 'Pokemon Name or Number';

	return (
		<div className='SearchBar mainContainer'>
			<Form className='SearchBar scrMobileMax' onSubmit={handleSubmit}>
				<Form.Label htmlFor='search-bar' className='SearchBar'>
					Search
				</Form.Label>
				<Form.Control
					size='sm'
					className='SearchBar'
					id='search-bar'
					name='searchBar'
					aria-label='search-bar'
					placeholder={placeholder}
				/>
				<Button type='submit' size='sm' variant='danger' className='SearchBar'>
					<span role='img' aria-label='search-icon'>
						🔍
					</span>
				</Button>
				<Button size='sm' variant='secondary' onClick={() => setModal(true)}>
					<span role='img' aria-label='more-icon'>
						➕
					</span>
				</Button>
			</Form>
		</div>
	);
};

export default SearchBar;

import React from 'react';
import PokemonApiService from '../services/pokemon-api-service';
import { usePokemon } from './helpers/context';
import { Form, Col, Button } from './Bootstrap';

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
			<Form.Row onSubmit={handleSubmit}>

				<Form.Label column sm={3.5} htmlFor='search-bar'>
					Search for a Pokemon
				</Form.Label>
				<Col sm={4.5}>
					<Form.Control
						className='SearchBar'
						id='search-bar'
						name='searchBar'
						aria-label='search-bar'
						placeholder={placeholder}
					/>
				</Col>

				<Col><Button type='submit' className='SearchBar'>
					Search
				</Button></Col>
				<Button variant='secondary' onClick={() => setModal(true)}>
				Browse More
			</Button>
			</Form.Row>
		</div>
	);
};

export default SearchBar;

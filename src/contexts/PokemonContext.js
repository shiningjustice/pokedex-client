import React, { createContext, useState } from 'react';

const PokemonContext = createContext({
	currPokemon: {},
	setCurrPokemon: () => {},
	pokemonResults: [],
	setPokemonResults: () => {},
	pageNum: 1,
	setPageNum: () => {},
	error: null,
	setError: () => {},
});

export default PokemonContext;

export const PokemonProvider = ({children}) => {
	const [ currPokemon, setCurrPokemon ] = useState({});
	const [ pokemonResults, setPokemonResults ] = useState([]);
	const [ pageNum, setPageNum ] = useState(1);
	const [ error , setError ] = useState();
	// const [ , set ] = useState();

	const numTotalPokemon = 720;
	const pokemonPerPage = 20;

	const value = {
		currPokemon,
		setCurrPokemon,
		pokemonResults,
		setPokemonResults,
		pageNum,
		setPageNum,
		error,
		setError,
		numTotalPokemon,
		pokemonPerPage
	};

		return (
			<PokemonContext.Provider value={value}>
				{children}
			</PokemonContext.Provider>
		);
}
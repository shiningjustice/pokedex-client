import React, { createContext, useState } from 'react';

const basicPikachu = {
	name: 'pikachu',
	types: [
		{
			type: {
				name: 'electric',
			},
		},
	],
	id: 25,
	height: 60,
	weight: 4,
	abilities: [
		{
			is_hidden: true,
			ability: {
				name: 'rockstar',
			},
		},
	],
	moves: [
		{
			move: {
				name: 'shock',
			},
		},
	],
};

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
	// const [ currPokemon, setCurrPokemon ] = useState({});
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


// export class PokemonProvider extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			currPokemon: {},
// 			pokemonResults: [],
// 			pageNum: 1,
// 			error: null,
// 		};
// 	}

// 	updatePokeState(key, value) {
// 		this.setState({ [key]: value });
// 	}

// 	render() {
// 		const numTotalPokemon = 720;

// 		const value = {
// 			currPokemon: this.state.currPokemon,
// 			pokemonResults: this.state.pokemonResults,
// 			pageNum: this.state.pageNum,
// 			error: this.state.error,
// 			updatePokeState: this.updatePokeState,
// 			numTotalPokemon,
// 		};

// 		return (
// 			<PokemonContext.Provider value={value}>
// 				{this.props.children}
// 			</PokemonContext.Provider>
// 		);
// 	}
// }

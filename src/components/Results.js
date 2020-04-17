import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { usePokemon } from '../components/helpers/context';
import PokemonApiService from '../services/pokemon-api-service';

import { categories } from '../components/helpers/searchHelper';

// import pokemonHelpers from './helpers/pokemonHelpers';

import './tempstyles.css';

// get this from context later
// **** GREETINGS Please remember to pass in the page number in your request,
// and if you click to view more have that update the page number too. This
// neto be done regardless of what kind of browsin' u're doin

// if time refactor code and pokecontext to use regular state. was initially
// using hooks for state but then i thought i needed to use the callback but i
// can just dothat in the code here and i wouldn't be able to do the callback in
// the context anyway, the callback is for this page

const Results = (props) => {
	const [loading, setLoading] = useState(true);
	const [path, setPath] = useState('home');
	const viewStr = ['', '/back'];
	const { auth, setError } = props;
	const { params } = props.match;

	const pokeContext = usePokemon();
	const {
		setCurrPokemon,
		pokemonResults,
		setPokemonResults,
		pageNum,
		setPageNum,
		numTotalPokemon,
		pokemonPerPage,
	} = pokeContext;

	// const setCurrPath = () => {
	// 	if (props.location.pathname === '/') {
	// 		setPath('homepage');
	// 	}
	// 	if (props.location.pathname === '/favorites') {
	// 		setPath('favorites');
	// 	}
	// 	if (props.location.pathname === '/browse/random') {
	// 		setPath('random');
	// 	}
	// 	if (params.category && params.subcategory) {
	// 		const { category } = props.match.params;
	// 		const categoryNames = categories.map((cat) => cat.name);
	// 		if (categoryNames.includes(category)) {
	// 			setPath('filter');
	// 		}
	// 	}
	// };

	const getPokemonByUrl = async (currPageNum) => {
		setLoading(true);

		if (props.location.pathname === '/') {
			return await PokemonApiService.getPokemonToBrowse(currPageNum)
				.then(async (res) => {
					if (currPageNum === 1) {
						return await setPokemonResults(res);
					} else {
						return await setPokemonResults([...pokemonResults, ...res]);
					}
				})
				.then(() => {
					setLoading(false);
				})
				.catch((res) => {
					setError(res.error.message);
					setLoading(false);
				});
		} else if (props.location.pathname === '/favorites') {
			if (!!auth.user.id) {
				return await PokemonApiService.getFavoritedPokemon()
					.then(async (res) => {
						if (currPageNum === 1) {
							return await setPokemonResults(res);
						} else {
							return await setPokemonResults([...pokemonResults, ...res]);
						}
					})
					.then(() => {
						setLoading(false);
					})
					.catch((res) => {
						setError(res.error.message);
						setLoading(false);
					});
			} else {
				return <Redirect to='/login' />;
			}
		} else if (props.match.url === '/browse/random') {
			const randomId = Math.ceil(numTotalPokemon * Math.random());

			return await PokemonApiService.getRequestedPokemon(
				{ id: randomId },
				currPageNum ? currPageNum : 1
			)
				.then(async (res) => {
					setCurrPokemon(res);
					return await setPokemonResults([res]);
				})
				.then(() => {
					setLoading(false);
				})
				.catch((res) => {
					setError(res.error.message);
					setLoading(false);
				});
		} else if (params.category && params.subcategory) {
			const { category, subcategory } = props.match.params;
			const categoryNames = categories.map((cat) => cat.name);
			if (categoryNames.includes(category)) {
				return await PokemonApiService.getFilteredPokemon(
					category,
					{ name: subcategory },
					currPageNum
				)
					.then(async (res) => {
						if (currPageNum === 1) {
							return await setPokemonResults(res);
						} else {
							return await setPokemonResults([...pokemonResults, ...res]);
						}
					})
					.then(() => {
						setLoading(false);
					})
					.catch((res) => {
						setError(res.error.message);
						setLoading(false);
					});
			}
		}
		// else {
		// 	props.history.push('/404');
		// }
	};

	const renderH2 = () => {
		let content;
		if (path === 'homepage') {
			content = 'Browse Pokemon';
		} else if (path === 'favorites') {
			const firstName = auth.user.first_name;
			const isSFinal = (name) => {
				if (name[name.length - 1] === 's') {
					return true;
				}
				return false;
			};
			const firstNamePossessive = isSFinal(firstName)
				? `${firstName}'`
				: `${firstName}'s`;

			content = `${firstNamePossessive} Favorites`;
		} else if (path === 'filter') {
			const { category, subcategory } = props.match.params;
			content = `Results for ${category} ${subcategory}`;
		}

		return <h2>{content}</h2>;
	};

	const loadMore = async () => {
		// defining new page num because `useState` hook doesn't allow for a
		// callback to be called after it's successfully set.
		const newPageNum = pageNum + 1;
		setPageNum(newPageNum);
		getPokemonByUrl(newPageNum);
	};

	const conditionallyRenderMoreButton = () => {
		if (props.location.pathname !== '/favorites' && pokemonResults.length > 0) {
			console.log(pokemonResults.length);
			return <button onClick={loadMore}>Load More Pokemon</button>;
		}
	};

	useEffect(() => {
		// console.log('in use effect');
		// setCurrPath();
		getPokemonByUrl(1);

		return () => {
			setPageNum(1);
		}
	}, []);

	console.log(pokemonResults);
	return (
		<div className='Results mainContainer'>
			<>
				{renderH2()}
				<ul className='Results'>
					{pokemonResults.map((pokemon, index) => {
						const id =
							pokemon.id || pokemon.url.slice(34, pokemon.url.length - 1);
						return (
							<li key={index} url={pokemon.url} className='Results'>
								<Link to={`/pokemon/${pokemon.name}`}>
									<img
										className='Results'
										src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${viewStr[0]}/${id}.png`}
										alt={`${pokemon.name} sprite`}
									/>
									<span className='Results pokemonName'>
										{/* #{id} */}
										{pokemon.name}
									</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</>
			{loading ? (
				<h2>I'm a loading spinner</h2>
			) : pokemonResults.length ? (
				conditionallyRenderMoreButton()
			) : (
				<div>No results found.</div>
			)}
		</div>
	);
};

export default Results;
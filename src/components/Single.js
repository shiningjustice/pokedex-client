import React, { useState, useEffect } from 'react';
// import { Redirect } from 'react-router-dom';
import { Textarea, Label } from './form/form';
import { usePokemon } from './helpers/context';
import LoadingIndicator from './LoadingIndicator';
import AuthApiService from '../services/auth-api-service';
import PokemonApiService from '../services/pokemon-api-service';
import * as pokemonHelpers from './helpers/pokemonHelpers';
import { Container, Table, Form, Button, Badge } from './Bootstrap';

import './tempstyles.css';

const Single = (props) => {
	const { auth, setError } = props;
	const [editsInProgress, setEditsInProgress] = useState(false);
	const [warnUnsavedChanges, addUnsavedWarning] = useState(false);
	// const [isFavorited, setIsFavorited] = useState(false);
	// const [note, setNote] = useState('');
	const [loading, setLoading] = useState(true);

	const pokeState = usePokemon();
	const { currPokemon, pageNum } = pokeState;

	const calcIndForImgSrc = (id) => {
		if (id < 10) {
			return `00${id}`;
		} else if (id < 100) {
			return `0${id}`;
		} else {
			return `${id}`;
		}
	};

	const fetchPokemonByUrl = async () => {
		setLoading(true);
		if (props.match.params.name !== currPokemon.name) {
			// setIsFavorited(currPokemon.favorited);
			// setNote(currPokemon.note);

			return await PokemonApiService.getRequestedPokemon(
				{ name: props.match.params.name },
				pageNum
			)
				.then((res) => {
					pokeState.setCurrPokemon(res);
					// return res;
				})
				.then(() => {
					setLoading(false);
				})
				// .then((res) => {
				// 	setIsFavorited(res.favorited);
				// 	setNote(res.notes);
				// })
				.catch((res) => {
					// if (res.error.message === 'Request failed with status code 404') {
					// 	return <Redirect to='/404' />;
					// } else {
					setError(res.error.message);
					setLoading(false);
					// }
				});
		} else {
			setLoading(false);
		}
	};

	// componentWillMount
	useEffect(() => {
		setEditsInProgress(false);
		console.log('useEffect ran');
		fetchPokemonByUrl();
	}, []);

	// refactor the two submitting functions into one, if time
	const handleSubmitFavorited = async (favorited) => {
		const notes = currPokemon.notes;

		if (!favorited && !notes) {
			console.log('going to delete');
			return await PokemonApiService.deleteSavedData(currPokemon.id).then(
				() => {
					const updatedForFavorited = {};
					Object.keys(currPokemon).forEach((key) => {
						if (key === 'favorited') {
							return (updatedForFavorited[favorited] = false);
						}
						return (updatedForFavorited[key] = currPokemon[key]);
					});
					console.log(updatedForFavorited.notes);
					pokeState.setCurrPokemon(updatedForFavorited);
				}
			);
		} else if (notes) {
			console.log('going to patch');
			return await PokemonApiService.patchSavedData({
				id: currPokemon.id,
				favorited,
			})
				.then((res) => {
					console.log('res of patch', res);
					// console.log(notes);

					// Create a deep copy of currPokemon
					const updatedForFavorited = {};
					Object.keys(currPokemon).forEach(
						(key) => (updatedForFavorited[key] = currPokemon[key])
					);

					// res is an array from patch result
					if (res.length === 0 || !res) {
						res.favorited = false;
					} else {
						res = res[0];
					}
					updatedForFavorited.favorited = res.favorited;
					pokeState.setCurrPokemon(updatedForFavorited);
				})
				.catch((error) => {
					setError(error.message);
				});
		} else {
			console.log('going to post');
			return await PokemonApiService.postNewData({
				id: currPokemon.id,
				favorited,
			})
				.then((res) => {
					// console.log({res});
					// console.log({favorited});

					const updatedForFavorited = {};
					Object.keys(currPokemon).forEach(
						(key) => (updatedForFavorited[key] = currPokemon[key])
					);
					updatedForFavorited.favorited = res.favorited;
					pokeState.setCurrPokemon(updatedForFavorited);
				})
				.catch((error) => {
					setError(error.message);
				});
		}
	};

	const handleSubmitNotes = async (event) => {
		event.preventDefault();
		const notes = event.target.notes.value;

		if (notes === currPokemon.notes) {
			setEditsInProgress(false);
			return;
		}

		const { favorited } = currPokemon;

		console.log(favorited, notes);
		if (!favorited && !notes) {
			console.log('going to delete');
			console.log('currpokeid', currPokemon.id);
			return await PokemonApiService.deleteSavedData(currPokemon.id)
				.then(() => {
					// console.log(notes);
					const updatedForNotes = {};
					Object.keys(currPokemon).forEach((key) => {
						return (updatedForNotes[key] = currPokemon[key]);
					});
					updatedForNotes.notes = '';
					console.log(updatedForNotes.notes);
					pokeState.setCurrPokemon(updatedForNotes);
				})
				.catch((error) => {
					setError(error.message);
				});
		} else if (favorited || (!favorited && currPokemon.notes)) {
			console.log('going to patch');
			return await PokemonApiService.patchSavedData({
				id: currPokemon.id,
				notes,
			})
				.then((res) => {
					console.log('patchres', res, 'pathrresboolean', Boolean(res));
					// console.log(notes);

					// Create a deep copy of currPokemon
					const updatedForNotes = {};
					Object.keys(currPokemon).forEach(
						(key) => (updatedForNotes[key] = currPokemon[key])
					);

					// res is an array from patch result
					if (res.length === 0) {
						res.favorited = false;
					} else {
						res = res[0];
					}
					updatedForNotes.notes = res.notes;
					pokeState.setCurrPokemon(updatedForNotes);
				})
				.catch((error) => {
					setError(error.message);
				});
		} else {
			console.log('going to post');
			return await PokemonApiService.postNewData({
				id: currPokemon.id,
				favorited: currPokemon.favorited,
				notes,
			})
				.then((res) => {
					// console.log(res);
					// console.log(notes);

					// Create a deep copy of currPokemon
					const updatedForNotes = {};
					Object.keys(currPokemon).forEach(
						(key) => (updatedForNotes[key] = currPokemon[key])
					);
					updatedForNotes.notes = res.notes;
					pokeState.setCurrPokemon(updatedForNotes);
				})
				.catch((error) => {
					setError(error.message);
				});
		}

		// AuthApiService.postLogin({
		// 	isFavorited: isFavorited.value,
		// 	notes: notes.value,
		// })
		// 	.then(() => {
		// 		setEditsInProgress(false);
		// 	})
		// 	.catch((res) => {
		// 		pokeState.setError(res.error);
		// 	});
	};

	useEffect(() => {
		setEditsInProgress(false);
		console.log('i am a test');
	}, [currPokemon]);

	if (loading) {
		return <LoadingIndicator />;
	}

	if (!Object.keys(currPokemon).length) {
		return null;
	} else {
		// get this from context later
		console.log({ currPokemon });
		// console.log(editsInProgress);
		// console.log(currPokemon.notes, note);
		console.log('favorited in pokeState:', currPokemon.favorited);
		console.log('notes in pokeState:', currPokemon.notes);
		return (
			<Container className='Single mainContainer'>
				<Container className='Single header'>
					<Container>
						<h2 className='pixelFont'>{currPokemon.name} </h2>
						<div className='Single h3'>
							<h3>#{currPokemon.id}</h3>
							<Badge>
								{currPokemon.types.map((obj, index) => (
									<pokemonHelpers.TypeEmoji key={index} type={obj.type.name} />
								))}
							</Badge>
						</div>
					</Container>
					{!!auth.user.id && (
						<Form>
							<Button
								type='button'
								onClick={() => handleSubmitFavorited(!currPokemon.favorited)}
								variant='light'
							>
								{currPokemon.favorited ? (
									<span role='img' aria-label='favorited'>
										❤️
									</span>
								) : (
									<span role='img' aria-label='not favorited'>
										🤍
									</span>
								)}
							</Button>
						</Form>
					)}
				</Container>
				<img
					className='Single'
					// src={currPokemon.sprites[imageKey]}
					src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${calcIndForImgSrc(
						currPokemon.id
					)}.png`}
					alt={currPokemon.name}
				/>
				{/* <button onClick={affectSpin}>{spinStatus} Spin</button> */}
				<Table responsive>
					<tbody>
						<tr>
							<th>Height</th>
							<td>{pokemonHelpers.convertHeight(currPokemon.height)}</td>
						</tr>
						<tr>
							<th>Weight</th>
							<td>{pokemonHelpers.convertWeight(currPokemon.weight)}</td>
						</tr>
						<tr>
							<th>Type(s)</th>
							<td>
								{currPokemon.types.map((obj, index) => {
									return (
										<span className='Single types capitalize' key={index}>
											{obj.type.name}{' '}
											<pokemonHelpers.TypeEmoji type={obj.type.name} />
										</span>
									);
								})}
							</td>
						</tr>
					</tbody>
				</Table>

				{!!auth.user.id && (
					<Container className='Single notes'>
						{editsInProgress ? (
							<Form classname='Single notes form' onSubmit={handleSubmitNotes}>
								<Label htmlFor='notes'>Your Notes:</Label>
								{warnUnsavedChanges && (
									<span className='error'>Unsaved changes</span>
								)}
								<Textarea
									id='notes'
									defaultValue={currPokemon.notes}
									// onChange={(event) => {
									// 	if (!event.target.value) {
									// 		setEditsInProgress(false);
									// 	}
									// }}
									onBlur={(event) =>
										currPokemon.notes !== event.target.value &&
										addUnsavedWarning(true)
									}
									nameProp='notes'
								/>
								<Button type='submit' className='notes'>
									Save
								</Button>
								<Button
									type='reset'
									onClick={(event) => {
										event.target.value = currPokemon.notes;
										setEditsInProgress(false);
									}}
									className='notes'
									variant='secondary'
								>
									Cancel
								</Button>
							</Form>
						) : (
							<div className='Single notes'>
								<Label as='div'>Your Notes:</Label>
								<p className='notesText'>{currPokemon.notes}</p>
								<Button
									onClick={() => setEditsInProgress(true)}
									type='button'
									className='Single editButton'
								>
									Edit
								</Button>
							</div>
						)}
					</Container>
				)}

				<Table>
					<tbody>
						<tr>
							<th>Abilities</th>
							<td>
								<ul className=''>
									{currPokemon.abilities.map(
										(obj, index) =>
											!obj.is_hidden && (
												<Badge
													pill
													variant='light'
													as='li'
													className='capitalize'
													key={index}
												>
													{obj.ability.name}
												</Badge>
											)
									)}
								</ul>
							</td>
						</tr>
						<tr>
							<th>Moves</th>
							<td>
								<ul className=''>
									{currPokemon.moves.map((obj, index) => (
										<Badge
											pill
											variant='light'
											as='li'
											className='capitalize'
											key={index}
										>
											{obj.move.name}
										</Badge>
									))}
								</ul>
							</td>
						</tr>
					</tbody>
				</Table>
			</Container>
		);
	}
};

export default Single;

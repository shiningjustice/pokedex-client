import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pokemonHelpers from './helpers/pokemonHelpers';
import conversions from './helpers/conversions';

import './tempstyles.css';

const Single = (props) => {
	// const pokemonArr = pokemonHelpers.pokemonArr[0];
	const [pokemon, setPokemon] = useState('');

	// let imageInterval;
	// const [imageKey, setImageKey] = useState('front_default');
	// const [spinStatus, setSpinStatus] = useState('Stop');

	// const switchImage = () => {
	// 	const view = ['front_default', 'back_default']
	// 	imageKey === view[0] ? setImageKey(view[1]) : setImageKey(view[0]);
	// };
	// const affectSpin = () => {
	// 	const verb = ['Start', 'Stop'];
	// 	spinStatus === verb[0] ? setSpinStatus(verb[1]) : setSpinStatus(verb[0]);
	// }
	
	const calcIndForImgSrc = (id) => {
		if (id < 10) {
			return `00${id}`;
		}
		else if (id < 100) {
			return `0${id}`;
		} else {
			return `${id}`;
		}
	};

	// LIFECYCLE METHODS
	useEffect(() => {
		// imageInterval = setInterval(switchImage, 3000);
		if (props.match.params) {
			const pokemonName = props.match.params.name;
			setPokemon(pokemonHelpers.pokemonArr.find(pokemon => pokemon.name === pokemonName));
		}
	})

	if (!pokemon) {
		return null;
	} else {
		// MAKE IT SO THAT IF POKEMON ISNT FOUND THE 404 PAGE SHOWS UP? OR something
		// else afte the promise is returned 

		// get this from context later
		// console.log(Boolean(props.match.params));

		return (
			<div>
				<h2>{pokemon.name}</h2>
				<h3>#{pokemon.id}</h3>
				<img
					// src={pokemon.sprites[imageKey]}
					src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${calcIndForImgSrc(pokemon.id)}.png`}
					alt={pokemon.name}
				/>
				{/* <button onClick={affectSpin}>{spinStatus} Spin</button> */}
				<table>
					<tbody>
						<tr>
							<th>Height</th>
							<td>{conversions.convertHeight(pokemon.height)}</td>
						</tr>
						<tr>
							<th>Weight</th>
							<td>{conversions.convertWeight(pokemon.weight)}</td>
						</tr>
						<tr>
							<th>Type(s)</th>
							<td>
								{pokemon.types.map((obj, index) => (
									<span key={index}>{obj.type.name}</span>
								))}
							</td>
						</tr>
						<tr>
							<th>abilities</th>
								<td>
									<ul>{pokemon.abilities.map((obj, index) => !obj.is_hidden && <li key={index}>{obj.ability.name}</li>)}</ul>
								</td>
						</tr>
						<tr>
							<th>Moves</th>
							<td>
								<ul>
									{pokemon.moves.map((obj, index) => <li key={index}>{obj.move.name}</li>)}
								</ul>
							</td>
						</tr>
	
					</tbody>
				</table>
			</div>
		);
	}
};

export default Single;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import pokemonHelpers from './helpers/pokemonHelpers';

import './tempstyles.css';

// get this from context later

const Results = (props) => {
	const [imgIndex, setImgIndex] = useState(0);
	// const [spinStatus, setSpinStatus] = useState('Stop');
	const viewStr = ['', '/back']

	// const getImgView = (index) => {
	// 	if (index === 0) {
	// 		return viewStr[imgIndex];
	// 	} else {
	// 		return imgIndex === 0? viewStr[1] : viewStr[0]; 
	// 	}
	// };
	const switchImgIndex = () => {
		imgIndex === 0 ? setImgIndex(1) : setImgIndex(0);
	};

	// const affectSpin = () => {
	// 	const verb = ['Start', 'Stop'];
	// 	spinStatus === verb[0] ? setSpinStatus(verb[1]) : setSpinStatus(verb[0]);
	// }

	useEffect(() => {
		// setInterval(switchImgIndex, 3000);
	});

	return <ul className='Results mainContainer'>
    {pokemonHelpers.sampleSet.map((pokemon, index) => {
			const id = pokemon.url.slice(34, pokemon.url.length - 1);

			return (
				<li key={index} url={pokemon.url} className="Results">
					<Link to={`/pokemon/${pokemon.name}`}>
						<img className="Results" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon${viewStr[imgIndex]}/${id}.png`} alt={`${pokemon.name} sprite`}/>
						<span className='Results pokemonName'>{pokemon.name}</span>
					</Link>
      	</li>
			)
		})}
  </ul>;
};

export default Results;

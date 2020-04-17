import React, { useState, useEffect } from 'react';
import { usePokemon } from './helpers/context';
// import SearchBar from '../components/SearchBar';
import ModalButton from '../components/ModalButton';
import { random, categories } from './helpers/searchHelper';

const AdvancedSearch = (props) => {
	const [pageNumber, setPageNumber] = useState(1);
	const [secondPageContent, setSecondPageContent] = useState({});
	const pokemonContext = usePokemon();
	// const { pokemonResults } = pokemonContext;

	return (
		<div className='AdvancedSearch'>
			{pageNumber === 1 ? (
				<>
					{/* <SearchBar inModal={props.inModal} setModal={props.setModal} disable={Boolean(pageNumber === 2)} /> */}
					<ModalButton
						data={random}
						partOfCategory='random'
						setModal={props.setModal}
					/>
					{categories.map((category, index) => (
						<ModalButton
							setSecondPageContent={setSecondPageContent}
							setPageNumber={setPageNumber}
							data={category}
							key={index}
						/>
					))}
				</>
			) : (
				<>
					<button onClick={() => setPageNumber(1)}>{`< Back `}</button>
					<h2>{secondPageContent.name}</h2>
					{secondPageContent.subcategories.map((subcat, index) => (
						<ModalButton
							data={subcat}
							partOfCategory={secondPageContent.name}
							key={index}
							setModal={props.setModal}
						/>
					))}
				</>
			)}
			<button type="button" onClick={() => props.setModal(false)}>Close</button>
		</div>
	);
};

export default AdvancedSearch;

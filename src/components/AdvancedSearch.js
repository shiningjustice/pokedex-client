import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import ModalButton from '../components/ModalButton';
import { random, categories } from './helpers/searchHelper';

const AdvancedSearch = (props) => {
	const [pageNumber, setPageNumber] = useState(1);
	const [secondPageContent, setSecondPageContent] = useState({});

	return (
		<div className='AdvancedSearch'>
			{pageNumber === 1 ? (
				<>
					<SearchBar inModal={true} disable={Boolean(pageNumber === 2)} />
					<ModalButton
						data={random}
						partOfCategory='random'
						setModalIsActive={props.setModalIsActive}
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
              setModalIsActive={props.setModalIsActive}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default AdvancedSearch;

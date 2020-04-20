import React, { useState } from 'react';
import { random, categories } from './helpers/searchHelper';
import { Modal, Container, Row, Button } from './Bootstrap';
import ModalButton from '../components/ModalButton';

import '../styles/advancedSearch.css';

const AdvancedSearch = (props) => {
	const [pageNumber, setPageNumber] = useState(1);
	const [secondPageContent, setSecondPageContent] = useState({});

	return (
		<div className='AdvancedSearch'>
			<Modal.Header closeButton closeLabel>
				<Modal.Title>Browse More Pokemon</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{pageNumber === 1 ? (
					<>
						<ModalButton
							data={random}
							setModal={props.setModal}
							cnProp='random'
							partOfCategory='random'
							variant='outline-danger'
						/>
						<div className='AdvancedSearch pg1 buttonsContainer'>
							{categories.map((category, index) => (
								<ModalButton
									setSecondPageContent={setSecondPageContent}
									setPageNumber={setPageNumber}
									data={category}
									key={index}
									variant='secondary'
								/>
							))}
						</div>
					</>
				) : (
					<>
						<Button
							variant='light'
							onClick={() => setPageNumber(1)}
						>{`< Back `}</Button>
						<h2 className='AdvancedSearch'>{secondPageContent.name}</h2>
						<div className='AdvancedSearch pg2 buttonsContainer'>
								{secondPageContent.subcategories.map((subcat, index) => (
									<ModalButton
										data={subcat}
										partOfCategory={secondPageContent.name}
										key={index}
										setModal={props.setModal}
										variant='secondary'
									/>
								))}
						</div>
					</>
				)}
			</Modal.Body>
		</div>
	);
};

export default AdvancedSearch;

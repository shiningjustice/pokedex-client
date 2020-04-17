import React, { useState } from 'react';
import { random, categories } from './helpers/searchHelper';
import { Modal, Container, Row, Button } from './Bootstrap';
import ModalButton from '../components/ModalButton';

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
						{/* <SearchBar inModal={props.inModal} setModal={props.setModal} disable={Boolean(pageNumber === 2)} /> */}
						<ModalButton
							block
							variant='outline-success'
							data={random}
							partOfCategory='random'
							setModal={props.setModal}
						/>
						<Container>
							<Row md={2}>
								{categories.map((category, index) => (
									<ModalButton
										setSecondPageContent={setSecondPageContent}
										setPageNumber={setPageNumber}
										data={category}
										key={index}
									/>
								))}
							</Row>
						</Container>
					</>
				) : (
					<>
						<Button
							variant='secondary'
							onClick={() => setPageNumber(1)}
						>{`< Back `}</Button>
						<h2>{secondPageContent.name}</h2>
						<Container>
							<Row md={2}>
								{secondPageContent.subcategories.map((subcat, index) => (
									<ModalButton
										block
										data={subcat}
										partOfCategory={secondPageContent.name}
										key={index}
										setModal={props.setModal}
									/>
								))}
							</Row>
						</Container>
					</>
				)}
			</Modal.Body>
		</div>
	);
};

export default AdvancedSearch;

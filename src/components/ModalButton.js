import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import '../styles/modalButton.css';

const ModalButton = (props) => {
	const {
		data,
		setSecondPageContent,
		setPageNumber,
		partOfCategory,
		setModal,
	} = props;

	return (
		<>
			{data.subcategories ? (
				<Button
					onClick={() => {
						setSecondPageContent(data);
						setPageNumber(2);
					}}
					size='lg'
					className='ModalButton'
					variant={props.variant ? props.variant : 'secondary'}
				>
					{data.name}
				</Button>
			) : (
				// <div className='ModalButton'>
				<Link
					to={`/browse/${partOfCategory}/${data.name}`}
					onClick={() => setModal(false)}
					// className='ModalButton'
				>
					<Button
						size='lg'
						variant={props.variant ? props.variant : 'secondary'}
						className={`ModalButton ${props.cnProp}`}
					>
						{data.name}
					</Button>
				</Link>
				// </div>
			)}
		</>
	);
};

export default ModalButton;

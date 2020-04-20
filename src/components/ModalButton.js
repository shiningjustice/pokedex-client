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
					size='lg'
					className='ModalButton'
					onClick={() => {
						setSecondPageContent(data);
						setPageNumber(2);
					}}
					{...props}
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
					<Button size='lg' {...props} className={`ModalButton ${props.cnProp}`}>
						{data.name}
					</Button>
				</Link>
				// </div>
			)}
		</>
	);
};

export default ModalButton;

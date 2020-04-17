import React from 'react';
import { Link } from 'react-router-dom';

const ModalButton = (props) => {
	// get if next page is needed
	//
	// Pass in object and array of other objcets

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
				<button
					className='ModalButton'
					onClick={() => {
						setSecondPageContent(data);
						setPageNumber(2);
					}}
				>
					{data.name}
				</button>
			) : (
				<div className='ModalButton'>
					<Link
						to={`/browse/${partOfCategory}/${data.name}`}
						onClick={() => setModal(false)}
					>
						{data.name}
					</Link>
				</div>
			)}
		</>
	);
};

export default ModalButton;

import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

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
				>
					{data.name}
				</Button>
			) : (
				<div className='ModalButton'>
					<Link
						to={`/browse/${partOfCategory}/${data.name}`}
						onClick={() => setModal(false)}
					>
						<Button size='lg' {...props}>
							{data.name}
						</Button>
					</Link>
				</div>
			)}
		</>
	);
};

export default ModalButton;

import React from 'react';
import AdvancedSearch from '../components/AdvancedSearch';

const Modal = (props) => {
	return (
		<div className='Modal'>
			<AdvancedSearch inModal={true} setModalIsActive={props.setModalIsActive}/>
		</div>
	);
};

export default Modal;

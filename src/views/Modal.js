import React from 'react';
import AdvancedSearch from '../components/AdvancedSearch';

const Modal = (props) => {
	return (
		<div className='Modal'>
			<AdvancedSearch inModal={true} setModal={props.setModal}/>
		</div>
	);
};

export default Modal;

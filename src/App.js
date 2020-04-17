import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import ResultsView from './views/ResultsView';
import SingleView from './views/SingleView';
import AuthView from './views/AuthView';
import PageNotFound from './views/PageNotFound';
import { Modal } from './components/Bootstrap';
import AdvancedSearch from './components/AdvancedSearch';

import '../App.css';

function App(props) {
	// pbtag change default to false
	const [modalIsActive, setModalIsActive] = useState(false);

	const renderView = () => {
		return (
			<Switch>
				<Route
					exact
					path='/'
					render={(routeProps) => (
						<ResultsView setModal={setModalIsActive} {...routeProps} />
					)}
				/>
				{['/favorites', '/browse/random', '/browse/:category/:subcategory'].map(
					(path, index) => (
						<Route
							path={path}
							key={index}
							render={(routeProps) => (
								<ResultsView setModal={setModalIsActive} {...routeProps} />
							)}
						/>
					)
				)}
				{['/login', '/register'].map((path, index) => (
					<Route
						path={path}
						key={index}
						render={(routeProps) => <AuthView {...routeProps} />}
					/>
				))}
				<Route
					path='/pokemon/:name'
					render={(routeProps) => (
						<SingleView setModal={setModalIsActive} {...routeProps} />
					)}
				/>
				<Route component={PageNotFound} />
			</Switch>
		);
	};

	return (
		<main className='App'>
			<Header />
			<div className='view'>{renderView()}</div>

			<Modal
				show={modalIsActive}
				centered
				animation={false}
				onHide={() => setModalIsActive(false)}
			>
				<AdvancedSearch inModal={true} setModal={setModalIsActive} />
			</Modal>
		</main>
	);
}

export default App;

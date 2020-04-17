import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import ResultsView from './views/ResultsView';
import AuthView from './views/AuthView';

import './components/tempstyles.css';

function App(props) {

	const renderView = () => {
		return (
			<Switch>
				<Route
					exact
					path='/'
					render={(routeProps) => (
						<ResultsView {...routeProps} />
					)}
				/>
				{[
					'/favorites',
					'/browse/random',
					'/browse/:category/:subcategory',
				].map((path, index) => (
					<Route
						path={path}
						key={index}
						render={(routeProps) => (
							<ResultsView {...routeProps} />
						)}
					/>
				))}
				{['/login', '/register'].map((path, index) => (
					<Route
						path={path}
						key={index}
						render={(routeProps) => <AuthView {...routeProps} />}
					/>
				))}
			</Switch>
		);
	};

	return (
		<main className='App'>
			<Header />
			<div className='view'>{renderView()}</div>
		</main>
	);
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { PokemonProvider } from './contexts/PokemonContext';
import App from './App';
import './index.css';
import './reset.css';

ReactDOM.render(
	<BrowserRouter>
		<UserProvider>
			<PokemonProvider>
				<App />
			</PokemonProvider>
		</UserProvider>
	</BrowserRouter>,
	document.getElementById('root')
);

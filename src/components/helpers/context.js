import { useContext } from 'react';

import UserContext from '../../contexts/UserContext';
import PokemonContext from '../../contexts/PokemonContext';

const useAuth = () => {
	return useContext(UserContext);
};

const usePokemon = () => {
	return useContext(PokemonContext)
}

export { useAuth, usePokemon };

import config from '../config';
import TokenService from './token-service';

const formatQueryParams = (params) => {
	console.log(params);

	const esc = encodeURIComponent;
	const query = Object.keys(params)
		.map((k) => {
			if (Array.isArray(params[k])) {
				return params[k]
					.map((arrItem) => esc(k) + '=' + esc(arrItem))
					.join('&');
			} else {
				return esc(k) + '=' + esc(params[k]) + '&';
			}
		})
		.join('&');
	return query;
};

const PokemonApiService = {
	// gets userId on the backend from the auth token
	getFavoritedPokemon: () => {
		return fetch(`${config.API_ENDPOINT}/saved-data`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	postNewData: (data) => {
		return fetch(`${config.API_ENDPOINT}/saved-data`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(data),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	patchSavedData: (data) => {
		return fetch(`${config.API_ENDPOINT}/saved-data`, {
			method: 'PATCH',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(data),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	// Param is an id, will be formatted into object on send
	deleteSavedData: (id) => {
		return fetch(`${config.API_ENDPOINT}/saved-data`, {
			method: 'DELETE',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify({ id }),
		});
	},
	// Returns by page starting from Pokemon #1
	getPokemonToBrowse: (pageNum) => {
		return fetch(`${config.API_ENDPOINT}/data/pokemon?page=${pageNum}`, {
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				authorization: `bearer ${TokenService.getAuthToken()}`,
			},
			body: JSON.stringify(),
		}).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	// I'm skipping the categories to browse because I decided it's better to save
	// those on the front end for formatting purposes

	// Query will be returned either an obj or an array w/ something of  the
	// following format: [ {id: [1, 2, 3]}, {name: pikachu }]
	getRequestedPokemon: (queries, pageNum) => {
		let queryStr;

		if (Array.isArray(queries)) {
			queryStr = queries.map((query) => formatQueryParams(query));
		} else {
			queryStr = formatQueryParams(queries);
		}

		return fetch(
			`${config.API_ENDPOINT}/data/pokemon/search?${queryStr}page=${pageNum}`,
			{
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`,
				},
				body: JSON.stringify(),
			}
		).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
	getFilteredPokemon: (category, query, pageNum) => {
		const queryStr = formatQueryParams(query);

		return fetch(
			`${config.API_ENDPOINT}/data/${category}/search?${queryStr}page=${pageNum}`,
			{
				method: 'GET',
				headers: {
					'content-type': 'application/json',
					authorization: `bearer ${TokenService.getAuthToken()}`,
				},
				body: JSON.stringify(),
			}
		).then((res) =>
			!res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
		);
	},
};

export default PokemonApiService;

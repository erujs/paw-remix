import { createContext, useState } from "react";
import { findIndex } from 'lodash';

export const CatContext = createContext();

export const CatProvider = ({ children }) => {
	const [errorResponse, setErrorResponse] = useState({
		status: 200,
		data: null
	});

	const [catState, setCatState] = useState({
		breeds: [],
		breed: '',
		cats: [],
		cat: [],
		overflow: false,
		busy: false,
		page: 1,
		ready: false
	});

	const dispatch = (action, payload) => {
		switch (action) {
			case 'INITIALIZE_BREEDS':
				const breeds = payload.breeds
				setCatState({
					...catState,
					breeds: breeds,
					ready: true
				});
				break;
			case 'SELECT_BREED':
				const updateBreed = payload;
				setCatState({
					...catState,
					breed: updateBreed,
					cats: []
				});
				break;
			case 'LOAD_MORE':
				const { moreCats, pagination } = payload;
				const newCats = [];
				moreCats.forEach((newCat) => {
					if (findIndex(catState.cats, ({ id }) => (id === newCat.id)) < 0) {
						newCats.push(newCat);
					}
				})
				setCatState({
					...catState,
					page: pagination,
					busy: false,
					cats: [
						...catState.cats,
						...newCats
					],
					overflow: (newCats.length === 0),
				});
				break;

			case 'LOAD_IMAGES':
				console.log()
				setCatState({
					...catState,
					page: payload.page,
					breed: payload.breed,
					busy: false,
					cats: [
						payload.cats
					],
					overflow: (payload.cats.length === 0),
				});
				break;
			case 'LOAD_IMAGE':
				setCatState({
					...catState,
					cat: payload.cat,
					ready: true
				});
				break;
			case 'BUSY':
				setCatState({
					...catState,
					busy: true,
					page: payload
				});
				break;
			case 'ERROR':
				const error = payload.error
				setErrorResponse({
					...errorResponse,
					status: error.status,
					data: error.data.message
				})
				break;
			// no default
		}
	}

	return <>
		<CatContext.Provider value={[errorResponse, catState, dispatch]}>
			{children}
		</CatContext.Provider>
	</>
}

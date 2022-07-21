import { createContext, useState } from "react";
import { findIndex } from 'lodash';

export const CatContext = createContext();

export const CatProvider = ({ children }) => {
	const [errorResponse, setErrorResponse] = useState({
		status: 200,
		data: null
	});

	const [catList, setCatList] = useState({
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
				setCatList({
					...catList,
					breeds: breeds,
					ready: true
				});
				break;
			case 'SELECT_BREED':
				const updateBreed = payload;
				setCatList({
					...catList,
					breed: updateBreed,
					cats: []
				});
				break;
			case 'LOAD_MORE':
				const { moreCats, pagination } = payload;
				const newCats = [];
				moreCats.forEach((newCat) => {
					if (findIndex(catList.cats, ({ id }) => (id === newCat.id)) < 0) {
						newCats.push(newCat);
					}
				})
				setCatList({
					...catList,
					page: pagination,
					busy: false,
					cats: [
						...catList.cats,
						...newCats
					],
					overflow: (newCats.length === 0),
				});
				break;

			case 'LOAD_IMAGES':
				setCatList({
					...catList,
					page: payload.page,
					breed: payload.breed,
					busy: false,
					cats: [
						...catList.cats
					],
					overflow: (payload.cats.length === 0),
				});
				break;
			case 'LOAD_IMAGE':
				setCatList({
					...catList,
					cat: payload.cat,
					ready: true
				});
				break;
			case 'BUSY':
				setCatList({
					...catList,
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
		<CatContext.Provider value={[errorResponse, catList, dispatch]}>
			{children}
		</CatContext.Provider>
	</>
}

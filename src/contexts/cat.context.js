import { createContext, useState } from "react";
import { findIndex } from 'lodash';

export const AnimalListContext = createContext();

export const AnimalListProvider = ({ children }) => {
	const [errorResponse, setErrorResponse] = useState({
		status: 200,
		data: null
	});

	const [animalList, setAnimalList] = useState({ 
		list: [],
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
			case 'INITIALIZE_CATS':
				console.log('initializing cats...');
				const n = payload.cats;
				setAnimalList({
					...animalList,
					list: n,
					ready: true
				});
				break;
			case 'SELECT_BREED':
				const updateBreed = payload;
				setAnimalList({
					...animalList,
					breed: updateBreed,
					cats: []
				});
				break;
			case 'LOAD_MORE':
				const { moreCats, pagination } = payload;
				const newCats = [];
				moreCats.forEach((cat) => {
					if (findIndex(animalList.cats, ({ id }) => (id === cat.id)) < 0) {
						newCats.push(cat);
					}
				})
				setAnimalList({
					...animalList,
					page: pagination,
					busy: false,
					cats: [
						...animalList.cats,
						...newCats
					],
					overflow: (newCats.length === 0),
				});
				break;

			case 'LOAD_IMAGES':
				const { cats, breed, page } = payload;
				setAnimalList({
					...animalList,
					page: page,
					breed: breed,
					busy: false,
					cats: [
						...cats
					],
					overflow: (cats.length === 0),
				});
				break;
			case 'LOAD_IMAGE':
				const cat = payload.cat;
				setAnimalList({
					...animalList,
					cat: cat,
					ready: true
				});
				break;
			case 'BUSY':
				const busy = payload;
				setAnimalList({
					...animalList,
					busy: true,
					page: busy
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
		<AnimalListContext.Provider value={[errorResponse, animalList, dispatch]}>
			{children}
		</AnimalListContext.Provider>
	</>

}

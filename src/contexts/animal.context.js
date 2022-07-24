import { createContext, useState } from "react";
import { findIndex } from 'lodash';

export const AnimalContext = createContext();

export const AnimalProvider = ({ children }) => {
	const [errorResponse, setErrorResponse] = useState({
		status: 200,
		data: null
	});

	const initialState = {
		animal: null,
		breeds: [],
		breed: null,
		list: [],
		item: [],
		overflow: false,
		busy: false,
		page: 1,
		ready: false
	}

	const [animalState, setAnimalState] = useState(initialState);

	const dispatch = (action, payload) => {
		switch (action) {
			case 'RESET_DATA':
				setAnimalState({
					...initialState
				})
				break;
			case 'INITIALIZE_BREEDS':
				setAnimalState({
					...animalState,
					animal: payload.animal,
					breeds: payload.data,
					ready: true
				});
				break;
			case 'SELECT_BREED':
				setAnimalState({
					...animalState,
					breed: payload,
					list: []
				});
				break;
			case 'LOAD_MORE':
				const { data, pagination } = payload;
				const newList = [];
				data.forEach((item) => {
					if (findIndex(animalState.list, ({ id }) => (id === item.id)) < 0) {
						newList.push(item);
					}
				})
				setAnimalState({
					...animalState,
					page: pagination,
					busy: false,
					list: [
						...animalState.list,
						...newList
					],
					overflow: (newList.length === 0),
				});
				break;

			case 'LOAD_IMAGES':
				console.log()
				setAnimalState({
					...animalState,
					page: payload.page,
					breed: payload.breed,
					busy: false,
					list: [
						payload.data
					],
					overflow: (payload.data.length === 0),
				});
				break;
			case 'LOAD_IMAGE':
				setAnimalState({
					...animalState,
					item: payload.data,
					ready: true
				});
				break;
			case 'BUSY':
				setAnimalState({
					...animalState,
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
		<AnimalContext.Provider value={[errorResponse, animalState, dispatch]}>
			{children}
		</AnimalContext.Provider>
	</>
}

import { createContext, useState } from 'react';
import { findIndex } from 'lodash';

export const AnimalContext = createContext();

export const AnimalProvider = ({ children }) => {
  const initialState = {
    breeds: [],
    list: [],
    selected: [],
    page: 1,
    overflow: false,
    statusCode: null,
    statusText: null,
  };

  const [animalState, setAnimalState] = useState(initialState);

  const dispatch = (action, payload) => {
    switch (action) {
      case 'RESET_DATA':
        setAnimalState({
          ...initialState,
        });
        break;
      case 'INITIALIZE_BREEDS':
        setAnimalState({
          ...animalState,
          breeds: payload.data,
          statusCode: payload.status,
          statusText: payload.message,
          selected: [],
          list: [],
        });
        break;
      case 'LOAD_IMAGES':
        setAnimalState({
          ...animalState,
          page: payload.page,
          list: [payload.data],
          overflow: payload.data.length === 0,
          statusCode: payload.status,
          statusText: payload.message,
        });
        break;
      case 'LOAD_IMAGE':
        setAnimalState({
          ...animalState,
          selected: payload.data,
          statusCode: payload.status,
          statusText: payload.message,
        });
        break;
      // case 'LOAD_MORE':
      //   const { data, pagination } = payload;
      //   const newList = [];
      //   data.forEach(item => {
      //     if (findIndex(animalState.list, ({ id }) => id === item.id) < 0) {
      //       newList.push(item);
      //     }
      //   });
      //   setAnimalState({
      //     ...animalState,
      //     page: pagination,
      //     busy: false,
      //     list: [...animalState.list, ...newList],
      //     overflow: newList.length === 0,
      //   });
      //   break;
      case 'ERROR':
        const { status, statusText } = payload.error;
        setAnimalState({
          ...animalState,
          statusCode: status,
          statusText: statusText,
        });
        break;
      // no default
    }
  };

  return (
    <>
      <AnimalContext.Provider value={[animalState, dispatch]}>
        {children}
      </AnimalContext.Provider>
    </>
  );
};

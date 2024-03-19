import { createContext, useState } from 'react';
import { findIndex } from 'lodash';

export const AnimalContext = createContext();

export const AnimalProvider = ({ children }) => {
  const initialState = {
    breeds: [],
    list: [],
    selected: {},
    page: 0,
    limit: 15,
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
        setTimeout(() => {
          const { data, status, message, list, selected } = payload || {};
          setAnimalState(prevState => ({
            ...prevState,
            breeds: data || [],
            statusCode: status,
            statusText: message,
            list: list || [],
            selected: selected || {}
          }));
        }, 1000);
        break;
      case 'LOAD_IMAGES':
        const { data: imageData, status: imageStatus, message: imageMessage } = payload || {};
        setAnimalState({
          ...animalState,
          list: imageData || [],
          overflow: !imageData || imageData.length === 0,
          statusCode: imageStatus,
          statusText: imageMessage,
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

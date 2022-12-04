import React, { useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { AnimalContext } from '../../contexts/animalContext';
import { AnimalService } from '../../services/animalService';

const ListBox = () => {
  const [animalState, dispatch] = useContext(AnimalContext);
  const [selected, setSelected] = useState();
  const service = new AnimalService();
  const { animal } = useParams();

  const load = (page, id) => {
    service
      .getImages(animal, page, id)
      .then(res => {
        dispatch('LOAD_IMAGES', {
          data: res.data,
          id: id,
          page: page,
          status: res.status,
          message: res.text,
        });
      })
      .catch(error => {
        dispatch('ERROR', { error: error });
      });
  };

  const selectBreed = breedName => {
    const breed = animalState.breeds.find(x => x.name === breedName);
    const { name, id } = breed;
    setSelected(name);
    if (id) {
      load(1, id);
    }
  };

  return (
    <div className="flex justify-center mb-4">
    <div className="w-72">
      <Listbox
        value={selected}
        onChange={e => {
          selectBreed(e);
        }}
        disabled={!animalState.statusCode}
      >
        <div className="relative mt-1">
          <Listbox.Button className="bg-black relative w-full cursor-pointer py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">
              {selected ? selected : 'Select Breed'}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            aveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {animalState.breeds
                ? animalState.breeds.map(({ id, name }) => (
                    <Listbox.Option
                      key={id}
                      value={name}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-teal-100 text-teal-900' : 'text-gray-900'
                        }`
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}
                          >
                            {name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                              <CheckIcon
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))
                : null}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
    </div>
  );
};

export default ListBox;

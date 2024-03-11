import React, { useState, useContext, Fragment } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { AnimalContext } from '../../contexts/animalContext';
import { AnimalService } from '../../services/animalService';

export const CustomCombobox = () => {
    const [animalState, dispatch] = useContext(AnimalContext);
    const [selected, setSelected] = useState({});
    const [query, setQuery] = useState('')
    const service = new AnimalService();
    const { animal } = useParams();
    const navigate = useNavigate();

    const filteredBreeds =
        query === ''
            ? animalState.breeds
            : animalState.breeds.filter((breed) =>
                breed.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    const load = async (page, id) => {
        try {
            const response = await service.getImages(animal, page, id);
            const { data, status, text } = response
            dispatch('LOAD_IMAGES', {
                data,
                id,
                page,
                status,
                message: text,
            });
        } catch (error) {
            dispatch('ERROR', { error: error });
        }
    };

    const selectBreed = breedDetails => {
        const breed = animalState.breeds.find(x => x.name === breedDetails.name);
        setSelected(breed);
        if (breed?.id !== selected.id) {
            load(1, breed?.id);
        }
        // const currentPath = window.location.pathname;
        // const newPath = `${currentPath}/${breed?.name.replace(/\s+/g, '-').toLowerCase()}`;
        // navigate(newPath);
    };

    return (
        <div className="my-16 w-full md:w-72 md:fixed md:top-0">
            <Combobox value={selected} onChange={selectBreed}>
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default overflow-hidden bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-white-900 focus:ring-0 bg-teal-600"
                            displayValue={(breed) => breed.name}
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder='Choose a breed'
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredBreeds.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredBreeds.map((breed) => (
                                    <Combobox.Option
                                        key={breed.id}
                                        className={({ active }) =>
                                            `relative cursor-pointer select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={breed}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {breed.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                            }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    )
}

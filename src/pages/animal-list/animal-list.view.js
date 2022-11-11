import React, { useContext, useEffect, Fragment, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'
import { AnimalContext } from "../../contexts/animal.context";
import { AnimalService } from "../../services/animal.service";

const AnimalList = () => {
  const [errorResponse, animalState, dispatch] = useContext(AnimalContext);
  const service = new AnimalService();
  const { animal } = useParams()
  const [selected, setSelected] = useState()

  useEffect(() => {
    service.getList(animal).then(res => {
      dispatch('INITIALIZE_BREEDS', { data: res.data, animal: animal })
    }).catch(error => {
      dispatch('ERROR', { error: error })
    });
  }, [])

  const load = (page, id) => {
    service.getImages(animalState.animal, page, id).then(res => {

      dispatch('LOAD_IMAGES', { data: res.data, id: id, page: page })
    }).catch(error => {
      dispatch('ERROR', { error: error })
    });
    dispatch('BUSY', page);
  }

  const selectBreed = (breedName) => {
    const breed = animalState.breeds.find(x => x.name === breedName)
    const { name, id } = breed;
    setSelected(name)
    dispatch('SELECT_BREED', { id: id, name: name });
    if (id) {
      load(1, id);
    }
    return (
      <Link to={'/' + id} />
    )
  }

  return (
    <div className="bg-black flex flex-col min-h-screen p-16">
      <div className="justify-center pb-16">
        <div className="w-72">
          <Listbox
            value={selected}
            onChange={(e) => { selectBreed(e) }}
            disabled={!animalState.ready || animalState.busy}
          >
            <div className="relative mt-1">
              <Listbox.Button
                className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              >
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
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  {
                    animalState.breeds
                      ? animalState.breeds.map(({ id, name }) => (
                        <Listbox.Option
                          key={id}
                          value={name}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-100 text-teal-900' : 'text-gray-900'
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                  }`}
                              >
                                {name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-teal-600">
                                  <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))
                      : null
                  }
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between lg:justify-between">
        {animalState.list.length
          ? animalState.list[0].map(({ id, url }, i) => (
            <div className="h-full">
              <Link to={'/' + animal + '/' + id}>
                <img className="object-contain" alt={id} fluid="true" src={url} />
              </Link>
            </div>
          ))
          // animalState.overflow ? null : <LoadMore />
          : null}
      </div>
      <Link to={'/'}>
        {/* <FontAwesomeIcon icon={faCircleChevronLeft} size="2x" className="absolute top-10 right-10 text-white" /> */}
        <ChevronLeftIcon className="static lg:absolute lg:bottom-10 lg:right-10 text-white h-24 w-24" />
      </Link>
    </div>
  )
}

export default AnimalList;

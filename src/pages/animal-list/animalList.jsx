import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/20/solid';
import { AnimalContext } from '../../contexts/animalContext';
import { AnimalService } from '../../services/animalService';
import Error from '../error/error';
import Listbox from '../../components/listbox/listbox';
import { Loader } from '../../components/svg/svg';

const AnimalList = () => {
  const [animalState, dispatch] = useContext(AnimalContext);
  const service = new AnimalService();
  const { animal } = useParams();

  useEffect(() => {
    service
      .getList(animal)
      .then(res => {
        dispatch('INITIALIZE_BREEDS', {
          data: res.data,
          animal: animal,
          status: res.status,
          message: res.text,
        });
      })
      .catch(error => {
        dispatch('ERROR', { error: error });
      });
  }, []);

  const renderAnimalList = () => {
    switch (animalState.statusCode) {
      case null:
        return <Loader />;
      case 200:
        return (
          <>
            <div className="flex flex-col justify-center min-h-screen p-16">
              <Listbox />
              <div className="flex flex-col flex-wrap lg:flex-row justify-center">
                {animalState.list.length
                  ? animalState.list[0].map(({ id, url }, i) => (
                      // <div className="lg:w-96 lg:h-96">
                      <Link to={'/' + animal + '/' + id}>
                        <img
                          alt={id}
                          className="object-fill lg:w-64 lg:h-64"
                          src={url}
                        />
                      </Link>
                      // </div>
                    ))
                  : // animalState.overflow ? null : <LoadMore />
                    null}
              </div>
            </div>
            <div className="fixed bottom-0 z-10 w-full bg-black">
              <Link to="/" className="flex-1">
                <button
                  type="button"
                  className="group h-16 w-full block hover:bg-teal-700"
                >
                  <HomeIcon className="group-hover:hidden center w-6 h-6 mb-2 mx-auto" />
                  <p className="hidden group-hover:block">HOME</p>
                </button>
              </Link>
            </div>
          </>
        );
      case animalState.statusCode:
        return (
          <Error
            statusCode={'ERROR [' + animalState.statusCode + ']'}
            statusMessage={animalState.statusMessage}
          />
        );
      default:
        return <Loader />;
    }
  };

  return renderAnimalList();
};

export default AnimalList;

import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HomeIcon, ArrowUturnLeftIcon } from '@heroicons/react/20/solid';
import { AnimalContext } from '../../contexts/animalContext';
import { AnimalService } from '../../services/animalService';
import Error from '../error/error';
import { Loader } from '../../components/svg/svg';

const AnimalView = () => {
  const [animalState, dispatch] = useContext(AnimalContext);
  const service = new AnimalService();
  const { animal, id } = useParams();

  useEffect(() => {
    service
      .getItemImage(animal, id)
      .then(res => {
        dispatch('LOAD_IMAGE', {
          data: res.data,
          status: res.status,
          message: res.text,
        });
      })
      .catch(error => {
        dispatch('ERROR', { error: error });
      });
  }, []);

  const renderDetails = () => {
    if (animalState.selected.breeds) {
      const breeds = animalState.selected.breeds[0];
      return (
        <>
          <p className="text-2xl mb-4">{breeds.name}</p>
          <p className="text-base">
            {breeds.origin ? 'Origin: ' + breeds.origin : null}
          </p>
          <p className="text-base">Temperament: {breeds.temperament}</p>
          <p className="text-lg mt-4">{breeds.description}</p>
        </>
      );
    }
  };

  const pageRender = () => {
    switch (animalState.statusCode) {
      case null:
        return <Loader />
      case 200:
        return (
          <>
            <div className="flex flex-col justify-center min-h-screen p-16">
              <div className="text-white">
                <img
                  alt=""
                  className="w-full object-contain"
                  src={animalState.selected?.url}
                />
                <div className="mt-4">{renderDetails()}</div>
              </div>
            </div>
            <footer className="fixed bottom-0 z-10 w-full bg-black flex h-16 items-center">
              <Link to="/" className="flex-1">
                <button
                  type="button"
                  className="group w-full block h-16 hover:bg-teal-700"
                >
                  <HomeIcon className="group-hover:hidden center w-6 h-6 mb-2 mx-auto" />
                  <p className="hidden group-hover:block">HOME</p>
                </button>
              </Link>
              <Link to={'/' + animal} className="flex-1">
                <button
                  type="button"
                  className="group w-full block h-16 hover:bg-teal-700"
                >
                  <ArrowUturnLeftIcon className="group-hover:hidden w-6 h-6 mb-2 mx-auto" />
                  <p className="hidden group-hover:block">BACK</p>
                </button>
              </Link>
            </footer>
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
        return <Loader />
    }
  };

  return pageRender();
};

export default AnimalView;

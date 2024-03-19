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
    if (animalState?.selected?.breeds) {
      const breeds = animalState?.selected?.breeds[0];
      return (
        <>
          <p className="text-2xl mb-4">{breeds?.name}</p>
          <p className="text-lg mb-4">{breeds?.description}</p>
          <p className="text-base">
            {breeds?.bred_for ? 'Bred For: ' + breeds?.bred_for : null}
          </p>
          <p className="text-base">
            {breeds?.breed_group ? 'Breed Group: ' + breeds?.breed_group : null}
          </p>
          <p className="text-base">
            {breeds?.life_span ? 'Life Span: ' + breeds?.life_span : null}
          </p>
          <p className="text-base">
            {breeds?.origin ? 'Origin: ' + breeds?.origin : null}
          </p>
          <p className="text-base">
            {breeds?.temperament ? 'Temperament: ' + breeds?.temperament : null}
          </p>
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
            <div className="flex flex-col justify-center min-h-screen p-8 md:p-16 bg-gradient-to-b from-red-400 to-teal-600">
              <div className="text-white">
                <img
                  alt=""
                  className="w-full object-contain"
                  src={animalState.selected?.url}
                />
                <div className="mt-4">{renderDetails()}</div>
              </div>
            </div>
            <footer className="fixed bottom-0 z-10 w-full bg-teal flex h-16 items-center transition-all duration-300 ease-in-out">
              <Link to="/" className="flex-1">
                <button
                  type="button"
                  className="group w-full block h-16 hover:bg-red-400 transition-all duration-300 ease-in-out"
                >
                  <HomeIcon className="group-hover:hidden center w-6 h-6 mb-2 mx-auto" />
                  <p className="hidden group-hover:block">HOME</p>
                </button>
              </Link>
              <Link to={'/' + animal} className="flex-1">
                <button
                  type="button"
                  className="group w-full block h-16 hover:bg-red-400 transition-all duration-300 ease-in-out"
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

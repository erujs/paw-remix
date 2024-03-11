import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { HomeIcon } from '@heroicons/react/20/solid';
import { AnimalContext } from '../../contexts/animalContext';
import { AnimalService } from '../../services/animalService';
import Error from '../error/error';
import { CustomCombobox } from '../../components/combobox/combobox';
import { Loader } from '../../components/svg/svg';

const AnimalList = () => {
  const [animalState, dispatch] = useContext(AnimalContext);
  const service = new AnimalService();
  const { animal } = useParams();

  useEffect(() => {
    document.title = animal === 'dog' ? 'Feles' : 'Canes';

    return () => {
      document.title = 'Feles et Canes';
    };
  }, []);

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

  useEffect(() => {
    AOS.init({
      duration: 1000,  // Set the duration of the animation
      easing: 'ease-in-out',  // Set the easing for the animation
    });
  }, []);

  const renderAnimalList = () => {
    AOS.init();
    switch (animalState.statusCode) {
      case null:
        return <Loader />;
      case 200:
        return (
          <>
            <div className="flex flex-col justify-center min-h-screen p-8 md:p-16 bg-gradient-to-b from-red-400 to-teal-600">
              <CustomCombobox />
              <div className="flex flex-col flex-wrap lg:flex-row justify-center">
                {animalState.list.length
                  ? animalState.list[0].map(({ id, url }, i) => (
                    <div key={id} data-aos="fade-up">
                      <Link to={`/${animal}/${id}`} className="image-link">
                        <img
                          alt={id}
                          className="enchanting-image object-fill lg:w-64 lg:h-64"
                          src={url}
                        />
                      </Link>
                      {/* <div data-aos="fade-up" /> */}
                    </div>
                  ))
                  : // animalState.overflow ? null : <LoadMore />
                  null}
              </div>
            </div>
            <div className="fixed bottom-0 z-10 w-full bg-teal transition-all duration-300 ease-in-out">
              <Link to="/" className="flex-1">
                <button
                  type="button"
                  className="group h-16 w-full block hover:bg-red-400 transition-all duration-300 ease-in-out"
                >
                  <HomeIcon className="group-hover:hidden center w-6 h-6 mb-2 mx-auto" />
                  <p className="hidden group-hover:block text-teal-600 font-bold">HOME</p>
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

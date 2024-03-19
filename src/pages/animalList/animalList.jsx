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
    const fetchData = async () => {
      try {
        const { page, limit } = animalState
        const response = await service.getList(animal);
        const { data, status, text } = response;
        const randomIndex = Math.floor(Math.random() * data?.length);
        const randomBreed = data[randomIndex];
        const response2 = await service.getImages(animal, page, limit, randomBreed?.id)
        dispatch('INITIALIZE_BREEDS', {
          data: data,
          animal: animal,
          status: status,
          message: text,
          list: response2?.data,
          selected: response2,
        });
      } catch (error) {
        dispatch('ERROR', { error: error });
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
    });
  }, []);

  console.log(animalState.list)

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
                  ? animalState.list.map(({ id, url }, i) => (
                    <div key={id} data-aos="fade-up">
                      <Link to={`/${animal}/${id}`} className="image-link">
                        <img
                          alt={id}
                          className="enchanting-image object-fill lg:w-64 lg:h-64"
                          src={url}
                        />
                      </Link>
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
